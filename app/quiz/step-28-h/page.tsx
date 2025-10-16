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

function Step28HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleContinue = () => {
    // Aponte para a próxima etapa, por exemplo, step-29
    router.push(`/quiz/step-29-h?${searchParams.toString()}`)
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Thanks for sharing! <br /> We are here to support you
          </h2>
          <div className="mb-8 p-4 bg-white rounded-3xl shadow-lg">
            <Image
              src="/step28/336_ValueProp.png"
              alt="Brad B. from Relatio"
              width={320}
              height={240}
              className="rounded-2xl"
              priority
            />
          </div>
          <div className="max-w-sm space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              It took more than five years of learning and testing, but we’ve managed to{" "}
              <span className="text-blue-500 font-semibold">
                break down the female behavioral patterns at their core...
              </span>{" "}
              and discover exactly what ‘makes women tick’.
            </p>
            <p className="text-gray-500">Brad B., Head of Behavioral Science at Relatio</p>
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

export default function Step28H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step28HContent />
    </Suspense>
  )
}
