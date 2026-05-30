import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotFlow, type ChatOption } from "./chatbotFlow";
import ChatbotBubble from "./ChatbotBubble";
import ChatbotOptions from "./ChatbotOptions";
import BoomAnimation from "./BoomAnimation";

type HistoryItem = { type: "bot" | "user"; text: string };

const ChatbotPanel = ({
  onClose,
  showBoom,
  onBoomComplete,
}: {
  onClose: () => void;
  showBoom: boolean;
  onBoomComplete: () => void;
}) => {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "bot", text: chatbotFlow.start.message },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentNode = chatbotFlow[currentNodeId];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSelect = (option: ChatOption) => {
    const nextNode = chatbotFlow[option.nextId];
    setHistory((prev) => [
      ...prev,
      { type: "user", text: option.label },
      { type: "bot", text: nextNode.message },
    ]);
    setCurrentNodeId(option.nextId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden border-2 border-black shadow-[8px_8px_0_#111111]"
      style={{ width: "360px", maxWidth: "calc(100vw - 2rem)", maxHeight: "520px" }}
    >
      {showBoom && <BoomAnimation onComplete={onBoomComplete} />}

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between bg-[#111111] px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.22rem] text-[#d7ff4f]">
          SmartCloud
        </span>
        <button
          onClick={onClose}
          className="font-mono text-xl leading-none text-white/50 transition-colors hover:text-[#ff2bf9]"
          aria-label="Cerrar chat"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-3 pt-4"
        style={{
          background: "#f3f0e8",
          backgroundImage: "radial-gradient(circle, #11111115 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        <AnimatePresence initial={false}>
          {history.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatbotBubble text={item.text} type={item.type} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="h-2" />
      </div>

      {/* Options or CTA */}
      <div className="shrink-0 border-t-2 border-black bg-[#f3f0e8] pt-2">
        {currentNode.options.length > 0 ? (
          <ChatbotOptions options={currentNode.options} onSelect={handleSelect} />
        ) : currentNode.cta ? (
          <div className="px-3 pb-3">
            <a
              href={currentNode.cta.href}
              className="block border-2 border-black bg-[#d7ff4f] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12rem] shadow-[3px_3px_0_#111111] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111111]"
            >
              {currentNode.cta.label}
            </a>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ChatbotPanel;
