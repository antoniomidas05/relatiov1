"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de Ícone
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

function Step41HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedQualities, setSelectedQualities] = useState<string[]>([])

  const qualityOptions = [
    { id: "kind_caring", emoji: "🤗", text: "Kind and caring" },
    { id: "gorgeous", emoji: "💃", text: "Gorgeous" },
    { id: "passionate", emoji: "🌹", text: "Passionate" },
    { id: "smart", emoji: "🧠", text: "Smart" },
    { id: "humor", emoji: "😎", text: "With a sense of humor" },
    { id: "strong_confident", emoji: "💪", text: "Strong and self-confident" },
  ]

  const currentStep = 33
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelect = (optionId: string) => {
    setSelectedQualities((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("ex_positive_qualities", selectedQualities.join(","))
    // Navega para a próxima etapa
    router.push(`/quiz/step-42-h?${params.toString()}`)
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
      <main className="flex-grow flex flex-col items-center p-6 text-center overflow-y-auto">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800">How would you describe the positive qualities of your Ex?</h1>
          <p className="text-gray-500 mb-6">(Choose all that apply)</p>
          <div className="space-y-3">
            {qualityOptions.map((option) => {
              const isSelected = selectedQualities.includes(option.id)
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full p-3 rounded-full flex justify-between items-center transition-colors duration-200 ${
                    isSelected ? "bg-blue-100" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className={`font-semibold text-left ${isSelected ? "text-blue-700" : "text-gray-700"}`}>{option.text}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <span className="text-white text-sm">✔</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </main>
      <footer className="w-full p-4 bg-gray-100 border-t border-gray-200">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={selectedQualities.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step41H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step41HContent />
    </Suspense>
  )
}
