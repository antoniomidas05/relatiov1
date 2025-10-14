"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de Ícone
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

function Step26Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Lendo o gênero para personalizar o texto da pergunta
  const gender = searchParams.get("gender")

  // Lógica para definir o pronome do parceiro(a)
  const partnerPronoun = gender === "female" ? "him" : "her"

  const answerOptions = [
    { id: "agree", emoji: "😢", text: "Agree" },
    { id: "somehow_agree", emoji: "😔", text: "Somehow agree" },
    { id: "disagree", emoji: "🤔", text: "Disagree" },
  ]

  // A imagem mostra 22/37, mas manteremos a consistência com 38
  const currentStep = 22
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectOption = (optionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("hesitate_to_text", optionId)
    // --- LÓGICA DE ROTEAMENTO ATUALIZADA ---
    const isFemale = gender === "female";
    const nextStepUrl = isFemale 
      ? "/quiz/step-27-m" 
      : "/quiz/step-27-h";
      
    router.push(`${nextStepUrl}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2"><BackArrowIcon /></button>
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <span className="font-semibold text-gray-700 w-12 text-right">{String(currentStep).padStart(2, "0")} / {totalSteps}</span>
      </header>
      <div className="w-full max-w-md mx-auto px-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">
            Sometimes, I want to text {partnerPronoun} and change my mind at the last second
          </h1>
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button key={option.id} onClick={() => handleSelectOption(option.id)} className="w-full p-4 rounded-full flex items-center gap-4 bg-white hover:bg-gray-50 transition-colors duration-200">
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-semibold text-gray-700">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step26() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step26Content />
    </Suspense>
  )
}
