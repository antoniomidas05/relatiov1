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

function Step9HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const lackingOptions = [
    { id: "self_confidence", text: "Self-confidence", image: "/step9/309_Element_1.png" },
    { id: "knowledge", text: "Knowledge", image: "/step9/309_Element_2.png" },
    { id: "patience", text: "Patience", image: "/step9/309_Element_3.png" },
    { id: "friendly_push", text: "A friendly push", image: "/step9/309_Element_4.png" },
  ]

  const currentStep = 7
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectOption = (optionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lacking", optionId)
    // Navega para a próxima etapa, por exemplo, step-10
    router.push(`/quiz/step-10-h?${params.toString()}`)
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
            To win back my ex-girlfriend, <br />
            <span className="text-red-500">I feel I'm lacking</span>
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {lackingOptions.map((option) => (
              <button key={option.id} onClick={() => handleSelectOption(option.id)} className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-24 relative rounded-lg overflow-hidden">
                  <Image src={option.image} alt={option.text} fill className="object-cover" />
                </div>
                <span className="font-semibold text-gray-700">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step9H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step9HContent />
    </Suspense>
  )
}
