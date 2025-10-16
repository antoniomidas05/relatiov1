import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // Calcula a porcentagem para a barra de progresso
  const progressPercentage = (1 / 38) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* --- CABEÇALHO --- */}
        <header className="text-center mb-2">
          <div className="flex justify-center items-center relative w-full">
            <Image
              src="/step1/logotype-color.svg"
              alt="Relatio Logo"
              width={140}
              height={40}
              priority
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 font-semibold text-gray-700">
              01 / 38
            </span>
          </div>
        </header>

        {/* --- BARRA DE PROGRESSO --- */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
          <div
            className="bg-purple-500 h-1 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <main className="flex flex-col items-center text-center">
          <p className="font-semibold text-gray-600 text-sm mb-4">
            #1 Online Relationship Improvement Platform
          </p>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight mb-4">
            DON'T LET <span className="text-blue-500">THE PERSON YOU LOVE</span>{" "}
            SLIP OUT OF YOUR LIFE FOREVER
          </h1>
          <p className="text-gray-700 font-medium text-lg mb-8">
            Take a 3-minute quiz
          </p>

          {/* --- SELEÇÃO DE GÊNERO --- */}
{/* 
  MUDANÇA PRINCIPAL: 
  - Trocamos 'flex' por 'grid' e 'grid-cols-2' para criar duas colunas de largura igual.
  - 'gap-4' define um espaçamento consistente entre as colunas.
*/}
<div className="w-full grid grid-cols-2 gap-4 mb-6">
  
  {/* CARD MASCULINO */}
  <Link href="/quiz/step-2?gender=male" className="flex flex-col items-center group">
    {/* 
      MUDANÇA PARA RESPONSIVIDADE:
      - Trocamos 'w-40 h-40' por 'w-full aspect-square' para que a imagem 
        se ajuste à largura da coluna e mantenha a proporção quadrada.
    */}
    <div className="w-full aspect-square bg-white rounded-lg shadow-md overflow-hidden mb-3 relative transition-transform group-hover:scale-105">
      <Image
        src="/step1/gender_male_v4.webp"
        alt="Plano para Homem"
        fill
        sizes="(max-width: 640px) 50vw, 160px" // Melhora o carregamento em diferentes telas
        className="object-cover"
      />
    </div>
    {/* 
      Este botão agora terá a mesma largura que o outro porque seu 
      container pai (o Link) está em uma coluna de grade de largura fixa.
    */}
    <div className="w-full bg-blue-500 group-hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors text-base text-center">
      <span>Plan for Men</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2 hidden sm:block" // Esconde a seta em telas pequenas para mais espaço
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </Link>

  {/* CARD FEMININO */}
  <Link href="/quiz/step-2?gender=female" className="flex flex-col items-center group">
    <div className="w-full aspect-square bg-white rounded-lg shadow-md overflow-hidden mb-3 relative transition-transform group-hover:scale-105">
      <Image
        src="/step1/gender_female_v4.webp"
        alt="Plano para Mulher"
        fill
        sizes="(max-width: 640px) 50vw, 160px"
        className="object-cover"
      />
    </div>
    <div className="w-full bg-blue-500 group-hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors text-base text-center">
      <span>Plan for Women</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2 hidden sm:block"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </Link>
</div>

          {/* --- RODAPÉ --- */}
          <div className="text-center text-xs text-gray-500 max-w-sm">
            <p>
              By proceeding further, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-blue-600">
                Terms of Use
              </Link>
              ,{" "}
              <Link href="/privacy" className="underline hover:text-blue-600">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/cookie" className="underline hover:text-blue-600">
                Cookie Policy
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
