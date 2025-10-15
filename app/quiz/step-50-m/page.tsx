"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// --- COPIE OS SUB-COMPONENTES (StarIcon, AccordionItem) AQUI ---

function Step50MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const exName = searchParams.get("exName") || "him"

  // ... (a lógica do contador e do FAQ é a mesma)
  
  // --- MUDANÇA: DEPOIMENTOS FEMININOS ---
  const testimonials = [
      { image: "/step47/emily_s.png", name: "Emily S", location: "Australia", time: "11 days ago", title: "I would give ten stars out of five!!!", text: "We are already back together and willing to do everything to get the situation sorted out..." },
      { image: "/step47/offer_kate_z.webp", name: "Kate Z", location: "US", time: "4 days ago", title: "He texted 'I love you'!", text: "He texted and said he loved me last night. I'm finding my voice and strength again." },
      { image: "/step47/offer_sophia_b.webp", name: "Sophia B", location: "US", time: "3 days ago", title: "I couldn't believe, but it works!", text: "I have had multiple phone calls and dates with my ex after the 'no contact rule.'" },
  ];

  return (
     <div className="bg-gray-100">
      {/* O JSX é praticamente o mesmo, apenas ajuste os textos */}
      {/* Por exemplo, no componente de Stats: */}
      {/* ... */}
      {/* <div><p>Goal: <br/> Get him back</p></div> */}
      {/* ... */}
    </div>
  );
}

export default function Step50M() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step50MContent />
    </Suspense>
  )
}
