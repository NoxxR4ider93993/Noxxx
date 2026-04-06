import { useEffect, useRef, useState } from 'react';
import { 
  Zap, 
  Shield, 
  Rocket, 
  Terminal, 
  Users, 
  Clock, 
  Command, 
  MessageSquare, 
  Flame,
  Globe,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Target,
  Layers,
  Webhook
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Particle background component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
        ctx.fill();
        
        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

// Navigation component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong py-3 shadow-lg' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="NoxxBots" className="w-10 h-10" />
          <span className="text-xl font-bold text-slate-900">
            Noxx<span className="text-blue-500">Bots</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Features</a>
          <a href="#bots" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Bots</a>
          <a href="#stats" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Stats</a>
          <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Contact</a>
        </div>
        
        <Button 
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 btn-shine"
          onClick={() => window.open('https://discord.gg/r4ider', '_blank')}
        >
          <Globe className="w-4 h-4 mr-2" />
          Join Discord
        </Button>
      </div>
    </nav>
  );
};

// Hero section
const HeroSection = () => {
  const [text, setText] = useState('');
  const fullText = 'THE NEW ERA OF DISCORD BOTS';
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '0.75s' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-slate-600">Number 1 Fastest Discord Bots</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight">
          <span className="block glow-text-blue">{text}</span>
          <span className="animate-pulse text-blue-500">|</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
          If you Cant Beat Them JOIN Them
        </p>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Experience lightning-fast performance with our cutting-edge Discord bots. 
          Built for speed, designed for dominance. The ultimate bot experience awaits.
        </p>
        
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">24/7 Uptime</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-5 h-5 text-cyan-500" />
            <span className="font-semibold">800+ Members</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Command className="w-5 h-5 text-purple-500" />
            <span className="font-semibold">50+ Commands</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 text-lg px-8 py-6 btn-shine glow-blue"
            onClick={() => window.open('https://discord.gg/r4ider', '_blank')}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Join Discord Server
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            onClick={() => document.getElementById('bots')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Terminal className="w-5 h-5 mr-2" />
            Explore Bots
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-blue-500/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-blue-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Features section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for maximum speed with sub-millisecond response times.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Rate Limit Protection',
      description: 'Smart rate limiting to keep your bots running smoothly without bans.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Precision Control',
      description: 'Fine-tuned controls for exact targeting and execution.',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Multi-Server Support',
      description: 'Manage multiple servers with ease from a single interface.',
      color: 'from-purple-400 to-violet-500'
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: 'Easy Commands',
      description: 'Simple, intuitive commands that anyone can use instantly.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: '24/7 Online',
      description: 'Always online, always ready. No downtime, ever.',
      color: 'from-indigo-400 to-blue-500'
    }
  ];
  
  return (
    <section id="features" className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-blue-600 text-sm font-medium mb-4 border border-blue-200">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">FEATURES</span>
          </h2>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 bot-card"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 feature-icon`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500">{feature.description}</p>
              
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 blur-xl`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Bots section
const BotsSection = () => {
  const bots = [
    {
      name: 'r4id Bot',
      tagline: 'RAID',
      description: 'The ultimate raid bot for Discord. Fast, reliable, and packed with features.',
      icon: <Flame className="w-10 h-10" />,
      color: 'from-red-500 to-orange-500',
      glowColor: 'shadow-red-500/50',
      features: [
        'Over 12 commands',
        'Fast & easy to use',
        'Rate limit protection',
        'Works in private channels'
      ],
      badge: 'POPULAR'
    },
    {
      name: 'N4ke Bot',
      tagline: 'NUKE',
      description: 'Mass destruction tool for complete server management and cleanup.',
      icon: <Rocket className="w-10 h-10" />,
      color: 'from-purple-500 to-pink-500',
      glowColor: 'shadow-purple-500/50',
      features: [
        'Over 50 created channels',
        '20 second nuke time',
        'Over 1k pings',
        'Mass destruction tool'
      ],
      badge: 'POWERFUL'
    },
    {
      name: 'Webhook Spammer',
      tagline: 'SPAM',
      description: 'The most advanced webhook spammer with incredible speed and control.',
      icon: <Webhook className="w-10 h-10" />,
      color: 'from-blue-500 to-cyan-400',
      glowColor: 'shadow-blue-500/50',
      features: [
        'Send more than 1000 messages',
        'Fast as hell',
        'Easy to use',
        'Webhook controls'
      ],
      badge: 'NEW'
    }
  ];
  
  return (
    <section id="bots" className="relative py-32 bg-slate-50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-600 text-sm font-medium mb-4 border border-cyan-200">
            Our Arsenal
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">OUR BOTS</span>
          </h2>
        </div>
        
        {/* Bots grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {bots.map((bot, i) => (
            <div 
              key={i}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 overflow-hidden bot-card neon-border shadow-lg">
                {/* Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${bot.color} text-white`}>
                  {bot.badge}
                </div>
                
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${bot.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <div className="text-white">{bot.icon}</div>
                </div>
                
                {/* Tagline */}
                <span className={`text-sm font-bold bg-gradient-to-r ${bot.color} bg-clip-text text-transparent`}>
                  {bot.tagline}
                </span>
                
                {/* Name */}
                <h3 className="text-3xl font-black text-slate-900 mt-2 mb-4">{bot.name}</h3>
                
                {/* Description */}
                <p className="text-slate-500 mb-6">{bot.description}</p>
                
                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {bot.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${bot.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Button 
                  className={`w-full bg-gradient-to-r ${bot.color} hover:opacity-90 text-white border-0 btn-shine`}
                  onClick={() => window.open('https://discord.gg/r4ider', '_blank')}
                >
                  Get Started
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                
                {/* Background glow */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${bot.color} opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats section
const StatsSection = () => {
  const stats = [
    { value: '3', label: 'Powerful Bots', icon: <Rocket className="w-6 h-6" /> },
    { value: '800+', label: 'Members', icon: <Users className="w-6 h-6" /> },
    { value: '24/7', label: 'Uptime', icon: <Clock className="w-6 h-6" /> },
    { value: '50+', label: 'Commands', icon: <Command className="w-6 h-6" /> }
  ];
  
  return (
    <section id="stats" className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative p-12 md:p-20 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
          
          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 glow-text-blue">
                  {stat.value}
                </div>
                <div className="text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="relative py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Background orb */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        <div className="relative">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">DOMINATE</span>?
          </h2>
          
          <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
            If you Cant Beat Them JOIN Them
          </p>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
            Join our community of 800+ members experiencing the power of NoxxBots. 
            Built for speed, designed for dominance.
          </p>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 text-xl px-12 py-8 btn-shine glow-blue"
            onClick={() => window.open('https://discord.gg/r4ider', '_blank')}
          >
            <MessageSquare className="w-6 h-6 mr-3" />
            Join Discord Server
            <ChevronRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer id="contact" className="relative py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="NoxxBots" className="w-10 h-10" />
              <span className="text-xl font-bold text-slate-900">
                Noxx<span className="text-blue-500">Bots</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-md mb-6">
              The best Discord bots ever made. Fast, reliable, and built for dominance. 
              Experience the new era of Discord automation.
            </p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="icon"
                className="border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-500"
                onClick={() => window.open('https://discord.gg/r4ider', '_blank')}
              >
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Bots</h4>
            <ul className="space-y-4">
              <li>
                <a href="#bots" className="text-slate-500 hover:text-blue-600 transition-colors">r4id Bot</a>
              </li>
              <li>
                <a href="#bots" className="text-slate-500 hover:text-blue-600 transition-colors">N4ke Bot</a>
              </li>
              <li>
                <a href="#bots" className="text-slate-500 hover:text-blue-600 transition-colors">Webhook Spammer</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-slate-500 hover:text-blue-600 transition-colors">Features</a>
              </li>
              <li>
                <a href="#stats" className="text-slate-500 hover:text-blue-600 transition-colors">Stats</a>
              </li>
              <li>
                <a href="https://discord.gg/r4ider" target="_blank" className="text-slate-500 hover:text-blue-600 transition-colors">Join Server</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 NoxxBots. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <BotsSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
