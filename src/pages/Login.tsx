import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import chefIllustration from "@/assets/illustrations/chef.png";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import friesImg from "@/assets/food/fries.jpg";
import bhelImg from "@/assets/food/bhel.jpg";
import samosaImg from "@/assets/food/samosa.jpg";
const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Login • Cafeteria Admin</title>
        <meta name="description" content="Login to manage orders and daily menus." />
        <link rel="canonical" href={(typeof window !== 'undefined' && window.location.href) || ''} />
      </Helmet>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <aside className="relative hidden bg-secondary md:block">
          <div className="absolute inset-0 rounded-br-[4rem] bg-secondary" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-10">
            <Carousel className="w-full max-w-md" opts={{ loop: true }}>
              <CarouselContent>
                {[{img: friesImg, caption: "Crispy French Fries"}, {img: bhelImg, caption: "Fresh Bhel"}, {img: samosaImg, caption: "Hot Samosa"}].map((s, i) => (
                  <CarouselItem key={i}>
                    <div className="overflow-hidden rounded-2xl border bg-card/70 p-4 shadow">
                      <img src={s.img} alt={s.caption} className="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
                      <div className="mt-3 text-center text-sm font-medium">{s.caption}</div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </aside>
        <section className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="rounded-full border border-primary/40 px-3 py-1 text-sm font-semibold text-primary" aria-label="aaharam logo">aaharam</div>
                <span className="text-muted-foreground">+</span>
                <div className="rounded-md border bg-muted px-3 py-1 text-sm font-medium" aria-label="TatvaSoft logo">TatvaSoft</div>
              </div>
              <div className="mx-auto mb-6 h-px w-4/5 bg-border" />
              <h2 className="text-3xl font-semibold">Login</h2>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/orders");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Checkbox id="remember" className="rounded-none" /><Label htmlFor="remember">Remember me</Label></div>
                <a href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Forgot your password?</a>
              </div>
              <Button size="lg" className="w-full">Login</Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
