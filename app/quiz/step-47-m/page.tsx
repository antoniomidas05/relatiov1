"use client"

import { useState, useEffect, Suspense, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// --- COMPONENTES (Colocados aqui para garantir que o código seja autocontido) ---

// Componente para o card de depoimento
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
      <div className="ml-auto flex items-center gap-1 text-xs text-gray-500">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          <span>Verified</span>
      </div>
      <div className="ml-auto text-xs text-gray-400 pl-2">{time}</div>
    </div>
    <div className="flex mb-2"> <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> </div>
    <div className="space-y-2 text-gray-700">
      <h3 className="font-bold text-lg">{title}</h3>
      {text}
    </div>
  </div>
);

// Componente para o popup
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

function Step47MContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [percentage, setPercentage] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [showPopup1, setShowPopup1] = useState(false)
  const [showPopup2, setShowPopup2] = useState(false)

  const animationFrameId = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const pauseStartTimeRef = useRef<number>(0)
  const popup1Triggered = useRef(false)
  const popup2Triggered = useRef(false)

  // --- MUDANÇA: DEPOIMENTOS FEMININOS ---
  const testimonials = [
    {
      image: "/step47/emily_s.png", 
      name: "Emily S", location: "Australia", reviews: "6 reviews", time: "11 days ago",
      title: "I would give ten stars out of five!!!", 
      text: <p>We could not even place a single word without being at our own throats, and now 4 days after I started the program... we are already back together and willing to do everything to get the situation sorted out so that we can freely be in love again.</p>
    },
    {
      image: "/step47/offer_kate_z.webp",
      name: "Kate Z", location: "US", reviews: "14 reviews", time: "4 days ago",
      title: "He texted 'I love you'!",
      text: <p>He texted and said he loved me last night. I'm finding my voice and strength again. Now I feel as if I'm healing</p>
    },
    {
      image: "/step47/offer_sophia_b.webp",
      name: "Sophia B", location: "US", reviews: "1 review", time: "3 days ago",
      title: "I couldn't believe, but it works!",
      text: <p>I love this program. It has been very informative, helpful, and supportive. I have had multiple phone calls and dates with my ex after the "no contact rule." His statement of "we never ever will be together" is turning slowly into "if we are getting back together."</p>
    }
  ];

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) startTimeRef.current = timestamp;

    const totalDuration = 15000;
    const elapsedTime = timestamp - startTimeRef.current;
    const progress = Math.min(Math.floor((elapsedTime / totalDuration) * 100), 100);
    
    setPercentage(progress);

    if (progress >= 49 && !popup1Triggered.current) {
      popup1Triggered.current = true;
      pauseStartTimeRef.current = timestamp;
      setShowPopup1(true);
      return;
    }
    if (progress >= 99 && !popup2Triggered.current) {
      popup2Triggered.current = true;
      pauseStartTimeRef.current = timestamp;
      setShowPopup2(true);
      return;
    }

    if (progress < 100) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      router.push(`/quiz/step-48?${searchParams.toString()}`);
    }
  }, [router, searchParams]);
  
  const resumeAnimation = useCallback(() => {
    if (pauseStartTimeRef.current > 0) {
      const pauseDuration = performance.now() - pauseStartTimeRef.current;
      startTimeRef.current += pauseDuration;
    }
    pauseStartTimeRef.current = 0;
    setShowPopup1(false);
    setShowPopup2(false);
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

      {/* Primeiro popup (igual para ambos) */}
      <QuizPopup
        isOpen={showPopup1}
        onConfirm={resumeAnimation}
        onDecline={resumeAnimation}
        title="To move forward, specify"
        question="Are you inclined to finish what you have started?"
      />
      {/* --- MUDANÇA: SEGUNDO POPUP --- */}
      <QuizPopup
        isOpen={showPopup2}
        onConfirm={resumeAnimation}
        onDecline={resumeAnimation}
        title="To move forward, specify"
        question={<>Do you want to boost your <br/> attraction and desirability?</>}
      />
    </div>
  );
}

export default function Step47M() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100"></div>}>
      <Step47MContent />
    </Suspense>
  )
}
