import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import testimonial images
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialJames from '@/assets/testimonial-james.jpg';
import testimonialMaria from '@/assets/testimonial-maria.jpg';
import testimonialDaniel from '@/assets/testimonial-daniel.jpg';
import testimonialJessica from '@/assets/testimonial-jessica.jpg';

export interface Testimonial {
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

interface TestimonialSliderProps {
  className?: string;
}

const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          )}
        />
      ))}
    </div>
  );
};

export const TestimonialSlider = ({ className }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 30 },
    }),
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto overflow-hidden", className)}>
      <div className="relative min-h-[380px] md:min-h-[300px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute w-full h-full"
          >
            <div className="flex flex-col md:flex-row items-center justify-center w-full h-full p-4">
              {/* Image Section */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0 mb-4 md:mb-0 md:mr-[-3rem] z-10">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-primary/20"
                />
              </div>

              {/* Text & Controls Section */}
              <div className="relative w-full bg-card text-card-foreground rounded-2xl shadow-xl pt-8 md:pt-6 pl-4 md:pl-20 pr-4 pb-4 border border-border">
                <Quote className="absolute top-4 left-4 md:left-20 h-8 w-8 text-primary/20" aria-hidden="true" />
                <blockquote className="text-sm md:text-base mb-4 leading-relaxed text-foreground/90 italic">
                  "{currentTestimonial.quote}"
                </blockquote>
                <StarRating rating={currentTestimonial.rating} className="mb-4" />
                <div className="flex items-center justify-between">
                  <div className="pr-12">
                    <p className="font-bold text-lg text-foreground">{currentTestimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                  </div>
                  {/* Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-muted hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-muted hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              currentIndex === index ? 'w-4 bg-primary' : 'bg-muted-foreground/50'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
