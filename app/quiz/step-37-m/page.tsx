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

function Step37MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const answerOptions = [
    { id: "shy_hesitant", emoji: "😊", text: "Shy and hesitant" },
    { id: "love_at_first_sight", emoji: "🥂", text: "Love at first sight" },
    { id: "playful_lighthearted", emoji: "😄", text: "Playful and lighthearted" },
    { id: "nervous_exciting", emoji: "😬", text: "Nervous but exciting" },
    { id: "memorable_heartwarming", emoji: "😌", text: "Memorable and heartwarming" },
    { id: "unforgettable_sweet", emoji: "🥰", text: "Unforgettable and sweet" },
  ]

  const currentStep = 30
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectOption = (optionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("first_date_feeling", optionId)
    // Navega para a última etapa, por exemplo, step-38
    router.push(`/quiz/step-38?${params.toString()}`)
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
            What was your <span className="text-pink-500">first date</span> like?
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

export default function Step37M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step37MContent />
    </Suspense>
  )
}
