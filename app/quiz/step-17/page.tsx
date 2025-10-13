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

function Step17Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])

  const breakupReasons = [
    { id: "arguing", emoji: "😤", text: "Constant arguing" },
    { id: "communication", emoji: "🗣️", text: "Lack of communication" },
    { id: "intimacy", emoji: "🙌", text: "Loss of emotional or physical intimacy" },
    { id: "goals", emoji: "🎯", text: "Incompatibility in long-term goals" },
    { id: "financial", emoji: "💵", text: "Financial disagreements" },
    { id: "partner_unfaithful", emoji: "💔", text: "My partner was unfaithful to me" },
    { id: "i_was_unfaithful", emoji: "😔", text: "I was unfaithful to my partner" },
    { id: "external_pressures", emoji: "😒", text: "External pressures (e.g., disapproving family)" },
    { id: "values", emoji: "😥", text: "Different values" },
    { id: "unknown", emoji: "🤔", text: "I don't know" },
  ]

  const currentStep = 13
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectReason = (reasonId: string) => {
    setSelectedReasons((prev) => {
      const isSelected = prev.includes(reasonId)
      if (isSelected) {
        // Desmarcar a opção
        return prev.filter((id) => id !== reasonId)
      } else {
        // Marcar a opção, se o limite não foi atingido
        if (prev.length < 3) {
          return [...prev, reasonId]
        }
      }
      // Retorna o estado anterior se o limite de 3 já foi atingido
      return prev
    })
  }

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    // Converte o array de respostas em uma string separada por vírgulas
    params.set("breakup_reasons", selectedReasons.join(","))
    // Navega para a próxima etapa, por exemplo, step-18
    router.push(`/quiz/step-18?${params.toString()}`)
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
      {/* O main ocupa o espaço restante, e a lista pode rolar se necessário */}
      <main className="flex-grow flex flex-col items-center p-6 text-center overflow-y-auto">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800">What were the reasons for the breakup?</h1>
          <p className="text-gray-500 mb-6">( Choose up to 3 )</p>
          <div className="space-y-3">
            {breakupReasons.map((reason) => {
              const isSelected = selectedReasons.includes(reason.id)
              return (
                <button
                  key={reason.id}
                  onClick={() => handleSelectReason(reason.id)}
                  className={`w-full p-3 rounded-full flex justify-between items-center transition-colors duration-200 ${
                    isSelected ? "bg-purple-100" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{reason.emoji}</span>
                    <span className={`font-semibold ${isSelected ? "text-purple-700" : "text-gray-700"}`}>{reason.text}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-purple-500 bg-purple-500" : "border-gray-300 bg-white"
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
            disabled={selectedReasons.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step17() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step17Content />
    </Suspense>
  )
}
