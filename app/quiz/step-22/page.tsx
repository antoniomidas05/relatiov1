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

function Step22Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTies, setSelectedTies] = useState<string[]>([])

  const tiesOptions = [
    { id: "living_together", emoji: "🏠", text: "Living together" },
    { id: "children", emoji: "👶", text: "Children" },
    { id: "property_finances", emoji: "💰", text: "Shared property/finances" },
    { id: "work_business", emoji: "💼", text: "Work together/business" },
    { id: "none", emoji: "🚫", text: "None" },
  ]

  const currentStep = 18
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectTie = (tieId: string) => {
    setSelectedTies((prev) => {
      // Se a opção clicada for "none"
      if (tieId === "none") {
        // Se já estava selecionada, desmarca. Senão, marca SÓ ela.
        return prev.includes("none") ? [] : ["none"]
      }
      
      // Se qualquer outra opção for clicada
      const isSelected = prev.includes(tieId)
      let newSelection = isSelected 
        ? prev.filter((id) => id !== tieId) // Desmarca a opção
        : [...prev, tieId]                   // Marca a nova opção
      
      // Garante que "none" seja desmarcado se outra opção for selecionada
      return newSelection.filter((id) => id !== "none")
    })
  }

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("communication_ties", selectedTies.join(","))
    // Navega para a próxima etapa, por exemplo, step-23
    router.push(`/quiz/step-23?${params.toString()}`)
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
      <main className="flex-grow flex flex-col items-center p-6 text-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800">Do you have any ties that require you to communicate with your ex?</h1>
          <p className="text-gray-500 mb-6">(Choose all that apply)</p>
          <div className="space-y-3">
            {tiesOptions.map((tie) => {
              const isSelected = selectedTies.includes(tie.id)
              return (
                <button
                  key={tie.id}
                  onClick={() => handleSelectTie(tie.id)}
                  className={`w-full p-3 rounded-full flex justify-between items-center transition-colors duration-200 ${
                    isSelected ? "bg-purple-100" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{tie.emoji}</span>
                    <span className={`font-semibold ${isSelected ? "text-purple-700" : "text-gray-700"}`}>{tie.text}</span>
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
            disabled={selectedTies.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step22() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step22Content />
    </Suspense>
  )
}
