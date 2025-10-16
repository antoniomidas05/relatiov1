"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

// --- COMPONENTES DE ÍCONES (sem alterações) ---
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)


function Step2Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // MUDANÇA 1: Estado inicial é 'null'
  // Nenhuma opção começa selecionada. O tipo é ajustado para aceitar 'null'.
  const [selectedAge, setSelectedAge] = useState<string | null>(null)

  const ageOptions = ["18-29", "30-44", "45-54", "55+"]
  const currentStep = 2
  const totalSteps = 38
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleContinue = () => {
    if (!selectedAge) return // Proteção extra para não continuar sem seleção
    
    const params = new URLSearchParams(searchParams.toString())
    params.set("age", selectedAge)
    router.push(`/quiz/step-3?${params.toString()}`)
  }

  return (
    // O container principal ainda controla o layout geral
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2">
          <BackArrowIcon />
        </button>
        <Image
          src="/step1/logotype-color.svg"
          alt="Relatio Logo"
          width={120}
          height={35}
          priority
        />
        <span className="font-semibold text-gray-700 w-12 text-right">
          {String(currentStep).padStart(2, "0")} / {totalSteps}
        </span>
      </header>

      <div className="w-full max-w-md mx-auto px-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-purple-500 h-1 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 
        MUDANÇA 2.2: Adicionado padding-bottom ('pb-28') ao 'main'.
        Isso cria um espaço vazio na parte inferior do conteúdo, garantindo que
        a última opção não fique escondida atrás do rodapé fixo.
      */}
      <main className="flex-grow flex flex-col items-center p-6 text-center pb-28">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            What's your age?
          </h1>
          <p className="text-gray-600 mb-8">
            Dealing with relationships at different life stages requires
            different approaches. Share your age with us so we can start
            creating your{" "}
            <Link href="#" className="text-blue-500 font-medium">
              Personalized Plan
            </Link>
          </p>

          <div className="space-y-3">
            {ageOptions.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`w-full p-4 rounded-full flex justify-between items-center transition-all duration-200 ${
                  selectedAge === age
                    ? "bg-blue-100 border border-blue-500" // Estilo de selecionado
                    : "bg-white border border-transparent hover:bg-gray-50" // Estilo padrão
                }`}
              >
                <span
                  className={`font-semibold ${
                    selectedAge === age ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {age}
                </span>
                {selectedAge === age && (
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* 
        MUDANÇA 2.1: Rodapé com posicionamento fixo.
        - 'fixed bottom-0 left-0' prende o rodapé na parte inferior da tela.
        - 'bg-white/80 backdrop-blur-sm border-t' cria um efeito visual moderno
          que se destaca do conteúdo que pode rolar por trás.
      */}
      <footer className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedAge} // O botão fica desabilitado se 'selectedAge' for 'null'
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step2() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step2Content />
    </Suspense>
  )
}
