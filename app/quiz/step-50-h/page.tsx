"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// --- SUB-COMPONENTES PARA ORGANIZAÇÃO ---

// Ícone de Verificação para listas
const CheckIcon = () => (
  <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

// Ícone de Estrela para avaliações
const StarIcon = () => ( <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> );

// Card de Seleção de Plano
const PlanOption = ({ duration, pricePerDay, isPopular, isSelected, onClick }: any) => (
  <div onClick={onClick} className={`cursor-pointer border-2 rounded-lg p-4 flex justify-between items-center relative ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
    {isPopular && <div className="absolute -top-3 left-4 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">most popular</div>}
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500' : 'border-gray-300'}`}>
        {isSelected && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
      </div>
      <span className="font-bold">{duration}</span>
    </div>
    <div className="text-right">
      <p className="text-gray-500 line-through text-sm">€2.00</p>
      <p className="font-bold text-lg">€{pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
    </div>
  </div>
);

// Item do Acordeão (FAQ)
const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-gray-200">
    <button onClick={onClick} className="w-full text-left flex justify-between items-center py-4">
      <span className="font-semibold text-lg text-blue-600">{title}</span>
      <span className={`text-blue-600 text-2xl transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-90'}`}>›</span>
    </button>
    {isOpen && <div className="pb-4 text-gray-600 text-base">{children}</div>}
  </div>
);

// --- PÁGINA PRINCIPAL ---

function Step50HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const exName = searchParams.get("exName") || "her"
  
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [selectedPlan, setSelectedPlan] = useState("4-week");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  
  const testimonials = [
      { image: "/step50/cillian.webp", name: "Cillian", location: "US", time: "Yesterday", title: "Got her back", text: "I have scheduled two dates with her. I got her back." },
      { image: "/step50/darrel.webp", name: "Darrel", location: "Canada", time: "3 days ago", title: "A huge win!", text: "I love this program. Her anxiety around our relationship is melting away. Her statement of 'we never ever will be together' is turning slowly into 'if we are getting back together.' Which I see as a huge win!" },
      { image: "/step50/carl.webp", name: "Carl", location: "Australia", time: "5 days ago", title: "Better than therapy", text: "I've tried counseling, and while I freely shared my emotions and have confirmation that I wasn't crazy, it felt cold. This app was offering guidance to actually get somewhere with myself and my relationship." },
  ];

  const faqItems = [
    { id: 1, title: "1. Why should I choose this plan?", content: "Our carefully customized plans are expertly made to address your relationship challenges and enrich your love life. Created by a team of experienced relationship experts, these plans are tailored to meet your individual needs, offering effective solutions and guidance." },
    { id: 2, title: "2. How I can benefit from this plan?", content: "This plan is to improve your relationships, regardless of whether you are single or in a committed partnership. We cater to your specific needs and goals, offering effective solutions and support." },
    { id: 3, title: "3. What do I need to succeed?", content: "Complete daily tasks, provide feedback, and study materials. We have designed the plan in such a way that each day brings you closer to your goal, step by step." },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md p-2 flex items-center justify-around md:justify-between max-w-3xl mx-auto">
        <div className="text-center">
          <p className="font-semibold text-red-500 text-xs sm:text-sm">Your access expires in:</p>
          <p className="text-xl sm:text-2xl font-bold tracking-widest text-gray-800">{minutes}:{seconds}</p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors text-lg">GET MY PLAN</button>
      </div>

      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-12">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <Image src="/step50/345_OfferPage.webp" alt="Happy couple" width={800} height={450} priority />
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Urgent</span>
        </div>

        {/* Container principal para os cartões de status */}
<div className="flex flex-col items-center gap-4 px-4 sm:px-8">

  {/* Card de Status 1: Goal */}
  <div className="w-full bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
    <Image 
      src="/step50/direct-hit.svg" 
      alt="Goal" 
      width={40} 
      height={40} 
    />
    <div className="text-left">
      <p className="font-semibold text-gray-500">Goal:</p>
      <p className="font-bold text-lg text-blue-600 capitalize">Get {exName} Back</p>
    </div>
  </div>

  {/* Card de Status 2: Probability */}
  <div className="w-full bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
    <Image 
      src="/step50/bar-chart.svg" 
      alt="Probability" 
      width={40} 
      height={40} 
    />
    <div className="text-left">
      <p className="font-semibold text-gray-500">Probability of Success:</p>
      <p className="font-bold text-lg text-green-600">92% (High)</p>
    </div>
  </div>

  {/* Card de Status 3: Timing */}
  <div className="w-full bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
    <Image 
      src="/step50/warning.svg" 
      alt="Risk" 
      width={40} 
      height={40} 
    />
    <div className="text-left">
      <p className="font-semibold text-gray-500">Timing to fix it:</p>
      <p className="font-bold text-lg text-red-500">Urgent*</p>
    </div>
  </div>

</div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">Here is your Personal</h2>
          <h2 className="text-3xl font-bold text-blue-600 capitalize mb-4">Get "{exName}" Back Plan</h2>
          <Image src="/step50/offer_plan_v2_male.png" alt="Plan progress graph" width={600} height={350} className="mx-auto" />
        </div>

        <div className="text-left space-y-4">
          <h3 className="text-3xl font-bold text-center">The Most Scientifically-Validated Technique For Getting Your Ex Back In Your Arms</h3>
          <p className="text-center text-gray-600">You need to exactly follow the plan, and you'll be amazed how quickly she becomes obsessed with the idea of being with you.</p>
          <ul className="space-y-3 pt-4">
            <li className="flex items-start gap-3"><CheckIcon /><span>Extremely powerful, proven techniques to trigger her oxytocin, tailored based on your relationship profile.</span></li>
            <li className="flex items-start gap-3"><CheckIcon /><span>Your Ex starts dreaming of you, wondering where you are, if you're going to text or call her next.</span></li>
            <li className="flex items-start gap-3"><CheckIcon /><span>You'll be able to create a sense of desire so Powerful and Uncontrollable she will be completely powerless to resist.</span></li>
            <li className="flex items-start gap-3"><CheckIcon /><span>Her brain will be chemically wired to think of you as HER ONLY man.</span></li>
          </ul>
        </div>

        <div className="space-y-4">
          <PlanOption duration="4-week plan" pricePerDay="0.99" isPopular={true} isSelected={selectedPlan === "4-week"} onClick={() => setSelectedPlan("4-week")} />
          <PlanOption duration="12-week plan" pricePerDay="0.56" isPopular={false} isSelected={selectedPlan === "12-week"} onClick={() => setSelectedPlan("12-week")} />
          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-full text-xl hover:bg-blue-700 transition-colors">GET MY PLAN</button>
          <Image src="/step50/pay-safe-and-secure.png" alt="Payment methods" width={300} height={25} className="mx-auto" />
          <p className="text-xs text-gray-500 text-center">By clicking “Get My Plan” you agree to enroll in a monthly subscription to our services...</p>
        </div>

        <div className="flex flex-col items-center">
            <Image src="/step50/rating.svg" alt="5-star rating" width={150} height={40} />
            <p className="font-bold">111 369</p>
            <p className="text-gray-500">5-star client reviews</p>
        </div>
{/* --- Seção "What you get?" --- */}
<div className="bg-white p-6 rounded-lg shadow-md text-center">
  <h2 className="text-3xl font-bold mb-6">What you get?</h2>
  
  <ul className="space-y-5 text-left text-lg text-gray-700">
    <li className="flex items-start gap-4">
      <CheckIcon />
      <span>Extremely powerful, proven techniques to trigger <b>her oxytocin</b>, tailored based on your relationship profile</span>
    </li>
    <li className="flex items-start gap-4">
      <CheckIcon />
      <span>Your Ex starts <b>dreaming of you</b>, wondering when you're going to text or call her next</span>
    </li>
    <li className="flex items-start gap-4">
      <CheckIcon />
      <span>She'll be <b>helplessly and uncontrollably attracted</b> to you</span>
    </li>
    <li className="flex items-start gap-4">
      <CheckIcon />
      <span>She's back in your bed, ready to <b>commit like she never was before</b></span>
    </li>
    <li className="flex items-start gap-4">
      <CheckIcon />
      <span>She is sure it was <b>her idea in the first place</b> to get you back</span>
    </li>
    <li className="flex items-start gap-4">
      <CheckIcon />
      <span>You have <b>elevated confidence and self-esteem</b></span>
    </li>
  </ul>

  <div className="mt-10">
    <h3 className="text-2xl font-bold text-gray-800">Make your Ex yearn for your attention with our Personal</h3>
    <h3 className="text-2xl font-bold text-blue-600 capitalize">Get Your Ex Back Plan</h3>
    
    <Image 
      src="/step50/incredible-results-achieved.svg" // Crie e adicione esta imagem na sua pasta public/step50
      alt="Illustration of hands connecting"
      width={300}
      height={200}
      className="mx-auto mt-4"
    />
  </div>
</div>

{/* --- Seção de Prova Social e Logos --- */}
<div className="bg-white p-6 rounded-lg shadow-md space-y-8">

  {/* Estatísticas */}
  <div className="space-y-6">
    {/* Estatística 1 */}
    <div className="flex items-start gap-4">
      <p className="text-5xl font-bold text-blue-500 w-20 text-right">94%</p>
      <p className="text-gray-600 text-lg">
        of men using Relatio <span className="text-blue-500 font-semibold">get back</span> together with their Ex
      </p>
    </div>

    {/* Estatística 2 */}
    <div className="flex items-start gap-4">
      <p className="text-5xl font-bold text-blue-500 w-20 text-right">87%</p>
      <p className="text-gray-600 text-lg">
        noticed <span className="text-blue-500 font-semibold">positive changes</span> in their partner's behavior and <span className="text-blue-500 font-semibold">increased interest</span> to common future
      </p>
    </div>

    {/* Estatística 3 */}
    <div className="flex items-start gap-4">
      <p className="text-5xl font-bold text-blue-500 w-20 text-right">72%</p>
      <p className="text-gray-600 text-lg">
        had positive changes in their <span className="text-blue-500 font-semibold">self-esteem</span> and the way other people <span className="text-blue-500 font-semibold">perceive them</span>
      </p>
    </div>
  </div>

  {/* Divisor */}
  <hr />

  {/* Logos "Covered In" */}
  <div className="text-center space-y-4">
    <h3 className="text-xl font-bold text-gray-800">Our techniques were covered in:</h3>
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-center">
      <Image src="/step50/1.svg" alt="Forbes" width={150} height={40} className="mx-auto" />
      <Image src="/step50/2.svg" alt="Business Insider" width={150} height={40} className="mx-auto" />
      <Image src="/step50/3.svg" alt="American Psychological Association" width={150} height={40} className="mx-auto" />
      <Image src="/step50/4.svg" alt="BBC" width={100} height={40} className="mx-auto" />
      {/* A imagem de Cambridge pode precisar de um contêiner col-span-2 para centralizar */}
      <div className="col-span-2 flex justify-center">
        <Image src="/step50/5.svg" alt="University of Cambridge" width={200} height={40} />
      </div>
    </div>
  </div>

  {/* Divisor */}
  <hr />

  {/* Título "Our clients love Relatio" */}
  <div className="text-center">
    <h3 className="text-3xl font-bold">
      <span className="text-blue-500">Our clients </span>
      <span className="text-pink-500">love Relatio</span>
    </h3>
  </div>
</div>

        <div className="space-y-4">
            {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 text-left">
                    <div className="flex items-center gap-3 mb-2">
                        <Image src={t.image} alt={t.name} width={40} height={40} className="rounded-full" />
                        <div><p className="font-bold">{t.name}</p><p className="text-xs text-gray-500">{t.location}</p></div>
                        <div className="ml-auto text-xs text-gray-400">{t.time}</div>
                    </div>
                    <div className="flex text-green-500 mb-2"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                    <h3 className="font-bold text-lg mb-1">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.text}</p>
                </div>
            ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">FAQ</h2>
            <div>
              {faqItems.map(faq => (
                <AccordionItem 
                  key={faq.id} 
                  title={faq.title} 
                  isOpen={openFaqId === faq.id} 
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </AccordionItem>
              ))}
            </div>
        </div>
        
        <div className="border-2 border-blue-500 rounded-lg p-6 text-center bg-blue-50/50">
            <Image src="/step50/rating.svg" alt="Guarantee Seal" width={60} height={60} className="mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-600">Our plan is backed by a 100% money-back guarantee. If you don't see positive transformation in your intimate wellbeing, we guarantee a full refund.</p>
        </div>
      </div>
    </div>
  );
}

export default function Step50H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <Step50HContent />
    </Suspense>
  )
}
