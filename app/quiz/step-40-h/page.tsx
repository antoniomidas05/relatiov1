"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de Ícone
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

function Step40HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleContinue = () => {
    // Aponte para a próxima etapa final
    router.push(`/quiz/step-41-h?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2">
          <BackArrowIcon />
        </button>
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <div className="w-10"></div> {/* Espaçador */}
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center pb-28">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-6 p-3 bg-white rounded-3xl shadow-lg">
            <Image
              src="/step40/237_ValueProp.png"
              alt="Sex Coach Sarah L."
              width={320}
              height={213}
              className="rounded-2xl"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Make her addicted to you 🔥</h2>
          <div className="max-w-sm space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              Triggering Her Oxytocin, you are able to create a sense of desire so{" "}
              <span className="text-red-500 font-semibold">Powerful and Uncontrollable</span> she will be completely
              powerless to resist. She is compelled to call you, text you non-stop, and beg to be with you again,
              thinking IT WAS HER IDEA IN THE FIRST PLACE
            </p>
            <p className="text-gray-500 italic">- Sarah L., Sex Coach</p>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 w-full p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
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

export default function Step40H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step40HContent />
    </Suspense>
  )
}
