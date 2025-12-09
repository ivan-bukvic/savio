import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import testimonial images
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialJames from '@/assets/testimonial-james.jpg';
import testimonialMaria from '@/assets/testimonial-maria.jpg';
import testimonialDaniel from '@/assets/testimonial-daniel.jpg';
import testimonialJessica from '@/assets/testimonial-jessica.jpg';

interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    image: testimonialSarah,
    quote: "Savio helped me finally understand my expenses and start saving for the first time. I can't imagine managing my finances without it.",
    name: 'Sarah Mitchell',
    role: 'Marketing Manager',
    rating: 5,
  },
  {
    image: testimonialJames,
    quote: "The AI insights are spot on — it feels like having a personal financial coach. My savings have doubled in just six months.",
    name: 'James Chen',
    role: 'Software Developer',
    rating: 5,
  },
  {
    image: testimonialMaria,
    quote: "My debt payoff plan has never been clearer. This app is a game changer. I finally feel in control of my financial future.",
    name: 'Maria Rodriguez',
    role: 'Small Business Owner',
    rating: 5,
  },
  {
    image: testimonialDaniel,
    quote: "The savings goals and AI insights completely changed how I plan my cash flow. It feels like having a personal financial advisor.",
    name: 'Daniel R.',
    role: 'Freelance Designer',
    rating: 5,
  },
  {
    image: testimonialJessica,
    quote: "Savio helps me stay on top of my income from multiple clients without the stress. The dashboard feels clean and empowering.",
    name: 'Jessica M.',
    role: 'Project Manager',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-primary fill-primary" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

interface TestimonialCardProps {
  testimonial: Testimonial;
  position: 'left' | 'center' | 'right';
}

const TestimonialCard = ({ testimonial, position }: TestimonialCardProps) => {
  const isCenter = position === 'center';
  
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-500",
        "bg-[rgba(15,25,35,0.7)] backdrop-blur-xl border border-white/[0.08]",
        isCenter 
          ? "opacity-100 scale-100 shadow-[0_0_60px_rgba(0,200,180,0.15)]" 
          : "opacity-40 scale-95 blur-[1px]"
      )}
      style={{
        minHeight: '220px',
      }}
    >
      {/* Glow effect for center card */}
      {isCenter && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      )}
      
      {/* Quote */}
      <p className={cn(
        "text-sm md:text-base leading-relaxed mb-6",
        isCenter ? "text-foreground/90" : "text-foreground/60"
      )}>
        "{testimonial.quote}"
      </p>
      
      {/* Author info */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
        />
        <div className="flex-1">
          <p className={cn(
            "font-semibold text-sm",
            isCenter ? "text-foreground" : "text-foreground/70"
          )}>
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
};

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const getIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-cycle every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        {/* Subtitle tag */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
          Testimonials
        </span>
        
        {/* Two-line title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
          Don't take our word for it.
        </h2>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground/80">
          Over 100+ people trust us.
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-6xl mx-auto overflow-hidden px-4">
        {/* Cards Container */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6">
          {/* Left Card - Faded */}
          <div className="hidden md:block w-[320px] flex-shrink-0 transform -translate-x-8 opacity-50">
            <motion.div
              key={`left-${getIndex(-1)}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard
                testimonial={testimonials[getIndex(-1)]}
                position="left"
              />
            </motion.div>
            {/* Left fade gradient */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          </div>

          {/* Center Card - Main Focus */}
          <div className="w-full md:w-[400px] flex-shrink-0 z-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
              >
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  position="center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Card - Faded */}
          <div className="hidden md:block w-[320px] flex-shrink-0 transform translate-x-8 opacity-50">
            <motion.div
              key={`right-${getIndex(1)}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard
                testimonial={testimonials[getIndex(1)]}
                position="right"
              />
            </motion.div>
            {/* Right fade gradient */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Edge fade overlays */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-20" />
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(15,25,35,0.6)] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,200,180,0.2)]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        <button
          onClick={handleNext}
          className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(15,25,35,0.6)] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,200,180,0.2)]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentIndex === index 
                ? "w-6 bg-primary" 
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
