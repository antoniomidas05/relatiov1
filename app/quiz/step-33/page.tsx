"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de Ícone
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

function Step33Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender")

  const isFemaleUser = gender === "female"
  const partnerPronoun = isFemaleUser ? "him" : "her"
  const otherPartnerGender = isFemaleUser ? "woman" : "man"

  const handleContinue = () => {
    router.push(`/quiz/step-34?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2"><BackArrowIcon /></button>
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <div className="w-10"></div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md flex flex-col items-center">
          <p className="text-gray-800 text-lg max-w-sm mb-8 leading-relaxed">
            Every day of <span className="text-red-500 font-semibold">inactivity</span> or sending the <span className="text-red-500 font-semibold">wrong signals</span> to your Ex damage your chances to get {partnerPronoun} back, and you will risk losing {partnerPronoun} to another {otherPartnerGender}...forever
          </p>

          {/* --- CONTAINER DO GRÁFICO REFEITO --- */}
          <div className="relative w-full max-w-[400px] mx-auto">
            {/* Imagem de fundo */}
            <Image
              src="/step33/risk_graph.webp"
              alt="Risk graph showing decreasing chances over time"
              width={400}
              height={225}
              className="w-full h-auto"
              priority
            />
            
            {/* --- Elemento "Now" --- */}
            <div className="absolute top-[8%] left-[8%] transform -translate-x-1/2">
              {/* Label */}
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-md">
                <span className="font-bold text-pink-500">Now</span>
                {/* Seta do balão */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
              </div>
              {/* Círculo */}
              <div className="w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-sm"></div>
              {/* Linha pontilhada */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 mt-1 border-l-2 border-dashed border-pink-400/70"></div>
            </div>

            {/* --- Elemento "In 2 months" --- */}
            <div className="absolute top-[48%] left-[82%] transform -translate-x-1/2">
              {/* Label */}
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
                <span className="font-bold text-blue-500">In 2 months</span>
                {/* Seta do balão */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
              </div>
              {/* Círculo */}
              <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
              {/* Linha pontilhada */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 mt-1 border-l-2 border-dashed border-blue-400/70"></div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full p-4 bg-gray-100">
        <div className="w-full max-w-md mx-auto">
          <button onClick={handleContinue} className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity">
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step33() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step33Content />
    </Suspense>
  )
}
