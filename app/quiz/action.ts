// app/quiz/action.ts

"use server"

// Interface para os dados que a action receberá
interface SubmissionData {
  userEmail: string;
  phoneNumber: string;
  // Podemos adicionar outros campos do quiz aqui se quisermos enviá-los para o AC
}

// Função auxiliar para encontrar um contato (copiada da sua lógica)
async function findContactByEmail(email: string, apiUrl: string, apiToken: string) {
  const url = `${apiUrl}/api/3/contacts?email=${encodeURIComponent(email)}`
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Api-Token": apiToken },
      cache: 'no-store', // Importante para não cachear a busca
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.contacts && data.contacts.length > 0 ? data.contacts[0] : null;
  } catch (error) {
    console.error("Erro ao buscar contato:", error);
    return null;
  }
}

// A Server Action principal
export async function subscribeToActiveCampaign(data: SubmissionData) {
  const { userEmail, phoneNumber } = data;

  if (!userEmail || !phoneNumber) {
    return { success: false, message: "E-mail e telefone são obrigatórios." };
  }

  // 1. Carregar variáveis de ambiente
  const API_URL = process.env.ACTIVE_CAMPAIGN_API_URL;
  const API_TOKEN = process.env.ACTIVE_CAMPAIGN_API_TOKEN;
  const TAG_ID = process.env.ACTIVE_CAMPAIGN_TAG_ID;

  if (!API_URL || !API_TOKEN || !TAG_ID) {
    console.error("❌ Variáveis de ambiente do ActiveCampaign não configuradas.");
    return { success: false, message: "Erro de configuração do servidor." };
  }

  let contactId: string;

  try {
    // 2. Tentar criar o contato
    const createContactResponse = await fetch(`${API_URL}/api/3/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Api-Token": API_TOKEN },
      body: JSON.stringify({ contact: { email: userEmail, phone: phoneNumber, status: 1 } }),
    });

    const responseData = await createContactResponse.json();

    if (createContactResponse.ok) {
      contactId = responseData.contact.id;
      console.log(`✅ Contato novo criado com sucesso. ID: ${contactId}`);
    } else if (createContactResponse.status === 422) {
      console.warn("⚠️ Contato já existe. Buscando ID...");
      const existingContact = await findContactByEmail(userEmail, API_URL, API_TOKEN);
      if (existingContact) {
        contactId = existingContact.id;
        console.log(`✅ Contato existente encontrado. ID: ${contactId}`);
      } else {
        throw new Error("Erro 422, mas não foi possível encontrar o contato.");
      }
    } else {
      console.error("❌ Erro ao criar contato no ActiveCampaign:", responseData);
      throw new Error(`Falha ao criar/encontrar contato. Status: ${createContactResponse.status}`);
    }

    // 3. Adicionar a tag ao contato
    console.log(`🚀 Adicionando TAG ID ${TAG_ID} ao CONTATO ID ${contactId}...`);
    const tagResponse = await fetch(`${API_URL}/api/3/contactTags`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Api-Token": API_TOKEN },
      body: JSON.stringify({ contactTag: { contact: contactId, tag: TAG_ID } }),
    });

    if (!tagResponse.ok) {
      const tagErrorData = await tagResponse.json();
      console.error("❌ Erro ao adicionar tag no ActiveCampaign:", tagErrorData);
      // Não lançar erro aqui, mas logar é importante
    } else {
      console.log("✅ Tag adicionada com sucesso!");
    }

    return { success: true };

  } catch (error) {
    console.error("🔥 Erro inesperado na action:", error);
    return { success: false, message: "Ocorreu um erro inesperado." };
  }
}
