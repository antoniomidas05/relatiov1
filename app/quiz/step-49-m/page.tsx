"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

function Step49HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Pega o nome do(a) ex da URL, que foi inserido na Etapa 46
  const exName = searchParams.get("exName") || "Your Ex"

  const handleContinue = () => {
    router.push(`/quiz/step-50-m?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between text-center p-4">
      <header className="w-full max-w-md mx-auto flex justify-center py-8">
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={140} height={40} priority />
      </header>
      
      <main className="w-full flex flex-col items-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          Your 4-week <br />
          {/* O nome do ex é inserido dinamicamente aqui */}
          <span className="text-blue-600 capitalize">"{exName}" Back Plan</span> <br />
          is ready
        </h1>

        <div className="relative w-full max-w-lg mx-auto my-8">
          <Image 
            src="/step50/offer_plan_v2_female.webp" 
            alt="Relationship progress graph" 
            width={600} 
            height={400} 
            className="w-full h-auto"
            priority
          />
        
        </div>
      </main>

      <footer className="w-full p-4">
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

export default function Step49H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>}>
      <Step49HContent />
    </Suspense>
  )
}
