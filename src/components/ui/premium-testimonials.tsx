import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

// Import testimonial images
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialJames from '@/assets/testimonial-james.jpg';
import testimonialMaria from '@/assets/testimonial-maria.jpg';
import testimonialDaniel from '@/assets/testimonial-daniel.jpg';
import testimonialJessica from '@/assets/testimonial-jessica.jpg';

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    company: "Self-employed",
    avatar: testimonialSarah,
    rating: 5,
    text: "Savio helped me finally understand my expenses and start saving for the first time. I can't imagine managing my finances without it.",
    results: ["50% less overspending", "Built emergency fund", "Clear budget view"]
  },
  {
    name: "James Chen",
    role: "Software Developer",
    company: "Tech Startup",
    avatar: testimonialJames,
    rating: 5,
    text: "The AI insights are spot on — it feels like having a personal financial coach. My savings have doubled in just six months.",
    results: ["2x savings growth", "Smart AI tips", "Automated tracking"]
  },
  {
    name: "Maria Rodriguez",
    role: "Small Business Owner",
    company: "Rodriguez Consulting",
    avatar: testimonialMaria,
    rating: 5,
    text: "My debt payoff plan has never been clearer. This app is a game changer. I finally feel in control of my financial future.",
    results: ["Debt-free roadmap", "Priority payments", "Financial clarity"]
  },
  {
    name: "Daniel R.",
    role: "Freelance Designer",
    company: "Independent",
    avatar: testimonialDaniel,
    rating: 5,
    text: "The savings goals and AI insights completely changed how I plan my cash flow. It feels like having a personal financial advisor.",
    results: ["Goal tracking", "Cash flow planning", "Monthly insights"]
  },
  {
    name: "Jessica M.",
    role: "Project Manager",
    company: "Multiple Clients",
    avatar: testimonialJessica,
    rating: 5,
    text: "Savio helps me stay on top of my income from multiple clients without the stress. The dashboard feels clean and empowering.",
    results: ["Multi-source income", "Stress-free tracking", "Clean dashboard"]
  }
];

export function PremiumTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        {/* Moving light orbs */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${25 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-20"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.4)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/80">
              ✨ Real Success Stories
            </span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
            variants={fadeInUp}
          >
            <span className="text-foreground">
              What Our Users
            </span>
            <br />
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Are Saying
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Real stories from people transforming their financial lives with Savio.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-6xl mx-auto mb-12 lg:mb-16">
          <div className="relative h-[550px] sm:h-[500px] md:h-[400px]" style={{ perspective: '1000px' }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.6 }
                }}
                className="absolute inset-0"
              >
                <div className="relative h-full bg-card/80 backdrop-blur-xl rounded-3xl border border-border p-6 sm:p-8 md:p-12 overflow-hidden group shadow-xl">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-secondary/[0.03] to-accent/[0.05] rounded-3xl"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '300% 300%'
                    }}
                  />

                  {/* Quote icon */}
                  <motion.div
                    className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-10"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                  </motion.div>

                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    {/* User Info */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <motion.div
                        className="relative mb-4 md:mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-primary/20 relative">
                          <img 
                            src={testimonials[currentIndex].avatar} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>
                        
                        {/* Floating ring animation */}
                        <motion.div
                          className="absolute inset-0 border-2 border-primary/30 rounded-full mx-auto md:mx-0"
                          style={{ width: '80px', height: '80px', left: 'calc(50% - 40px)', top: '0' }}
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-primary mb-1 font-medium text-sm sm:text-base">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                        {testimonials[currentIndex].company}
                      </p>
                      
                      {/* Star Rating */}
                      <div className="flex justify-center md:justify-start gap-1 mb-4 sm:mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.blockquote 
                        className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6 sm:mb-8 font-light italic text-center md:text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        "{testimonials[currentIndex].text}"
                      </motion.blockquote>

                      {/* Results */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {testimonials[currentIndex].results.map((result, i) => (
                          <motion.div
                            key={i}
                            className="bg-muted/50 rounded-lg p-3 border border-border backdrop-blur-sm text-center md:text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                          >
                            <span className="text-sm text-foreground/70 font-medium">
                              {result}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-2.5 sm:p-3 rounded-full bg-card border border-border backdrop-blur-sm text-foreground hover:bg-muted transition-all"
              whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2 sm:gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-2.5 sm:p-3 rounded-full bg-card border border-border backdrop-blur-sm text-foreground hover:bg-muted transition-all"
              whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          {[
            { number: "10K+", label: "Happy Users" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "$2M+", label: "Saved by Users" },
            { number: "4.9★", label: "App Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground text-xs sm:text-sm font-medium group-hover:text-foreground/80 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
