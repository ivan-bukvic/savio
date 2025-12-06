import { motion } from "framer-motion";

// Import all logos
import veroLogo from "@/assets/logos/vero.png";
import arrowFinanceLogo from "@/assets/logos/arrow-finance.png";
import wavesLogo from "@/assets/logos/waves.png";
import independerLogo from "@/assets/logos/independer.png";
import shapeLogo from "@/assets/logos/shape.png";
import cubeLogo from "@/assets/logos/cube.png";
import abstractLogo from "@/assets/logos/abstract.png";

const logos = [
  { src: veroLogo, alt: "Vero" },
  { src: arrowFinanceLogo, alt: "Arrow Finance" },
  { src: wavesLogo, alt: "Waves" },
  { src: independerLogo, alt: "Independer" },
  { src: shapeLogo, alt: "Shape" },
  { src: cubeLogo, alt: "Cube" },
  { src: abstractLogo, alt: "Abstract" },
];

export const TrustedBySection = () => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 md:py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Trusted by Leading Innovators
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Creators, founders, and digital professionals who rely on clear financial insights.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex overflow-hidden group">
          <div
            className="flex items-center gap-12 md:gap-16 lg:gap-20 shrink-0 animate-marquee group-hover:[animation-play-state:paused]"
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 lg:h-14 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity duration-300 dark:brightness-110 dark:contrast-110"
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div
            className="flex items-center gap-12 md:gap-16 lg:gap-20 shrink-0 animate-marquee group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-dup-${index}`}
                className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 lg:h-14 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity duration-300 dark:brightness-110 dark:contrast-110"
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
