// ===========================================
// Arquivo: src/components/TestimonialsDisplay.jsx
// ===========================================

import React from 'react';
import Image from 'next/image'; // Para o componente Image do Next.js
// Importe StarIcon de onde você o define na sua página principal ou de uma biblioteca como Heroicons.
// Estou incluindo uma versão local aqui para garantir que funcione independentemente.
const StarIcon = () => (
  <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);


// Dados de exemplo para os depoimentos (você pode substituir isso pelos seus dados reais)
const testimonialsData = [
  {
    name: "Kate Z",
    reviews: 14,
    location: "US",
    verified: true,
    time: "4 days ago",
    title: "He texted 'I love you!'",
    text: "He texted and said he loved me last night. I'm finding my voice and strength again. Now I feel as if I'm healing",
    avatar: "/step50/kate.webp", // AJUSTE ESTES CAMINHOS DE IMAGEM PARA ONDE ELAS ESTÃO NO SEU PROJETO
  },
  {
    name: "Sophia B",
    reviews: 7,
    location: "US",
    verified: true,
    time: "3 days ago",
    title: "I couldn't believe, but it works!",
    text: "I love this program. It has been very informative, helpful, and supportive. I have had multiple phone calls and dates with my ex after the 'no-contact' rule'. All went really well and he noticed my emotional growth within 2 months. His anxiety around our relationship is melting away. Her statement of 'we never ever will be together' is turning slowly into 'if we are getting back together.' Which I see as a huge win!",
    avatar: "/step50/sophia.webp", // AJUSTE ESTES CAMINHOS DE IMAGEM
  },
  {
    name: "Emily S",
    reviews: 6,
    location: "Australia",
    verified: true,
    time: "11 days ago",
    title: "I would give ten stars out of five!!!",
    text: "We could not even place a single word without being at our own throats, and now 4 days after I started the program, with what I've learned, it is not perfect but we are already back together and willing to do everything to get the situation sorted out so that we can freely be in love again. If I could I would give ten stars out of five!!!",
    avatar: "/step50/emily.webp", // AJUSTE ESTES CAMINHOS DE IMAGEM
  },
  {
    name: "Harper J",
    reviews: 2,
    location: "Canada",
    verified: true,
    time: "yesterday",
    title: "Better than therapy",
    text: "I've tried counseling, and while I freely shared my emotions and have confirmation that I wasn't crazy, it felt cold. This app was offering guidance to actually get somewhere with myself and my relationship.",
    avatar: "/step50/harper.webp", // AJUSTE ESTES CAMINHOS DE IMAGEM
  },
];

function TestimonialsDisplay() {
  return (
    <div className="relative py-8 bg-gray-50"> {/* Container principal, ajuste o bg conforme necessário */}
      {/* Ícone de seta no topo, se necessário, como no seu design */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 "> {/* Ajustado para ficar um pouco acima */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-pink-500">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14l-4-4h8l-4 4z" />
          <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 4.06 8.78 7.31a.75.75 0 01-1.06-1.06l3.75-3.75z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 px-4"> {/* Container para os depoimentos */}
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    {testimonial.name}
                    <span className="text-xs text-gray-500 ml-1">
                      {testimonial.reviews} reviews
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{testimonial.time}</p>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-green-500">
                {/* Renderiza 5 estrelas verdes */}
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5" />
                ))}
              </div>
              {testimonial.verified && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg mb-2 text-gray-800">{testimonial.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsDisplay;
