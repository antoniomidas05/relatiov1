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

function Step44Content() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentStep = 35
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleContinue = () => {
    // Navega para a próxima etapa
    router.push(`/quiz/step-45?${searchParams.toString()}`)
  }
  
  // Posições dos pins em porcentagem (left, top)
  const pinPositions = [
    { src: '/step44/pin_1.svg', pos: 'left-[15%] top-[15%]' },
    { src: '/step44/pin_2.svg', pos: 'left-[25%] top-[35%]' },
    { src: '/step44/pin_3.svg', pos: 'left-[38%] top-[10%]' },
    { src: '/step44/pin_4.svg', pos: 'left-[48%] top-[40%]' },
    { src: '/step44/pin_5.svg', pos: 'left-[55%] top-[20%]' },
    { src: '/step44/pin_6.svg', pos: 'left-[68%] top-[12%]' },
    { src: '/step44/pin_7.svg', pos: 'left-[75%] top-[38%]' },
    { src: '/step44/pin_8.svg', pos: 'left-[85%] top-[55%]' },
  ];

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
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Mapa com Pins */}
          <div className="relative w-full max-w-sm mx-auto mb-8">
            <Image 
              src="/step44/black_on_white_dotted_world_map.webp"
              alt="World map"
              width={500}
              height={250}
              className="w-full h-auto"
            />
            {pinPositions.map((pin, index) => (
              <div key={index} className={`absolute ${pin.pos} w-12 h-12`}>
                <Image src={pin.src} alt={`Pin ${index + 1}`} fill className="object-contain" />
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Join over 1,000,000 people
          </h2>
          <p className="text-gray-600 max-w-xs text-lg">
            Become part of a growing worldwide community and achieve your goals with us!
          </p>
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

export default function Step44() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step44Content />
    </Suspense>
  )
}
