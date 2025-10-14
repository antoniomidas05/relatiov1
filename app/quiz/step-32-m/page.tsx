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

// Componente para os itens de estatísticas
const StatItem = ({ icon, title, value }: { icon: string; title: string; value: string }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
    <Image src={icon} alt="" width={24} height={24} />
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-bold text-gray-800">{value}</p>
    </div>
  </div>
)

function Step32MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleContinue = () => {
    // Aponte para a próxima etapa, por exemplo, step-33
    router.push(`/quiz/step-33?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2"><BackArrowIcon /></button>
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <div className="w-10"></div> {/* Espaçador */}
      </header>
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Summary of your profile</h1>
          
          {/* Cartão Principal */}
          <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Emotional Separation level</h2>
              <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded-md">High</span>
            </div>

            <div className="relative flex justify-center">
              {/* --- MUDANÇA DE IMAGEM --- */}
              <Image src="/step32/summary_female.webp" alt="Profile Summary" width={150} height={150} className="rounded-full border-4 border-white shadow-md" />
              <div className="absolute -bottom-1 right-12 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-md shadow-lg">
                Your level
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
              </div>
            </div>

            {/* Medidor */}
            <div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500"></div>
              <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                <span>Low</span>
                <span>Normal</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            {/* Caixa de Informação */}
            <div className="bg-red-50 text-red-900 p-4 rounded-lg flex items-start gap-3 text-left">
              <Image src="/step32/info-red.svg" alt="Info" width={20} height={20} className="mt-1" />
              <div>
                <h3 className="font-bold">HIGH level</h3>
                <p className="text-sm">A high level of emotional separation from your ex can impact your chances of reconnecting. You may struggle with knowing what to say or how to act, as the emotional distance makes it difficult to gauge their feelings. A wrong move could push them further away, causing them to ignore or distance themselves even more.</p>
              </div>
            </div>
          </div>

          {/* Grid de Estatísticas */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <StatItem icon="/step32/brain-blue.svg" title="Breakup reason" value="Multiple" />
            {/* --- MUDANÇA DE VALOR --- */}
            <StatItem icon="/step32/thunder-blue.svg" title="Current situation" value="Avoidance" />
            <StatItem icon="/step32/star-filled-blue.svg" title="Time apart" value="< 1 month" />
            <StatItem icon="/step32/question-circle-blue.svg" title="Overthinking level" value="High" />
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

export default function Step32M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step32MContent />
    </Suspense>
  )
}
