"use client"

import { useState, useTransition, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { subscribeToActiveCampaign } from "./action" // Importa a nova server action

function Step46Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Estados para os novos campos
  const [exName, setExName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [isPending, startTransition] = useTransition()

  const handleContinue = () => {
    // Prepara os dados para a server action
    const submissionData = { userEmail, phoneNumber, exName }

    startTransition(async () => {
      const result = await subscribeToActiveCampaign(submissionData)
      if (result.success) {
        // Se a action for bem-sucedida, redireciona para a página de carregamento
        const finalParams = new URLSearchParams(searchParams.toString())
        finalParams.set("exName", exName)
        finalParams.set("userEmail", userEmail)
        finalParams.set("phoneNumber", phoneNumber)
        router.push(`/loading?${finalParams.toString()}`)
      } else {
        // Exibe uma mensagem de erro se a action falhar
        alert(result.message || "An error occurred. Please try again.")
      }
    })
  }

  // Validação para habilitar o botão
  const isFormValid = exName.trim() && userEmail.includes('@') && phoneNumber.length > 5;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="absolute top-0 p-4 w-full max-w-md mx-auto flex justify-center">
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={140} height={40} priority />
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md p-6 text-center space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">What's your Ex's name?</h1>
          <input
            type="text"
            value={exName}
            onChange={(e) => setExName(e.target.value)}
            placeholder="Ex's Name"
            className="w-full max-w-xs p-4 text-center text-lg border-2 border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
           <h2 className="text-xl font-semibold text-gray-700 mb-2">And your contact info?</h2>
           <div className="space-y-3">
             <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full max-w-xs p-4 text-center text-lg border-2 border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
             />
             <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Your Phone Number"
                className="w-full max-w-xs p-4 text-center text-lg border-2 border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
             />
           </div>
        </div>

        <p className="text-gray-500 text-sm mt-3 pt-4">
          We respect your privacy and are committed to protecting your personal data.
        </p>
      </main>

      <footer className="w-full p-4">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!isFormValid || isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Submitting..." : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step46() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step46Content />
    </Suspense>
  )
}
