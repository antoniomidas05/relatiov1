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

function Step20Content() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // --- CORREÇÃO AQUI ---
  // Adicionamos esta linha para definir a variável 'gender'
  const gender = searchParams.get("gender")

  const answerOptions = [
    { id: "loneliness", emoji: "😥", text: "Dealing with loneliness and emptiness" },
    { id: "rollercoaster", emoji: "😢", text: "Emotional rollercoaster: anger, sadness, regret" },
    { id: "memories", emoji: "😐", text: "Coping with the memories and reminders" },
    { id: "challenges", emoji: "😟", text: "Handling household, financial or logistical challenges" },
    { id: "plans", emoji: "😔", text: "Realizing the plans we made would never happen" },
  ]

  const currentStep = 16
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectOption = (optionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("most_painful_part", optionId)
    
    // Agora esta lógica funcionará corretamente, pois 'gender' está definido
    const isFemale = gender === "female"
    const nextStepUrl = isFemale 
      ? "/quiz/step-21-m" 
      : "/quiz/step-21-h"
      
    router.push(`${nextStepUrl}?${params.toString()}`)
  }

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
            What was the most painful part of your breakup?
          </h1>
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button key={option.id} onClick={() => handleSelectOption(option.id)} className="w-full p-4 rounded-full flex items-center gap-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200">
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

export default function Step20() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step20Content />
    </Suspense>
  )
}
