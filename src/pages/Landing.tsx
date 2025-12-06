import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Sparkles, BarChart3, ArrowRight, Target, LineChart, Link2, Eye, CheckCircle2, Menu, X, Check, Crown, Zap, Play, PiggyBank, Wallet, Users, Award } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { PremiumTestimonials } from "@/components/ui/premium-testimonials";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useState as useReactState } from "react";
import { toast } from "sonner";
import { useState } from "react";
import dashboardPreview from "@/assets/dashboard-screenshot.png";
import heroBgCurves from "@/assets/landing-bg-curves.jpg";
import { TrustedBySection } from "@/components/TrustedBySection";
const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = [{
    label: "Features",
    href: "#features"
  }, {
    label: "Why Savio",
    href: "#why-savio"
  }, {
    label: "How It Works",
    href: "#how-it-works"
  }, {
    label: "Testimonials",
    href: "#testimonials"
  }, {
    label: "Pricing",
    href: "#pricing"
  }, {
    label: "FAQ",
    href: "#faq"
  }];
  const [isCheckoutLoading, setIsCheckoutLoading] = useReactState(false);
  const handleUpgradeClick = async () => {
    setIsCheckoutLoading(true);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        // Redirect to auth signup if not logged in
        navigate("/auth", {
          state: {
            mode: "signup"
          }
        });
        return;
      }
      const {
        data,
        error
      } = await supabase.functions.invoke("create-checkout", {
        body: {
          origin: window.location.origin
        }
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  return <div className="min-h-screen bg-background relative" style={{
    backgroundImage: `url(${heroBgCurves})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }}>
      {/* Global overlay for readability */}
      <div className="fixed inset-0 bg-background/80 dark:bg-background/70 pointer-events-none z-[1]" />
      {/* Header Navigation */}
      <motion.header initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Savio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => <a key={link.label} href={link.href} onClick={e => scrollToSection(e, link.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/auth" state={{
            mode: "signin"
          }}>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Login
              </Button>
            </Link>
            <Link to="/auth" state={{
            mode: "signup"
          }}>
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => <a key={link.label} href={link.href} onClick={e => scrollToSection(e, link.href)} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                  {link.label}
                </a>)}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link to="/auth" state={{
              mode: "signin"
            }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center">Login</Button>
                </Link>
                <Link to="/auth" state={{
              mode: "signup"
            }} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>}
      </motion.header>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden z-10">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }} className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                Take Control of Your Money –{" "}
                <span className="text-primary">Effortlessly.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Build savings, reduce stress, and finally gain a clear path to financial freedom – all in one simple dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/auth" state={{
                mode: "signup"
              }}>
                  <Button size="lg" className="text-base px-8 py-4 h-auto group w-full sm:w-auto">
                    Get Started – It's Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="text-base px-8 py-4 h-auto group w-full sm:w-auto border-primary/30 hover:bg-primary/10 hover:text-foreground">
                    Learn More
                  </Button>
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  
                  
                </div>
                <div className="flex items-center gap-2">
                  
                  <span>Bank-level security</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Outcome Visual */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="relative">
              <div className="relative">
                {/* Main visual container */}
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/10">
                  {/* Progress ring */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/30" />
                        <motion.circle cx="80" cy="80" r="70" stroke="url(#progressGradient)" strokeWidth="8" fill="none" strokeLinecap="round" initial={{
                        strokeDasharray: "0 440"
                      }} animate={{
                        strokeDasharray: "330 440"
                      }} transition={{
                        duration: 1.5,
                        delay: 0.5,
                        ease: "easeOut"
                      }} />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--secondary))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span initial={{
                        opacity: 0
                      }} animate={{
                        opacity: 1
                      }} transition={{
                        delay: 1
                      }} className="text-3xl font-bold text-foreground">
                          75%
                        </motion.span>
                        <span className="text-sm text-muted-foreground">Savings Goal</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.8
                  }} className="text-center p-3 bg-muted/50 rounded-xl">
                      <div className="text-lg font-bold text-primary">$2,450</div>
                      <div className="text-xs text-muted-foreground">Saved</div>
                    </motion.div>
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.9
                  }} className="text-center p-3 bg-muted/50 rounded-xl">
                      <div className="text-lg font-bold text-secondary">+18%</div>
                      <div className="text-xs text-muted-foreground">This Month</div>
                    </motion.div>
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 1
                  }} className="text-center p-3 bg-muted/50 rounded-xl">
                      <div className="text-lg font-bold text-accent">12</div>
                      <div className="text-xs text-muted-foreground">Days Ahead</div>
                    </motion.div>
                  </div>

                  {/* Mini chart */}
                  <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  delay: 1.2
                }} className="h-16 flex items-end justify-between gap-1 px-2">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map((height, i) => <motion.div key={i} initial={{
                    height: 0
                  }} animate={{
                    height: `${height}%`
                  }} transition={{
                    delay: 1.3 + i * 0.05,
                    duration: 0.3
                  }} className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t" />)}
                  </motion.div>
                </div>

                {/* Floating elements */}
                <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.5
              }} className="absolute -left-4 top-1/4 bg-card border border-border rounded-xl p-3 shadow-lg hidden lg:block">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Monthly</div>
                      <div className="text-sm font-semibold text-foreground">+$340</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.7
              }} className="absolute -right-4 bottom-1/4 bg-card border border-border rounded-xl p-3 shadow-lg hidden lg:block">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Goal</div>
                      <div className="text-sm font-semibold text-foreground">On Track</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 2
      }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{
          y: [0, 8, 0]
        }} transition={{
          repeat: Infinity,
          duration: 1.5
        }} className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Experience the Power Behind Smart Finance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to take control of your financial journey in one elegant platform.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <FeaturesSectionWithHoverEffects features={[{
            title: "Smart Tracking",
            description: "Automatically categorize and analyze your spending patterns with AI-powered insights.",
            icon: <TrendingUp className="h-6 w-6" />
          }, {
            title: "Secure & Private",
            description: "Bank-level encryption ensures your financial data remains protected and confidential.",
            icon: <Shield className="h-6 w-6" />
          }, {
            title: "AI-Powered Insights",
            description: "Get personalized recommendations to optimize your finances and reach your goals faster.",
            icon: <Sparkles className="h-6 w-6" />
          }, {
            title: "Visual Analytics",
            description: "Beautiful charts and graphs make understanding your finances simple and intuitive.",
            icon: <BarChart3 className="h-6 w-6" />
          }]} />
          </motion.div>
        </div>
      </section>

      {/* Value Section */}
      <section id="why-savio" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Savio?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We believe managing your finances should be simple, secure, and empowering. Our platform combines cutting-edge technology with intuitive design to give you complete clarity and control over your financial life.
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3,200+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="hidden sm:block h-16 w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">$4.3M+</div>
                <div className="text-muted-foreground">Tracked</div>
              </div>
              <div className="hidden sm:block h-16 w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.7/5</div>
                <div className="text-muted-foreground">User Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Savio Works Section */}
      <section id="how-it-works" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How Savio Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Savio guides you step-by-step through understanding, organizing, and improving your financial life.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <FeaturesSectionWithHoverEffects features={[{
            title: "Connect Your Accounts",
            description: "Savio organizes your income, expenses, goals, and debts in one place.",
            icon: <Link2 className="h-6 w-6" />
          }, {
            title: "Visualize Your Finances",
            description: "Clean charts and dashboards help you understand where your money goes.",
            icon: <Eye className="h-6 w-6" />
          }, {
            title: "Get AI-Powered Insights",
            description: "Savio identifies patterns and suggests improvements tailored to you.",
            icon: <Sparkles className="h-6 w-6" />
          }, {
            title: "Track Your Progress",
            description: "See your financial health improve week after week with real-time updates.",
            icon: <CheckCircle2 className="h-6 w-6" />
          }]} />
          </motion.div>
        </div>
      </section>

      {/* Track Your Finances Easily Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Track Your Finances Easily
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Savio's beautiful dashboard gives you all the essential information for understanding and tracking your finances - all in one place.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="relative group">
            <div className="relative rounded-xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-500 group-hover:scale-[1.02]">
              <img src={dashboardPreview} alt="Savio Dashboard Preview showing income vs expenses chart, expense breakdown, savings goals, and debt overview" className="w-full h-auto" />
            </div>
            <p className="text-center text-muted-foreground text-sm mt-6">
              A preview of your personalized Savio Dashboard
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <PremiumTestimonials />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Choose the Plan That Fits Your Financial Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A clear comparison of what's included in Savio's Free and Pro plans.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Plan */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <div className="group bg-card border border-border rounded-2xl p-8 h-full card-shadow hover:card-shadow-hover transition-all duration-500 hover:scale-[1.02] flex flex-col">
                <div className="mb-6">
                  <Badge variant="secondary" className="mb-4">Free Forever</Badge>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">$0</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <p className="text-muted-foreground">Perfect for getting started</p>
                </div>
                
                <div className="border-t border-border pt-6 mb-8 flex-grow">
                  <ul className="space-y-4">
                    {["Track income", "Track expenses", "Set savings goals", "Basic dashboard overview", "Light mode + dark mode", "Manual data entry", "Expense categories", "Financial summaries", "Monthly charts for income & spending"].map((feature, index) => <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>)}
                  </ul>
                </div>

                <Link to="/auth" state={{
                mode: "signup"
              }} className="mt-auto">
                  <Button variant="outline" size="lg" className="w-full group">
                    Start for Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              <div className="group relative bg-card border-2 border-gold rounded-2xl p-8 h-full card-shadow hover:card-shadow-hover transition-all duration-500 hover:scale-[1.02] flex flex-col overflow-hidden">
                {/* Gold gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-accent to-gold" />
                
                <div className="mb-6">
                  <Badge className="mb-4 bg-gold text-gold-foreground hover:bg-gold/90">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">$10</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <p className="text-muted-foreground">For serious financial growth</p>
                </div>
                
                <div className="border-t border-border pt-6 mb-8 flex-grow">
                  <ul className="space-y-4">
                    {[{
                    text: "Everything in Free",
                    highlight: true
                  }, {
                    text: "AI Insights (personalized financial analysis)",
                    highlight: false
                  }, {
                    text: "AI spending recommendations",
                    highlight: false
                  }, {
                    text: "Automatic income/expense detection",
                    highlight: false
                  }, {
                    text: "Debt payoff forecasting",
                    highlight: false
                  }, {
                    text: "Pro-level graphs & analytics",
                    highlight: false
                  }, {
                    text: "Priority support",
                    highlight: false
                  }, {
                    text: "Access to upcoming premium automations",
                    highlight: false
                  }].map((feature, index) => <li key={index} className="flex items-start gap-3">
                        {feature.highlight ? <Zap className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" /> : <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />}
                        <span className={feature.highlight ? "text-foreground font-medium" : "text-foreground"}>
                          {feature.text}
                        </span>
                      </li>)}
                  </ul>
                </div>

                <Button size="lg" className="w-full mt-auto bg-gold hover:bg-gold/90 text-gold-foreground group" onClick={handleUpgradeClick} disabled={isCheckoutLoading}>
                  {isCheckoutLoading ? "Loading..." : "Upgrade to Pro"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-foreground">Free</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-gold">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {[{
                  feature: "Income & Expense Tracking",
                  free: true,
                  pro: true
                }, {
                  feature: "Savings Goals",
                  free: true,
                  pro: true
                }, {
                  feature: "AI Insights",
                  free: false,
                  pro: true
                }, {
                  feature: "Debt Forecast",
                  free: false,
                  pro: true
                }, {
                  feature: "Priority Support",
                  free: false,
                  pro: true
                }].map((row, index) => <tr key={index} className={index !== 4 ? "border-b border-border" : ""}>
                      <td className="py-4 px-6 text-sm text-foreground">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {row.free ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.pro ? <Check className="h-5 w-5 text-gold mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Savio
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">What is Savio?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Savio is a comprehensive financial management platform that helps you track expenses, manage income, set savings goals, and get AI-powered insights to improve your financial health. It's designed to give you complete clarity and control over your money.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">How does Savio analyze my finances?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Savio uses advanced AI algorithms to analyze your spending patterns, income streams, and financial habits. It identifies trends, detects anomalies, and provides personalized recommendations based on your unique financial situation and goals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">Is my financial data secure?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. We use bank-level encryption to protect your data, and all information is stored securely in compliance with industry standards. Your privacy and security are our top priorities, and we never share your personal financial information with third parties.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">Does Savio connect to my bank?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, Savio allows you to manually input your financial data. We're working on secure bank integrations for future releases, which will enable automatic transaction imports while maintaining the highest security standards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">Can I use Savio for budgeting and saving goals?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Savio includes powerful budgeting tools and savings goal tracking. You can set multiple financial goals, track your progress in real-time, and receive personalized tips to help you reach your targets faster.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">Is there a free version?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, Savio offers a free tier with core features including expense tracking, basic analytics, and savings goals. Premium features like advanced AI insights, unlimited categories, and priority support are available with our paid plans.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">Can I access Savio on mobile devices?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Savio is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktops. Access your financial dashboard anywhere, anytime, with a consistent experience across all platforms.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-card border border-border rounded-xl px-6 card-shadow">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">How do I get started?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Getting started is easy! Simply create an account, add your income and expenses, set your financial goals, and let Savio's AI analyze your finances. You'll start receiving personalized insights within minutes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of users who have taken control of their financial future. Start your journey today with clarity, control, and confidence.
            </p>
            <Link to="/auth">
              <Button size="lg" className="text-lg px-12 py-6 h-auto group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-semibold text-foreground">Savio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering financial clarity for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" onClick={e => scrollToSection(e, "#features")} className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" onClick={e => scrollToSection(e, "#pricing")} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Savio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;