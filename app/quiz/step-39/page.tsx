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

function Step39Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender"); // Precisamos ler o gênero

  const sexOptions = [
    { id: "intimate_slow", text: "Intimate and slow", image: "/step39/336_KindSex_1.png" },
    { id: "rough_adventurous", text: "Rough and adventurous", image: "/step39/336_KindSex_2.png" },
    { id: "balance_both", text: "Balance of both", image: "/step39/336_KindSex_3.png" },
    { id: "prefer_not_to_say", text: "Prefer not to say", image: "/step39/336_KindSex_4.png" },
  ]

  const currentStep = 32
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectOption = (optionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sex_kind", optionId)
    // --- LÓGICA DE ROTEAMENTO ATUALIZADA ---
    const isFemale = gender === "female";
    const nextStepUrl = isFemale 
      ? "/quiz/step-40-m" 
      : "/quiz/step-40-h";
      
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
            What kind of sex did you have with your Ex?
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {sexOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className="flex flex-col items-center gap-2 p-2 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-full h-28 relative rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                  <Image
                    src={option.image}
                    alt={option.text}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-gray-700 text-center text-sm py-2">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step39() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step39Content />
    </Suspense>
  )
}
