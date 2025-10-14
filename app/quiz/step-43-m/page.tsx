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

function Step43MContent() {
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
          <h1 className="text-5xl font-bold text-blue-600">84%</h1>
          <p className="text-gray-700 text-lg mb-6">of Relatio users experienced positive changes within just 7 days</p>

          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-green-400 p-5 text-left space-y-3">
            <div className="flex items-center gap-3">
              <Image src="/step43/240_ValueProp.png" alt="Jennifer T." width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-bold text-gray-800">Jennifer T.</p>
                <p className="text-xs text-gray-500">2 reviews • USA</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Verified</span>
              </div>
              <div className="text-xs text-gray-400">12 days ago</div>
            </div>
            <div className="flex text-green-500"> <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> </div>
            <p className="font-bold text-gray-800">Love of my life is back</p>
            <div className="text-gray-600 text-sm space-y-3">
              <p>We were together for 5 years and I was sure he was the love of my entire life and father of my future children.</p>
              <p>One evening, as I returned home from work, I found him sitting on the couch with a distant look. As I approached him, his gaze met mine, but all warmth was gone, replaced by an unfamiliar coldness. He uttered words that would haunt me for days, "I don't love you, and I'm not sure I ever did." My heart shattered into a million pieces, and I felt like the ground beneath me had disappeared. I spent days mourning our relationship, replaying every memory, trying to pinpoint where things went wrong.</p>
              <p>During one of my lowest moments, a friend introduced me to Relatio. Skeptical but desperate for any semblance of healing, I decided to give it a shot.</p>
              <p>Just after 3 days, he started texting me, but I stayed calm as was described in my personal plan. On the weekend he sent me a beautiful bunch of flowers and invited me to our favorite cafe we used to spend hours in. He stood on his knee, and said: "Losing you was the biggest mistake of my entire life"</p>
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

export default function Step43M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step43MContent />
    </Suspense>
  )
}
