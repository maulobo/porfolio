import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clients } from "../../homeContent";

type Client = { name: string; logo: string };

const TrustItem = ({ name, logo }: Client) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group flex shrink-0 items-center justify-center px-10 md:px-14">
      {!imgFailed ? (
        <img
          src={logo}
          alt={name}
          onError={() => setImgFailed(true)}
          className="h-9 w-auto max-w-[140px] object-contain opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 md:h-11 md:max-w-[170px]"
        />
      ) : (
        <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.2rem] text-white/30 transition-colors duration-300 group-hover:text-white">
          {name}
        </span>
      )}
    </div>
  );
};

const TrustBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const half = Math.ceil(clients.length / 2);
  const first = (clients as unknown as Client[]).slice(0, half);
  const second = (clients as unknown as Client[]).slice(half);
  const row1 = [...first, ...first];
  const row2 = [...second, ...second];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#111111] py-16 md:py-24">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#111111] to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#111111] to-transparent md:w-32" />

      <div className="mb-12 flex flex-col gap-6 px-5 md:mb-16 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-black leading-none text-white md:text-7xl"
          >
            Clientes
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28rem] text-white/40">
           Equipos que confían en nuestro trabajo
          </p>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-white/50">
           Trabajamos con startups, pymes y organizaciones que buscan una ejecución cuidada, una mirada
           propia y relaciones de trabajo responsables.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — forward */}
      <div className="group mb-8 overflow-hidden">
        <div
          className="flex w-max items-center hover:[animation-play-state:paused]"
          style={{ animation: "marquee 45s linear infinite" }}
        >
          {row1.map((client, i) => (
            <TrustItem key={`r1-${i}`} name={client.name} logo={client.logo} />
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="group overflow-hidden">
        <div
          className="flex w-max items-center hover:[animation-play-state:paused]"
          style={{ animation: "marquee-reverse 50s linear infinite" }}
        >
          {row2.map((client, i) => (
            <TrustItem key={`r2-${i}`} name={client.name} logo={client.logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
