import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, X, Zap, Brain, Code, TrendingUp, Shield, Users, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMutation = trpc.contact.submit.useMutation();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "AI eCommerce", href: "#ecommerce" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Business Automation",
      description: "Streamline workflows and reduce manual processes with intelligent automation solutions.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Custom AI Agents",
      description: "Deploy specialized AI agents for sales, marketing, support, and operations.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Data Decision Systems",
      description: "Build intelligent systems that transform data into actionable business insights.",
    },
  ];

  const metrics = [
    { value: "85%", label: "Increase in Leads" },
    { value: "40%", label: "Cost Reduction" },
    { value: "3.2x", label: "ROI" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactMutation.mutateAsync(formData);
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({ name: "", email: "", company: "", message: "" });
      setContactFormOpen(false);
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663448255941/dyuCDzJWHvpEjuAWu49ffm/unnamed_fe5de81c.png" 
              alt="TechnoAI Logo" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline text-foreground">TechnoAI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection("#contact")}
            >
              Contact
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setContactFormOpen(true)}
            >
              Request Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-sm hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white w-full"
                onClick={() => setContactFormOpen(true)}
              >
                Request Consultation
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Transforming Businesses with AI-Driven Marketing and Strategic Consulting
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Scale your operations to einnominate operations and market domination
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => setContactFormOpen(true)}
                >
                  Enter Book Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("#services")}
                >
                  Enter Start AI Experience
                </Button>
              </div>
            </div>
            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
              <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI solutions designed to drive growth and efficiency across your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="bg-background border-border p-8 hover:border-primary transition-all duration-300"
              >
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setContactFormOpen(true)}
                  className="hover:bg-primary hover:text-white"
                >
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">Digital Marketing: Optimized Campaigns & ROI</h2>
            <p className="text-lg text-blue-100 mb-8">
              Outcome-focused with custom-built agents and optimization marketing settings.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <p className="text-sm text-blue-100">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="portfolio" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how we've helped businesses transform with AI solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background border-border p-8">
              <h3 className="text-2xl font-bold mb-4">Reducing Manual Support Tickets by 80%</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-primary font-semibold mb-2">Challenge</h4>
                  <p className="text-muted-foreground">
                    A growing SaaS company was overwhelmed with customer support tickets, causing response delays and customer dissatisfaction.
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-semibold mb-2">Solution</h4>
                  <p className="text-muted-foreground">
                    We deployed a custom AI support agent that automatically handles common inquiries, routes complex issues, and learns from interactions.
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-semibold mb-2">Outcome</h4>
                  <p className="text-muted-foreground">
                    80% reduction in manual tickets, 60% faster response times, and 95% customer satisfaction improvement.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-background border-border p-8">
              <h3 className="text-2xl font-bold mb-8">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Leads Generated</span>
                  <span className="text-2xl font-bold text-primary">+85%</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cost Reduction</span>
                  <span className="text-2xl font-bold text-primary">-40%</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ROI Improvement</span>
                  <span className="text-2xl font-bold text-primary">3.2x</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About TechnoAI</h2>
              <p className="text-muted-foreground mb-4">
                We are a team of AI specialists, engineers, and business strategists dedicated to transforming enterprises through intelligent automation and data-driven solutions.
              </p>
              <p className="text-muted-foreground mb-6">
                With years of experience in machine learning, natural language processing, and enterprise software, we deliver solutions that create measurable impact on your bottom line.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Enterprise-Grade Security</h4>
                    <p className="text-sm text-muted-foreground">
                      All solutions comply with industry standards and best practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Expert Team</h4>
                    <p className="text-sm text-muted-foreground">
                      Dedicated professionals with proven track records in AI implementation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Proven Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Measurable improvements in efficiency, revenue, and customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <Brain className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">AI-Powered Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI eCommerce Section */}
      <section id="ecommerce" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI eCommerce Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlight omnichannel-solutions platform capabilities custom growth, ROI, and business impossibilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background border-border p-8">
              <h3 className="text-2xl font-bold mb-6">Growth & Automation Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Intelligent product recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Automated customer segmentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Dynamic pricing optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Predictive inventory management</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-background border-border p-8">
              <h3 className="text-2xl font-bold mb-6">Success Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">85%</div>
                  <p className="text-sm text-muted-foreground">Increase in Leads</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <p className="text-sm text-muted-foreground">Reduction in Op-Ex</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">+3.2x</div>
                  <p className="text-sm text-muted-foreground">ROI on ad spend</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with AI? Contact us today for a free consultation.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-background border-border p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663448255941/dyuCDzJWHvpEjuAWu49ffm/unnamed_fe5de81c.png" 
                alt="TechnoAI Logo" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Business Automation & AI Solutions
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection("#services")} className="hover:text-primary">Business Automation</button></li>
                <li><button onClick={() => scrollToSection("#services")} className="hover:text-primary">AI Agents</button></li>
                <li><button onClick={() => scrollToSection("#services")} className="hover:text-primary">Data Systems</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection("#about")} className="hover:text-primary">About</button></li>
                <li><button onClick={() => scrollToSection("#portfolio")} className="hover:text-primary">Portfolio</button></li>
                <li><button onClick={() => scrollToSection("#contact")} className="hover:text-primary">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 KVS TechnoAI LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {contactFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-background border-border max-w-md w-full p-6 relative">
            <button
              onClick={() => setContactFormOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-6">Book a Consultation</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* Chat Bot Widget */}
      <ChatBot />
    </div>
  );
}
