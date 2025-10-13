"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de ícone
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

function Step5MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleContinue = () => {
    // Aponte para a próxima etapa, por exemplo, step-6
    router.push(`/quiz/step-6-m?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* --- CABEÇALHO SIMPLES --- */}
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2">
          <BackArrowIcon />
        </button>
        <Image src="/step3/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <div className="w-10"></div> {/* Espaçador */}
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Did you know that...
          </h2>

          <div className="mb-6 shadow-lg rounded-2xl overflow-hidden">
            <Image
              src="/step5/205_ValueProp.png"
              alt="Couple embracing at sunset"
              width={300}
              height={200}
              className="object-cover"
              priority
            />
          </div>

          <p className="text-gray-700 max-w-xs text-lg">
            More than 90% of all relationships can be salvaged...{" "}
            <span className="text-blue-500 font-semibold">
              and yours is no different!
            </span>
          </p>
        </div>
      </main>

      {/* --- RODAPÉ COM BOTÃO DE CONTINUAR --- */}
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

export default function Step5M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step5MContent />
    </Suspense>
  )
}
