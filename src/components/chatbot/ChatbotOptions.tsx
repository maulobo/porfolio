import type { ChatOption } from "./chatbotFlow";

const optionColors = [
  "bg-[#d7ff4f] text-black hover:bg-[#c8f040]",
  "bg-white text-black hover:bg-[#f3f0e8]",
  "bg-[#ff2bf9] text-black hover:bg-[#e020e0]",
  "bg-[#f3f0e8] text-black hover:bg-white",
];

const ChatbotOptions = ({
  options,
  onSelect,
}: {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 pt-1">
      {options.map((opt, i) => (
        <button
          key={opt.nextId + opt.label}
          onClick={() => onSelect(opt)}
          className={`border-2 border-black px-4 py-2.5 text-left text-xs font-black uppercase tracking-[0.1rem] shadow-[3px_3px_0_#111111] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111111] ${optionColors[i % optionColors.length]}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ChatbotOptions;
