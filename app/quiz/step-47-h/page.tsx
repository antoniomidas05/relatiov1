"use client"

import { useState, useEffect, Suspense, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// --- COMPONENTES ---

const StarIcon = () => ( <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> );

interface TestimonialProps {
  image: string; name: string; location: string; reviews?: string; time: string; title: string; text: React.ReactNode;
}

const TestimonialCard = ({ image, name, location, reviews, time, title, text }: TestimonialProps) => (
  <div className="bg-white rounded-lg shadow-md border p-4 text-left w-full max-w-sm">
    <div className="flex items-center gap-3 mb-2">
      <Image src={image} alt={name} width={40} height={40} className="rounded-full" />
      <div>
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{reviews ? `${reviews} • ` : ''}{location}</p>
      </div>
      <div className="ml-auto text-xs text-gray-400">{time}</div>
    </div>
    <div className="flex mb-2"> <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> </div>
    <div className="space-y-2 text-gray-700">
      <h3 className="font-bold text-lg">{title}</h3>
      {text}
    </div>
  </div>
);

interface PopupProps {
  isOpen: boolean; onConfirm: () => void; onDecline: () => void; title: string; question: React.ReactNode;
}

const QuizPopup = ({ isOpen, onConfirm, onDecline, title, question }: PopupProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center">
        <p className="text-gray-400 mb-2">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{question}</h2>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full transition-colors">
            <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 text-xs">✔</span> Yes
          </button>
          <button onClick={onDecline} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full transition-colors">
             <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 text-xs">✖</span> No
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

function Step47HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [percentage, setPercentage] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [showPopup1, setShowPopup1] = useState(false)
  const [showPopup2, setShowPopup2] = useState(false)

  // --- REFS PARA CONTROLE PRECISO DA ANIMAÇÃO ---
  const animationFrameId = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const pauseStartTimeRef = useRef<number>(0) // Armazena QUANDO a pausa começou
  const popup1Triggered = useRef(false)
  const popup2Triggered = useRef(false)

 const testimonials = [
    {
      image: "/step47/cillian.webp", name: "Cillian", location: "US", time: "Yesterday",
      title: "Got her back", text: <p>I have scheduled two dates with her. I got her back.</p>
    },
    {
      image: "/step47/darrel.webp", name: "Darrel", reviews: "15 reviews", location: "Canada", time: "3 days ago",
      title: "A huge win!", text: <p>I love this program. It has been very informative, helpful, and supportive. Her anxiety around our relationship is melting away.</p>
    },
    {
      image: "/step47/carl.webp", name: "Carl", reviews: "25 reviews", location: "Australia", time: "5 days ago",
      title: "Better than therapy", text: <p>This app was offering guidance to actually get somewhere with myself and my relationship.</p>
    },
    {
      image: "/step47/mike.webp", name: "Mike", location: "US", time: "1 week ago",
      title: "I would give ten stars!", text: <p>We are already back together and willing to do everything to get the situation sorted out so that we can freely be in love again.</p>
    },
  ];

  // --- LÓGICA DE ANIMAÇÃO CORRIGIDA ---
  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) startTimeRef.current = timestamp;

    const totalDuration = 15000;
    const elapsedTime = timestamp - startTimeRef.current;
    const progress = Math.min(Math.floor((elapsedTime / totalDuration) * 100), 100);
    
    setPercentage(progress);

    // Condição para o primeiro popup
    if (progress >= 49 && !popup1Triggered.current) {
      popup1Triggered.current = true;
      pauseStartTimeRef.current = timestamp; // Registra o momento da pausa
      setShowPopup1(true);
      return; // Para o loop de animação
    }
    // Condição para o segundo popup
    if (progress >= 99 && !popup2Triggered.current) {
      popup2Triggered.current = true;
      pauseStartTimeRef.current = timestamp; // Registra o momento da pausa
      setShowPopup2(true);
      return; // Para o loop de animação
    }

    // Continua a animação ou finaliza
    if (progress < 100) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      router.push(`/quiz/step-48?${searchParams.toString()}`);
    }
  }, [router, searchParams]);
  
  // --- FUNÇÃO PARA RETOMAR A ANIMAÇÃO CORRIGIDA ---
  const resumeAnimation = useCallback(() => {
    if (pauseStartTimeRef.current > 0) {
      // Calcula quanto tempo a animação ficou pausada
      const pauseDuration = performance.now() - pauseStartTimeRef.current;
      // Adiciona a duração da pausa ao tempo de início para compensar
      startTimeRef.current += pauseDuration;
    }

    // Reseta o marcador de pausa e esconde os popups
    pauseStartTimeRef.current = 0;
    setShowPopup1(false);
    setShowPopup2(false);

    // Continua o loop de animação
    animationFrameId.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current!);
  }, [animate]);
  
  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-center">
      <Image src="/step1/logotype-color.svg" alt="Relatio Logo" width={140} height={40} priority className="mb-10" />
      
      <div className="relative w-40 h-40 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#e6e6e6" strokeWidth="10" fill="transparent" />
          <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="10" fill="transparent" strokeDasharray={2 * Math.PI * 45} strokeDashoffset={(2 * Math.PI * 45) * (1 - percentage / 100)} strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.3s linear' }} />
          <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d946ef" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        </svg>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-800">{percentage}%</span>
      </div>

      <p className="text-gray-600 mb-8">
        Prioritizing Challenges<br/>
        Setting your goals
      </p>

      <h2 className="text-3xl font-bold text-blue-600 mb-2">1.3 million people</h2>
      <p className="text-gray-700 text-lg mb-8">have chosen our app</p>

      <div className="w-full max-w-sm relative">
        <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-2 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors z-10 text-2xl">
          ‹
        </button>
        
        {testimonials[currentTestimonialIndex] && (
          <TestimonialCard {...testimonials[currentTestimonialIndex]} />
        )}
        
        <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-2 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors z-10 text-2xl">
          ›
        </button>
      </div>

      <QuizPopup
        isOpen={showPopup1}
        onConfirm={resumeAnimation}
        onDecline={resumeAnimation}
        title="To move forward, specify"
        question="Are you inclined to finish what you have started?"
      />
      <QuizPopup
        isOpen={showPopup2}
        onConfirm={resumeAnimation}
        onDecline={resumeAnimation}
        title="To move forward, specify"
        question={<>Are you ready for her to <br/> become obsessed with you?</>}
      />
    </div>
  );
}

export default function Step47H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step47HContent />
    </Suspense>
  )
}
