import {
  Video,
  Code2,
  Users,
  ArrowRight,
  Play,
  Check,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen overflow-hidden font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen opacity-20" />
      </div>

      <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-8 duration-1000 animate-in fade-in slide-in-from-bottom-8">
              {/* Badge */}
              <Badge
                variant="outline"
                className="px-3 py-1.5 rounded-full bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 text-sm font-semibold tracking-wide gap-2 max-w-fit"
              >
                <Zap className="w-4 h-4" fill="currentColor" />
                {t("pages.home.badge")}
              </Badge>

              {/* Headline */}
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  {t("pages.home.headline.part1")}
                </span>
                <br />
                <span className="text-foreground">
                  {t("pages.home.headline.part2")}
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("pages.home.description2")}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Video, label: t("pages.home.features.liveVideo") },
                  { icon: Code2, label: t("pages.home.features.codeEditor") },
                  {
                    icon: Users,
                    label: t("pages.home.features.multiLanguage"),
                  },
                ].map((item, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-normal transition-colors border rounded-full cursor-default border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:border-primary/50 hover:text-primary"
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                    {item.label}
                  </Badge>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] h-14 px-8 text-base"
                >
                  <a href="/editor">
                    {t("pages.home.cta.startCoding")}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 text-base font-semibold bg-transparent rounded-full group border-border hover:border-primary hover:bg-primary/5 text-foreground h-14"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  {t("pages.home.cta.watchDemo")}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                {[
                  { value: "10K+", label: t("pages.home.stats.activeUsers") },
                  { value: "50K+", label: t("pages.home.stats.sessions") },
                  { value: "99.9%", label: t("pages.home.stats.uptime") },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-in fade-in zoom-in duration-1000 delay-200 lg:h-[600px] flex items-center justify-center">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-[80px] opacity-40" />

              <div className="relative bg-card rounded-3xl p-4 border border-border shadow-2xl skew-y-[-2deg] hover:skew-y-0 transition-transform duration-500 ease-out">
                <img
                  src="/images/hero.png"
                  alt="Collaborative Coding"
                  className="object-cover w-full h-auto shadow-inner rounded-2xl"
                />

                {/* Floating Elements Decoration */}
                <div className="absolute flex gap-3 p-4 border shadow-xl -right-8 -bottom-8 bg-card rounded-xl border-border floating-animation">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES TEASER */}
        <section className="py-24 border-t border-border">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              {t("pages.home.featuresSection.title")}{" "}
              <span className="text-primary">
                {t("pages.home.featuresSection.titleHighlight")}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              {t("pages.home.featuresSection.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Video,
                title: t("pages.home.featuresSection.hdVideo.title"),
                desc: t("pages.home.featuresSection.hdVideo.description"),
              },
              {
                icon: Code2,
                title: t("pages.home.featuresSection.liveCodeEditor.title"),
                desc: t(
                  "pages.home.featuresSection.liveCodeEditor.description"
                ),
              },
              {
                icon: Users,
                title: t("pages.home.featuresSection.easyCollaboration.title"),
                desc: t(
                  "pages.home.featuresSection.easyCollaboration.description"
                ),
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="group border-border bg-card hover:border-primary/30 transition-all hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="flex items-center justify-center mb-3 transition-colors w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary">
                    <feature.icon className="transition-colors w-7 h-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
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
