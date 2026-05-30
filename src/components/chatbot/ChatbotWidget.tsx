import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import ChatbotPanel from "./ChatbotPanel";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBoom, setShowBoom] = useState(false);
  const hasOpenedRef = useRef(false);

  const handleOpen = () => {
    if (!hasOpenedRef.current) {
      setShowBoom(true);
      hasOpenedRef.current = true;
    }
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);
  const handleBoomComplete = () => setShowBoom(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <ChatbotPanel
            onClose={handleClose}
            showBoom={showBoom}
            onBoomComplete={handleBoomComplete}
          />
        )}
      </AnimatePresence>

      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        className="flex h-14 w-14 items-center justify-center border-2 border-black bg-[#d7ff4f] shadow-[4px_4px_0_#111111] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111]"
        style={
          isOpen
            ? undefined
            : { animation: "chatPulse 2.8s ease-in-out infinite" }
        }
      >
        {isOpen ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <MessageSquare className="h-6 w-6 text-black" />
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;
