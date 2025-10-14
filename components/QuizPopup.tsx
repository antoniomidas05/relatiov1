// components/QuizPopup.tsx (ou no topo do arquivo da página)

interface PopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  title: string;
  question: React.ReactNode;
}

export const QuizPopup = ({ isOpen, onConfirm, onDecline, title, question }: PopupProps) => {
  if (!isOpen) return null;

  return (
    // Overlay de fundo
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Card do Popup */}
      <div className="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center">
        <p className="text-gray-400 mb-2">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{question}</h2>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full transition-colors">
            <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 text-xs">✔</span>
            Yes
          </button>
          <button onClick={onDecline} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full transition-colors">
             <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 text-xs">✖</span>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
