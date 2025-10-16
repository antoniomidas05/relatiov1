"use client"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Componente de ícone
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
      {/* --- FIM DO CABEÇALHO --- */}
      {/* --- CONTEÚDO DA PÁGINA --- */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Step 5M</h1>
          <p className="text-gray-700 mb-6">This is the content for Step 5M.</p>
          <button onClick={handleContinue} className="bg-blue-500 text-white py-2 px-4 rounded">
            Continue
          </button>
        </div>
      </div>
      {/* --- FIM DO CONTEÚDO DA PÁGINA --- */}
    </div>
  )
}

export default Step5MContent
