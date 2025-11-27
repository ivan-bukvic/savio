import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  Sparkles, 
  BarChart3,
  ArrowRight,
  PiggyBank,
  Target,
  LineChart
} from "lucide-react";
import heroImage from "@/assets/hero-variation-1.jpg";

const Landing = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Tracking",
      description: "Automatically categorize and analyze your spending patterns with AI-powered insights.",
      link: "#"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level encryption ensures your financial data remains protected and confidential.",
      link: "#"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations to optimize your finances and reach your goals faster.",
      link: "#"
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Beautiful charts and graphs make understanding your finances simple and intuitive.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">FinanceFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/app">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Master Your
                <span className="block text-primary">Financial Future</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Take control of your finances with intelligent tracking, AI-powered insights, and beautiful visualization tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/app">
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden card-shadow-hover">
                <img 
                  src={heroImage} 
                  alt="Financial Dashboard" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Experience the Power Behind Smart Finance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to take control of your financial journey in one elegant platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
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
                  <a 
                    href={feature.link}
                    className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose FinanceFlow?
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

      {/* Preview Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your Financial Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive view of your finances, designed to keep you informed and in control.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-8 card-shadow-hover border border-border"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Goals Tracking</h3>
                <p className="text-muted-foreground">Set and achieve your financial goals with visual progress tracking.</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LineChart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Analytics</h3>
                <p className="text-muted-foreground">Monitor your spending patterns and income streams in real-time.</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Smart Insights</h3>
                <p className="text-muted-foreground">AI-powered recommendations tailored to your financial situation.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of users who have taken control of their financial future. Start your journey today with clarity, control, and confidence.
            </p>
            <Link to="/app">
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
                <PiggyBank className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">FinanceFlow</span>
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
              © 2024 FinanceFlow. All rights reserved.
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
  );
};

export default Landing;