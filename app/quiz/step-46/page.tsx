"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

function Step46Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender")
  const [exName, setExName] = useState("")

  const handleContinue = () => {
    if (!exName.trim()) return // Prevenção extra

    const params = new URLSearchParams(searchParams.toString())
    params.set("exName", exName)
    
    const isFemale = gender === "female"
    const nextStepUrl = isFemale 
      ? "/quiz/step-47-m" // Rota para mulheres
      : "/quiz/step-47-h" // Rota para homens
      
    router.push(`${nextStepUrl}?${params.toString()}`)
  }

  return (
    // O flex-col no container principal organiza o header, main e footer
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="absolute top-0 p-4 w-full max-w-md mx-auto flex justify-center">
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={140} height={40} priority />
      </header>
      
      {/* 
        MUDANÇA 2: Adicionado padding-bottom ('pb-28') ao 'main'.
        Isso garante que o conteúdo dentro do 'main' (o texto de privacidade)
        não fique escondido atrás do rodapé fixo.
      */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md p-6 text-center pb-28">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          What's your Ex's name?
        </h1>
        
        <input
          type="text"
          value={exName}
          onChange={(e) => setExName(e.target.value)}
          placeholder="Name"
          className="w-full max-w-xs p-4 text-center text-lg border-2 border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
        />

        <p className="text-gray-500 text-sm mt-3">
          We respect your privacy and are committed to protecting your personal data
        </p>
      </main>

      {/* 
        MUDANÇA 1: Rodapé com posicionamento fixo.
        - 'fixed bottom-0 left-0' prende o rodapé na parte inferior da tela.
        - Estilo atualizado para consistência visual.
      */}
      <footer className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!exName.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
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
