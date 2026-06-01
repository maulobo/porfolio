import type { ChatOption } from "./chatbotFlow";

const optionColors = [
  "bg-white text-black hover:bg-[#d7ff4f]",
  "bg-white text-black hover:bg-[#d7ff4f]",
  "bg-white text-black hover:bg-[#d7ff4f]",
  "bg-white text-black hover:bg-[#d7ff4f]",
];

const ChatbotOptions = ({
  options,
  onSelect,
}: {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}) => {
  return (
    <div className="flex flex-col gap-2.5 px-4 pb-4 pt-2">
      {options.map((opt, i) => (
        <button
          key={opt.nextId + opt.label}
          onClick={() => onSelect(opt)}
          className={`clickable border-2 border-black px-4 py-3 text-left font-mono text-xs font-black uppercase tracking-[0.12rem] shadow-[4px_4px_0_#111111] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111] ${optionColors[i % optionColors.length]}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ChatbotOptions;
