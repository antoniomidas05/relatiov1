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
const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

function Step43HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleContinue = () => {
    // Aponte para a próxima etapa
    router.push(`/quiz/step-44?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 w-full max-w-md mx-auto">
        <button onClick={() => router.back()} className="p-2"><BackArrowIcon /></button>
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={120} height={35} priority />
        <div className="w-10"></div>
      </header>
      <main className="flex-grow flex flex-col items-center p-4 text-center">
        <div className="w-full max-w-md">
          <h1 className="text-5xl font-bold text-blue-600">89%</h1>
          <p className="text-gray-700 text-lg mb-6">of Relatio users experienced positive changes within just 7 days</p>

          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-green-400 p-5 text-left space-y-3">
            <div className="flex items-center gap-3">
              <Image src="/step43/340_ValueProp.png" alt="Mark W." width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-bold text-gray-800">Mark W.</p>
                <p className="text-xs text-gray-500">3 reviews • USA</p>
              </div>
              <div className="ml-auto text-xs text-gray-400">4 days ago</div>
            </div>
            <div className="flex text-green-500"> <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> </div>
            <p className="font-bold text-gray-800">Love of my life is back</p>
            <div className="text-gray-600 text-sm space-y-3">
              <p>"This isn't working, I don't want to be with you anymore" – she said quietly and it was like a punch in my face. It opened up an all-consuming abyss of fear I could barely control.</p>
              <p>With just one sentence, my world came crashing down on top of me. I spent nights lying in bed, staring at the ceiling wondering what I could've done or said differently.</p>
              <p>The thoughts of her with another man made my stomach instantly roll into a lead ball, no matter how hard you tried to push away that image. Once it's in there, it's hard to get it out of your mind. It haunted you night and day. When I took the Relatio quiz I was kinda skeptical because, let's face it, it sounded easy. But, when I started using the plan I saw what you were talking about...</p>
              <p>Exactly 5 days after I started using the system my ex started replying to all my texts... that almost never happened before. Eventually she started sending me longer and longer messages. Last week she visited me for the first time in 2.5 months and asked for a date after work. Then this Weds she said she had been "feeling a little empty" and maybe thought we should be more than just friends.</p>
              <p>HOLY SH*T I WAS SO HAPPY!!!! Never felt such incredible sense of relief. This may sound overdramatic but your system changed my life! Thank you SO much!</p>
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

export default function Step43H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step43HContent />
    </Suspense>
  )
}
