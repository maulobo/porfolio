import { useState } from "react";
import { clients } from "../homeContent";

type Client = { name: string; logo: string };

const TrustItem = ({ name, logo }: Client) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group flex shrink-0 items-center px-6">
      {!imgFailed ? (
        <img
          src={logo}
          alt={name}
          onError={() => setImgFailed(true)}
          className="h-5 max-w-[80px] object-contain opacity-40 transition-opacity duration-300 group-hover:opacity-90"
          style={{ filter: "grayscale(1) brightness(10)" }}
        />
      ) : (
        <span className="font-mono text-[11px] uppercase tracking-[0.18rem] text-white/40 transition-colors duration-300 group-hover:text-white/80">
          {name}
        </span>
      )}
    </div>
  );
};

const TrustBar = () => {
  const items = [...clients, ...clients] as Client[];

  return (
    <section className="overflow-hidden border-b border-white/10 bg-[#111111] py-4">
      <div className="flex items-center">
        <div className="shrink-0 border-r border-white/10 px-5 md:px-12">
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22rem] text-white/35 pr-6">
            Confían en nosotros
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: "marquee 40s linear infinite" }}
          >
            {items.map((client, i) => (
              <TrustItem key={i} name={client.name} logo={client.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
