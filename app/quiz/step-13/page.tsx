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

function Step13Content() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // --- CORREÇÃO AQUI ---
  // Adicionamos esta linha para definir a variável 'gender'
  const gender = searchParams.get("gender")

  const ratingOptions = [1, 2, 3, 4, 5]
  const currentStep = 10
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleRatingSelect = (rating: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("ex_emotional_rating", rating.toString())

    // Agora esta lógica funcionará, pois 'gender' está definido
    const isFemale = gender === "female"
    const nextStepUrl = isFemale ? "/quiz/step-14-m" : "/quiz/step-14-h"
      
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
          <h1 className="text-2xl font-bold text-gray-800 mb-10">How emotional would you say your Ex is</h1>
          <div className="flex flex-col items-center">
            <div className="flex justify-between gap-3 mb-2">
              {ratingOptions.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-700 font-bold text-lg rounded-full hover:bg-purple-200 hover:text-purple-700 transition-colors"
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between w-full px-2 text-sm text-gray-500">
              <span>Not at all</span>
              <span>Very much</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step13() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step13Content />
    </Suspense>
  )
}
