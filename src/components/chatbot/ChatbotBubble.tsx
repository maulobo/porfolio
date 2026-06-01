type BubbleProps = {
  text: string;
  type: "bot" | "user";
  index: number;
};

const ChatbotBubble = ({ text, type, index: _index }: BubbleProps) => {
  if (type === "bot") {
    return (
      <div className="mb-4 flex items-start gap-2">
        {/* Tiny bot avatar */}
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-white shadow-[2px_2px_0_#111111]">
          <span className="font-mono text-[10px] font-black uppercase text-black">B</span>
        </div>
        <div className="relative max-w-[85%] border-2 border-black bg-white p-3 shadow-[3px_3px_0_#111111]">
          {/* Tail */}
          <span
            style={{
              position: "absolute",
              left: "-10px",
              top: "10px",
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderRight: "10px solid #111111",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "-6px",
              top: "10px",
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderRight: "10px solid white",
            }}
          />
          <p className="text-sm font-semibold leading-snug text-black">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex justify-end">
      <div className="relative max-w-[85%] border-2 border-black bg-[#d7ff4f] p-3 shadow-[3px_3px_0_#111111]">
        {/* Right tail */}
        <span
          style={{
            position: "absolute",
            right: "-10px",
            top: "10px",
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "10px solid #111111",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: "-6px",
            top: "10px",
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "10px solid #d7ff4f",
          }}
        />
        <p className="text-sm font-black leading-snug text-black">{text}</p>
      </div>
    </div>
  );
};

export default ChatbotBubble;
