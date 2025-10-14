// app/quiz/step-48/page.tsx

"use client"

import { useState, useTransition, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { subscribeToActiveCampaign } from "../action" // A importação está correta

function Step48Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userEmail, setUserEmail] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleContinue = () => {
    // Agora só precisamos enviar o e-mail, conforme o formulário
    const submissionData = { 
      userEmail, 
    }

    startTransition(async () => {
      const result = await subscribeToActiveCampaign(submissionData)
      if (result.success) {
        const finalParams = new URLSearchParams(searchParams.toString())
        finalParams.set("userEmail", userEmail)
        router.push(`/thank-you?${finalParams.toString()}`)
      } else {
        alert(result.message || "An error occurred. Please try again.")
      }
    })
  }

  const isEmailValid = userEmail.includes('@') && userEmail.length > 5;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="absolute top-8 p-4 w-full max-w-md mx-auto flex justify-center">
        <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={140} height={40} priority />
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Enter your email to get personal
        </h1>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Get Your Ex Back Plan
        </h2>
        
        <div className="relative w-full max-w-xs">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-4 pl-12 text-center text-lg border-2 border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <p className="text-gray-500 text-xs mt-3">
          We respect your privacy and are committed to protecting your personal data
        </p>
      </main>

      <footer className="w-full p-4">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!isEmailValid || isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Submitting..." : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function Step48() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step48Content />
    </Suspense>
  )
}
