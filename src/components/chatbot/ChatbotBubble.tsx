type BubbleProps = {
  text: string;
  type: "bot" | "user";
};

const ChatbotBubble = ({ text, type }: BubbleProps) => {
  if (type === "bot") {
    return (
      <div className="mb-3 flex items-start">
        <div className="relative max-w-[88%] border-2 border-black bg-white p-3 shadow-[3px_3px_0_#111111]">
          {/* Cola triangular izquierda — borde negro */}
          <span
            style={{
              position: "absolute",
              left: "-9px",
              top: "10px",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "9px solid #111111",
            }}
          />
          {/* Cola triangular izquierda — relleno blanco */}
          <span
            style={{
              position: "absolute",
              left: "-6px",
              top: "10px",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "9px solid white",
            }}
          />
          <p className="font-black text-sm leading-snug text-black">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-3 flex justify-end">
      <div className="max-w-[88%] border-2 border-black bg-[#111111] p-3 shadow-[3px_3px_0_#d7ff4f]">
        <p className="font-semibold text-sm leading-snug text-white">{text}</p>
      </div>
    </div>
  );
};

export default ChatbotBubble;
