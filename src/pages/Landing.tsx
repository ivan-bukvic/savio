import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Sparkles, BarChart3, ArrowRight, Target, LineChart, Link2, Eye, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/hero-3d-fluid.jpg";
import landingBg from "@/assets/landing-bg-curves.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import testimonialSarah from "@/assets/testimonial-sarah.jpg";
import testimonialJames from "@/assets/testimonial-james.jpg";
import testimonialMaria from "@/assets/testimonial-maria.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const Landing = () => {
  const features = [{
    icon: TrendingUp,
    title: "Smart Tracking",
    description: "Automatically categorize and analyze your spending patterns with AI-powered insights.",
    link: "#"
  }, {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level encryption ensures your financial data remains protected and confidential.",
    link: "#"
  }, {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations to optimize your finances and reach your goals faster.",
    link: "#"
  }, {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful charts and graphs make understanding your finances simple and intuitive.",
    link: "#"
  }];
  return <div className="min-h-screen bg-background relative">
      {/* Subtle 3D curved background */}
      <div className="fixed inset-0 z-0 opacity-30" style={{
      backgroundImage: `url(${landingBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} />
      
      {/* Content wrapper */}
      <div className="relative z-10">{/* ... keep existing code */}
      {/* Header */}
      <motion.header initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            <span className="text-xl font-semibold text-foreground">Savio</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6
            }}>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Master Your
                <span className="block text-primary">Financial Future</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Take control of your finances with intelligent tracking, AI-powered insights, and beautiful visualization tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="text-base px-8 group">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base px-8">
                  Explore More
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="relative">
              <div className="relative rounded-3xl overflow-hidden card-shadow-hover">
                <img src={heroImage} alt="Financial Dashboard" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
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
          }} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Experience the Power Behind Smart Finance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to take control of your financial journey in one elegant platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => <motion.div key={feature.title} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }}>
                <div className="group bg-card border border-border rounded-2xl p-8 h-full card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <a href={feature.link} className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-20 px-6">
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
            <div className="flex justify-center gap-12 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
                <div className="text-muted-foreground">Tracked</div>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
                <div className="text-muted-foreground">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Savio Works Section */}
      <section className="py-20 px-6 bg-muted/30">
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
              How Savio Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Savio guides you step-by-step through understanding, organizing, and improving your financial life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
              icon: Link2,
              step: "Step 1",
              title: "Connect Your Accounts",
              description: "Savio organizes your income, expenses, goals, and debts in one place.",
              bgColor: "bg-primary/10",
              iconColor: "text-primary",
              textColor: "text-primary"
            }, {
              icon: Eye,
              step: "Step 2",
              title: "Visualize Your Finances",
              description: "Clean charts and dashboards help you understand where your money goes.",
              bgColor: "bg-secondary/10",
              iconColor: "text-secondary",
              textColor: "text-secondary"
            }, {
              icon: Sparkles,
              step: "Step 3",
              title: "Get AI-Powered Insights",
              description: "Savio identifies patterns and suggests improvements tailored to you.",
              bgColor: "bg-accent/10",
              iconColor: "text-accent",
              textColor: "text-accent"
            }, {
              icon: CheckCircle2,
              step: "Step 4",
              title: "Track Your Progress",
              description: "See your financial health improve week after week with real-time updates.",
              bgColor: "bg-success/10",
              iconColor: "text-success",
              textColor: "text-success"
            }].map((item, index) => <motion.div key={item.step} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 h-full card-shadow hover:card-shadow-hover transition-all duration-300">
                  <div className={`${item.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>
                  <div className={`text-xs font-semibold ${item.textColor} mb-2 uppercase tracking-wider`}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Track Your Finances Easily Section */}
      <section className="py-20 px-6">
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
          }} className="relative">
            <div className="relative rounded-3xl overflow-hidden card-shadow-hover border border-border/40">
              <img src={dashboardPreview} alt="Savio Dashboard Preview" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
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
              What Our Users Are Saying
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from people transforming their financial lives with Savio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              name: "Sarah Mitchell",
              role: "Small Business Owner",
              testimonial: "Savio helped me finally understand my expenses and start saving for the first time. I can't imagine managing my finances without it.",
              initial: "SM",
              image: testimonialSarah
            }, {
              name: "James Chen",
              role: "Software Engineer",
              testimonial: "The AI insights are spot on — it feels like having a personal financial coach. My savings have doubled in just six months.",
              initial: "JC",
              image: testimonialJames
            }, {
              name: "Maria Rodriguez",
              role: "Teacher",
              testimonial: "My debt payoff plan has never been clearer. This app is a game changer. I finally feel in control of my financial future.",
              initial: "MR",
              image: testimonialMaria
            }].map((testimonial, index) => <motion.div key={testimonial.name} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }}>
                <div className="bg-card border border-border rounded-2xl p-8 h-full card-shadow hover:card-shadow-hover transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-muted/30">
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
      <section className="py-32 px-6">
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
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">Savio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering financial clarity for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
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
      </div>
    </div>;
};
export default Landing;