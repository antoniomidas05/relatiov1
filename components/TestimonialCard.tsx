// components/TestimonialCard.tsx (ou no mesmo arquivo da página)
import Image from 'next/image';

const StarIcon = () => ( <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> );

interface TestimonialProps {
  image: string;
  name: string;
  location: string;
  reviews?: string;
  time: string;
  title: string;
  text: React.ReactNode;
}

export const TestimonialCard = ({ image, name, location, reviews, time, title, text }: TestimonialProps) => (
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
