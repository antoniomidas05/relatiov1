"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// --- SUB-COMPONENTES PARA ORGANIZAÇÃO ---

const CheckIcon = () => (
  <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

const PlanOption = ({ duration, totalPrice, price, originalPrice, isSelected, onClick }: any) => {
  const priceParts = price.split('.');
  return (
    <div 
      onClick={onClick} 
      className={`cursor-pointer border-2 rounded-2xl p-3 flex items-center justify-between transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
    >
      {/* Lado Esquerdo: Botão de Rádio e Duração */}
      <div className="flex items-center gap-4">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-blue-500' : 'border-gray-400'}`}>
          {isSelected && <div className="w-4 h-4 bg-blue-500 rounded-full" />}
        </div>
        <div>
          <span className="font-bold text-base text-gray-800">{duration}</span>
          <p className="font-bold text-lg text-blue-600">{totalPrice}</p>
        </div>
      </div>
      
      {/* Lado Direito: Preço por dia */}
      <div className="text-right">
        <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
        <div className={`font-bold text-white px-3 py-1 rounded-full flex items-center gap-0.5 mt-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-400'}`}>
          <span className="text-sm">$</span>
          <span className="text-lg">{priceParts[0]}</span>
          <span className="text-xs self-start mt-1">.{priceParts[1]}</span>
          <span className="text-xs ml-1 self-end mb-0.5">/dia</span>
        </div>
      </div>
    </div>
  );
};


const AccordionItem = ({ title, children, isOpen, onClick }: any) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <button onClick={onClick} className="w-full text-left flex justify-between items-center">
      <span className="font-semibold text-base text-blue-600">{title}</span>
      <span
        className={`text-blue-600 text-2xl transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      >
        ^
      </span>
    </button>
    {isOpen && <div className="pt-3 text-gray-600 text-sm">{children}</div>}
  </div>
)

// --- PÁGINA PRINCIPAL ---

function Step50HContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const exName = searchParams.get("exName") || "her"

  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [selectedPlan, setSelectedPlan] = useState("4-week")
  const [openFaqId, setOpenFaqId] = useState<number | null>(1)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (timeLeft % 60).toString().padStart(2, "0")

  const handleCheckout = () => {
    const checkoutUrls = {
      "4-week": "https://pay.hotmart.com/M101988747B?off=7xwllyt1&checkoutMode=6",
      "12-week": "https://pay.hotmart.com/M101988747B?off=77rotcnc&checkoutMode=6",
      "24-week": "https://pay.hotmart.com/M101988747B?off=b8ihxtop&checkoutMode=6",
    }
    window.location.href = checkoutUrls[selectedPlan as keyof typeof checkoutUrls]
  }

  const testimonials = [
    {
      image: "/step50/cillian.webp",
      name: "Cillian",
      location: "US",
      time: "Yesterday",
      title: "Got her back",
      text: "I have scheduled two dates with her. I got her back.",
    },
    {
      image: "/step50/darrel.webp",
      name: "Darrel",
      location: "Canada",
      time: "3 days ago",
      title: "A huge win!",
      text: "I love this program. Her anxiety around our relationship is melting away. Her statement of 'we never ever will be together' is turning slowly into 'if we are getting back together.' Which I see as a huge win!",
    },
    {
      image: "/step50/carl.webp",
      name: "Carl",
      location: "Australia",
      time: "5 days ago",
      title: "Better than therapy",
      text: "I've tried counseling, and while I freely shared my emotions and have confirmation that I wasn't crazy, it felt cold. This app was offering guidance to actually get somewhere with myself and my relationship.",
    },
  ]

  const faqItems = [
    {
      id: 1,
      title: "1. Why should I choose this plan?",
      content:
        "Our carefully customized plans are expertly made to address your relationship challenges and enrich your love life. Created by a team of experienced relationship experts, these plans are tailored to meet your individual needs, offering effective solutions and guidance.",
    },
    {
      id: 2,
      title: "2. How I can benefit from this plan?",
      content:
        "This plan is to improve your relationships, regardless of whether you are single or in a committed partnership. We cater to your specific needs and goals, offering effective solutions and support.",
    },
    {
      id: 3,
      title: "3. What do I need to succeed?",
      content:
        "Complete daily tasks, provide feedback, and study materials. We have designed the plan in such a way that each day brings you closer to your goal, step by step.",
    },
  ]

  const plansRef = useRef<HTMLDivElement>(null)

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="bg-white font-sans">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md p-2 flex items-center justify-around max-w-3xl mx-auto">
        <div className="text-center">
          <p className="font-semibold text-xs text-gray-600">discount expires in</p>
          <p className="text-2xl font-bold text-blue-600">
            {minutes}:{seconds}
          </p>
        </div>
        <button
          onClick={scrollToPlans}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-base shadow-lg hover:opacity-90 transition-opacity"
        >
          GET MY PLAN
        </button>
      </div>

      <div className="max-w-xl mx-auto p-4 space-y-12">
        <div className="space-y-4 pt-4">
          <Image
            src="/step50/345_OfferPage.webp"
            alt="Couple"
            width={800}
            height={450}
            className="mx-auto rounded-lg shadow-lg"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-full bg-gray-100 p-3 rounded-lg flex items-center gap-3">
              <Image src="/step50/direct-hit.svg" alt="Goal" width={32} height={32} />
              <div className="text-left">
                <p className="font-semibold text-gray-500 text-sm">Goal:</p>
                <p className="font-bold text-base text-blue-600 capitalize">Get {exName} Back</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 p-3 rounded-lg flex items-center gap-3">
              <Image src="/step50/bar-chart.svg" alt="Probability" width={32} height={32} />
              <div className="text-left">
                <p className="font-semibold text-gray-500 text-sm">Probability of Success:</p>
                <p className="font-bold text-base text-green-600">92% (High)</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 p-3 rounded-lg flex items-center gap-3">
              <Image src="/step50/warning.svg" alt="Risk" width={32} height={32} />
              <div className="text-left">
                <p className="font-semibold text-gray-500 text-sm">Timing to fix it:</p>
                <p className="font-bold text-base text-red-500">Urgent*</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center px-4">
            *Based on your profile every week of hesitation decreases your chance to get your Ex back{" "}
            <b className="text-red-500">by 33%</b>
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">Here is your Personal</h2>
          <h2 className="text-2xl font-bold text-blue-600 capitalize mb-4">Get "{exName}" Back Plan</h2>
          <Image
            src="/step50/offer_plan_v2_male.png"
            alt="Plan progress graph"
            width={500}
            height={300}
            className="mx-auto"
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-bold text-center">
            The Most Scientifically-Validated Technique For Getting Your Ex Back in Your Arms
          </h2>
          <ul className="space-y-4 pt-2 text-base text-gray-700">
            <li className="flex items-start gap-3">
              <CheckIcon />
              <span>
                You need to exactly follow the plan, and you'll be amazed how quickly she becomes obsessed with the idea
                of being with you
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon />
              <span>
                You'll be able to create a sense of desire so Powerful and Uncontrollable she'll be completely powerless
                to resist
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon />
              <span>Her brain will be chemically wired to think of you as her ONLY man</span>
            </li>
          </ul>
        </div>

        <div ref={plansRef} className="space-y-4">
  <div className="relative pt-4">
    <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-40 bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full text-center">
      most popular
    </div>
    <PlanOption
      duration="4-week plan promo 50%"
      totalPrice="$14,70"
      price="0.49" // Preço por dia
      originalPrice="$29,40" // Preço total original
      isSelected={selectedPlan === "4-week"}
      onClick={() => setSelectedPlan("4-week")}
    />
  </div>
  <PlanOption
    duration="12-week plan promo 50%"
    totalPrice="$25,20"
    price="0.28" // Preço por dia
    originalPrice="$50,40" // Preço total original
    isSelected={selectedPlan === "12-week"}
    onClick={() => setSelectedPlan("12-week")}
  />
  <PlanOption
    duration="24-week plan promo 50%"
    totalPrice="$39,60"
    price="0.22" // Preço por dia
    originalPrice="$79,20" // Preço total original
    isSelected={selectedPlan === "24-week"}
    onClick={() => setSelectedPlan("24-week")}
  />
  <button
    onClick={handleCheckout}
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-full text-xl hover:opacity-90 transition-opacity mt-6"
  >
    GET MY PLAN
  </button>

          <Image
            src="/step50/pay-safe-and-secure.png"
            alt="Payment methods"
            width={300}
            height={25}
            className="mx-auto"
          />
          <p className="text-xs text-gray-500 text-center pt-2">
            By clicking “Get My Plan” you agree to enroll in a monthly subscription to https://getrelatio.com/service...{" "}
            <a href="#" className="underline">
              Subscription Policy
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Image src="/step50/rating.svg" alt="5-star rating" width={150} height={40} />
          <p className="font-bold text-lg">111 369</p>
          <p className="text-gray-500 text-sm">5-star client reviews</p>
        </div>
        {/* --- Seção "What you get?" --- */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">What you get?</h2>

          <ul className="space-y-5 text-left text-base sm:text-lg text-gray-700">
            <li className="flex items-start gap-4">
              <CheckIcon />
              <span>
                Extremely powerful, proven techniques to trigger <b>her oxytocin</b>, tailored based on your
                relationship profile
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckIcon />
              <span>
                Your Ex starts <b>dreaming of you</b>, wondering when you're going to text or call her next
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckIcon />
              <span>
                She'll be <b>helplessly and uncontrollably attracted</b> to you
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckIcon />
              <span>
                She's back in your bed, ready to <b>commit like she never was before</b>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckIcon />
              <span>
                She is sure it was <b>her idea in the first place</b> to get you back
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckIcon />
              <span>
                You have <b>elevated confidence and self-esteem</b>
              </span>
            </li>
          </ul>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800">
              Make your Ex yearn for your attention with our Personal
            </h3>
            <h3 className="text-2xl font-bold text-blue-600 capitalize">Get Your Ex Back Plan</h3>

            <Image
              src="/step50/incredible-results-achieved.svg" // Crie esta imagem a partir do print
              alt="Illustration of hands connecting"
              width={300}
              height={200}
              className="mx-auto mt-6"
            />
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <p className="text-5xl font-bold text-blue-500 w-20 text-right">94%</p>
              <p className="text-gray-600 text-lg text-left">
                of men using Relatio <span className="text-blue-500 font-semibold">get back</span> together with their
                Ex
              </p>
            </div>
            <div className="flex items-start gap-4">
              <p className="text-5xl font-bold text-blue-500 w-20 text-right">87%</p>
              <p className="text-gray-600 text-lg text-left">
                noticed <span className="text-blue-500 font-semibold">positive changes</span> in their partner's
                behavior and <span className="text-blue-500 font-semibold">increased interest</span> to common future
              </p>
            </div>
            <div className="flex items-start gap-4">
              <p className="text-5xl font-bold text-blue-500 w-20 text-right">72%</p>
              <p className="text-gray-600 text-lg text-left">
                had positive changes in their <span className="text-blue-500 font-semibold">self-esteem</span> and the
                way other people <span className="text-blue-500 font-semibold">perceive them</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Our techniques were covered in:</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 items-center grayscale opacity-70">
              <Image src="/step50/1.svg" alt="Forbes" width={120} height={30} className="mx-auto" />
              <Image src="/step50/2.svg" alt="Business Insider" width={120} height={30} className="mx-auto" />
              <Image
                src="/step50/3.svg"
                alt="American Psychological Association"
                width={70}
                height={70}
                className="mx-auto"
              />
              <Image src="/step50/4.svg" alt="BBC" width={90} height={30} className="mx-auto" />
              <div className="col-span-2 flex justify-center">
                <Image src="/step50/5.svg" alt="University of Cambridge" width={180} height={35} />
              </div>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <h3 className="text-3xl font-bold">
              <span className="text-blue-500">Our clients </span>
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
                love Relatio
              </span>
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md border p-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={t.image || "/placeholder.svg"}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
                <div className="ml-auto text-xs text-gray-400">{t.time}</div>
              </div>
              <div className="flex text-green-500 mb-2">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <h3 className="font-bold text-lg mb-1">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="relative pt-4">
            <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-40 bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full text-center">
              most popular
            </div>
            <PlanOption
              duration="4-week plan"
              price="0.99"
              originalPrice="$2.00"
              isSelected={selectedPlan === "4-week"}
              onClick={() => setSelectedPlan("4-week")}
            />
          </div>
          <PlanOption
            duration="12-week plan"
            price="0.56"
            originalPrice="$1.12"
            isSelected={selectedPlan === "12-week"}
            onClick={() => setSelectedPlan("12-week")}
          />
          <PlanOption
            duration="24-week plan"
            price="0.44"
            originalPrice="$0.88"
            isSelected={selectedPlan === "24-week"}
            onClick={() => setSelectedPlan("24-week")}
          />
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-full text-xl hover:opacity-90 transition-opacity mt-6"
          >
            GET MY PLAN
          </button>

          <Image
            src="/step50/pay-safe-and-secure.png"
            alt="Payment methods"
            width={300}
            height={25}
            className="mx-auto"
          />
          <p className="text-xs text-gray-500 text-center pt-2">
            By clicking “Get My Plan” you agree to enroll in a monthly subscription to https://getrelatio.com/service...{" "}
            <a href="#" className="underline">
              Subscription Policy
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center">FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((faq) => (
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

        <div className="border-2 border-blue-500 rounded-2xl p-6 text-center bg-white">
          <Image
            src="/step50/guarantee.png"
            alt="Guarantee Seal"
            width={100}
            height={100}
            className="mx-auto -mt-16 mb-2"
          />
          <h3 className="font-bold text-2xl mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-gray-600">
            Our plan is backed by a 100% money-back guarantee. We are so confident about our program that we guarantee a
            full refund within 30 days after purchase if you don't see positive transformation in your intimate
            wellbeing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Step50H() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <Step50HContent />
    </Suspense>
  )
}
