"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componentes de Ícone
const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    {" "}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />{" "}
  </svg>
)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
    {" "}
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />{" "}
  </svg>
)

function Step4MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedOption, setSelectedOption] = useState<string>("Heart")

  const decisionOptions = [
    { id: "Heart", emoji: "💖", text: "Heart" },
    { id: "Head", emoji: "🧠", text: "Head" },
    { id: "Both", emoji: "✌️", text: "Both" },
  ]

  const currentStep = 4
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("decision_making", selectedOption.toLowerCase())
    router.push(`/quiz/step-5-m?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2">
          {" "}
          <BackArrowIcon />{" "}
        </button>
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <span className="font-semibold text-gray-700 w-12 text-right">
          {" "}
          {String(currentStep).padStart(2, "0")} / {totalSteps}{" "}
        </span>
      </header>
      <div className="w-full max-w-md mx-auto px-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <main className="flex-grow flex flex-col items-center p-6 text-center pb-32">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-8"> Do you make decisions with your head or heart? </h1>
          <div className="space-y-3">
            {decisionOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-3.5 rounded-full flex justify-between items-center transition-all duration-200 ${selectedOption === option.id ? "bg-blue-100 border border-blue-500" : "bg-white border border-transparent hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className={`font-semibold ${selectedOption === option.id ? "text-blue-600" : "text-gray-700"}`}>
                    {" "}
                    {option.text}{" "}
                  </span>
                </div>
                {selectedOption === option.id && (
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                    {" "}
                    <CheckIcon />{" "}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {" "}
            Continue{" "}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step4M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step4MContent />
    </Suspense>
  )
}
