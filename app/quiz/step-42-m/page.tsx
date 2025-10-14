"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de Ícone
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

function Step42MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedImage, setSelectedImage] = useState<string>("")

  const vibeOptions = [
    { id: "vibe_1", image: "/step42/239_HoneyMoon_1.png" },
    { id: "vibe_2", image: "/step42/239_HoneyMoon_2.png" },
    { id: "vibe_3", image: "/step42/239_HoneyMoon_3.png" },
    { id: "vibe_4", image: "/step42/239_HoneyMoon_4.png" },
  ]

  const currentStep = 34
  const totalSteps = 38 // A imagem mostra /37, mas manteremos a consistência
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleSelectImage = (imageId: string) => {
    setSelectedImage(imageId)
    // Navegação automática após a seleção
    const params = new URLSearchParams(searchParams.toString())
    params.set("honeymoon_vibe", imageId)
    // Aponte para a próxima página
    router.push(`/quiz/step-43?${params.toString()}`)
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
          <h1 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">
            Which image captures the vibe of your honeymoon phase?
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {vibeOptions.map((option) => (
              <div key={option.id} onClick={() => handleSelectImage(option.id)} className="cursor-pointer space-y-3 flex flex-col items-center">
                <div className={`relative w-36 h-36 rounded-2xl overflow-hidden transition-all duration-200 ${selectedImage === option.id ? 'ring-4 ring-blue-500' : 'ring-2 ring-transparent'}`}>
                  <Image src={option.image} alt={`Vibe option ${option.id}`} fill className="object-cover" />
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedImage === option.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'}`}>
                  {selectedImage === option.id && <span className="text-white text-sm">✔</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step42M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step42MContent />
    </Suspense>
  )
}
