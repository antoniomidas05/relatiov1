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

function Step35Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender"); // Precisamos ler o gênero
  const [selectedMemories, setSelectedMemories] = useState<string[]>([])

  const sharedMemories = [
    { id: "series_movies", emoji: "🍿", text: "Series or movies we loved to watch together" },
    { id: "favorite_song", emoji: "🎵", text: "Our favorite song" },
    { id: "favorite_place", emoji: "☕", text: "Our favorite place" },
    { id: "first_met_place", emoji: "🏝️", text: "A specific place where we first met" },
    { id: "hobby_activity", emoji: "⚽", text: "Shared hobby or activity" },
    { id: "identical_bracelets", emoji: "🧑‍🤝‍🧑", text: "Identical bracelets" },
    { id: "matching_tattoos", emoji: "😮", text: "Matching tattoos" },
  ]

  const currentStep = 28
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectMemory = (memoryId: string) => {
    setSelectedMemories((prev) =>
      prev.includes(memoryId)
        ? prev.filter((id) => id !== memoryId)
        : [...prev, memoryId]
    )
  }

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("shared_memories", selectedMemories.join(","))
    // --- LÓGICA DE ROTEAMENTO ATUALIZADA ---
    const isFemale = gender === "female";
    const nextStepUrl = isFemale 
      ? "/quiz/step-36-m" 
      : "/quiz/step-36-h";
      
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
      <main className="flex-grow flex flex-col items-center p-6 text-center overflow-y-auto">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">What shared memories do you and your Ex have?</h1>
          <div className="space-y-3">
            {sharedMemories.map((memory) => {
              const isSelected = selectedMemories.includes(memory.id)
              return (
                <button
                  key={memory.id}
                  onClick={() => handleSelectMemory(memory.id)}
                  className={`w-full p-3 rounded-full flex justify-between items-center transition-colors duration-200 ${
                    isSelected ? "bg-blue-100" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{memory.emoji}</span>
                    <span className={`font-semibold text-left ${isSelected ? "text-blue-700" : "text-gray-700"}`}>{memory.text}</span>
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
            disabled={selectedMemories.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step35() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step35Content />
    </Suspense>
  )
}
