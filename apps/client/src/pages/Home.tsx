import { 
  Video, 
  Code2, 
  Users, 
  ArrowRight, 
  Play, 
  Check, 
  Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-hidden font-sans selection:bg-[#22c55e] selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#22c55e]/10 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#22c55e]/5 blur-[120px] rounded-full mix-blend-screen opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* Badge */}
              <Badge variant="outline" className="px-3 py-1.5 rounded-full bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e]/20 text-sm font-semibold tracking-wide gap-2 max-w-fit">
                <Zap className="w-4 h-4" fill="currentColor" />
                Real-time Collaboration
              </Badge>

              {/* Headline */}
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
                  Code Together,
                </span>
                <br />
                <span className="text-white">
                  Learn Together
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                The ultimate platform for collaborative coding interviews and pair programming. 
                Connect face-to-face, code in real-time, and ace your technical interviews.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Video, label: "Live Video Chat" },
                  { icon: Code2, label: "Code Editor" },
                  { icon: Users, label: "Multi-Language" },
                ].map((item, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 text-gray-300 hover:bg-gray-900 hover:border-[#22c55e]/50 hover:text-[#22c55e] transition-colors cursor-default text-sm font-normal"
                  >
                    <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                    {item.label}
                  </Badge>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  asChild 
                  size="lg" 
                  className="group bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] h-14 px-8 text-base"
                >
                  <a href="/editor">
                    Start Coding Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group bg-transparent border-gray-700 hover:border-[#22c55e] hover:bg-[#22c55e]/5 text-white font-semibold rounded-full h-14 px-8 text-base"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800/50">
                {[
                  { value: "10K+", label: "Active Users" },
                  { value: "50K+", label: "Sessions" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-[#22c55e]">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-in fade-in zoom-in duration-1000 delay-200 lg:h-[600px] flex items-center justify-center">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#22c55e]/20 to-transparent rounded-full blur-[80px] opacity-40" />
              
              <div className="relative bg-[#1a1a1a] rounded-3xl p-4 border border-gray-800 shadow-2xl skew-y-[-2deg] hover:skew-y-0 transition-transform duration-500 ease-out">
                 <img 
                  src="/images/hero.png" 
                  alt="Collaborative Coding" 
                  className="rounded-2xl w-full h-auto object-cover shadow-inner"
                />
                
                {/* Floating Elements Decoration */}
                <div className="absolute -right-8 -bottom-8 bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-xl flex gap-3 floating-animation">
                   <div className="w-3 h-3 rounded-full bg-red-500" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500" />
                   <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES TEASER */}
        <section className="py-24 border-t border-gray-800/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="text-[#22c55e]">Succeed</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Powerful features designed to make your coding interviews seamless and productive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Video, 
                title: "HD Video Call", 
                desc: "Crystal clear video and audio for seamless communication during interviews." 
              },
              { 
                icon: Code2, 
                title: "Live Code Editor", 
                desc: "Collaborate in real-time with syntax highlighting and multiple language support." 
              },
              { 
                icon: Users, 
                title: "Easy Collaboration", 
                desc: "Share your screen, discuss solutions, and learn from each other in real-time." 
              },
            ].map((feature, i) => (
              <Card 
                key={i} 
                className="group border-gray-800 bg-[#161616] hover:border-[#22c55e]/30 transition-all hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-[#22c55e]/5"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center mb-3 group-hover:bg-[#22c55e] transition-colors">
                    <feature.icon className="w-7 h-7 text-[#22c55e] group-hover:text-black transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 leading-relaxed text-base">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
