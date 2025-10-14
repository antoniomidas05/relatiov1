"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

function Step46Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // 1. Precisamos ler o gênero aqui para a lógica de roteamento
  const gender = searchParams.get("gender")
  
  const [exName, setExName] = useState("")

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("exName", exName)
    
    // 2. Lógica de roteamento baseada no gênero
    const isFemale = gender === "female"
    const nextStepUrl = isFemale 
      ? "/quiz/step-47-m" // Rota para mulheres
      : "/quiz/step-47-h" // Rota para homens
      
    // 3. Redireciona para a URL correta
    router.push(`${nextStepUrl}?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="absolute top-0 p-4 w-full max-w-md mx-auto flex justify-center">
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={140} height={40} priority />
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md p-6 text-center">
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

      <footer className="w-full p-4">
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
