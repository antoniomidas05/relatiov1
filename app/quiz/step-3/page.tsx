"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"

// Componente para o ícone de seta para voltar (reutilizado)
const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

function Step3Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender")

  const isFemale = gender === "female"
  const imageSrc = isFemale
    ? "/step3/203_ValueProp.png"
    : "/step3/303_ValueProp.png"
  const captionText = isFemale
    ? "We've helped hundreds of thousands of women restore their relationships"
    : "We've helped hundreds of thousands of men restore their relationships"

  const handleContinue = () => {
    const nextStepUrl = isFemale 
      ? "/quiz/step-4-m" 
      : "/quiz/step-4-h"
      
    router.push(`${nextStepUrl}?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2">
          <BackArrowIcon />
        </button>
        <Image
          src="/step3/logotype-color.svg"
          alt="Relatio Logo"
          width={120}
          height={35}
          priority
        />
        <div className="w-10"></div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-xl font-bold text-blue-500">
            1.3 MILLION PEOPLE
          </h2>
          <p className="text-xl font-semibold text-gray-800 mb-10">
            have chosen Relatio
          </p>
          <div className="mb-10">
            <Image
              src={imageSrc}
              alt="People who have chosen Relatio"
              width={250}
              height={250}
              priority
            />
          </div>
          <p className="text-gray-600 max-w-xs">{captionText}</p>
        </div>
      </main>
      <footer className="w-full p-4 bg-gray-100">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step3() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step3Content />
    </Suspense>
  )
}
