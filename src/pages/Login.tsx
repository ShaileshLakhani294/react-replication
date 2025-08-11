import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import aaharamLogo from "@/assets/logos/aaharam-logo.png";
import tatvasoftLogo from "@/assets/logos/tatvasoft-logo.png";
import slide1 from "@/assets/illustrations/slide1.png";
import slide2 from "@/assets/illustrations/slide2.png";
import slide3 from "@/assets/illustrations/slide3.png";
import { useEffect, useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Fresh & Delicious",
      illustration: slide1,
      subtitle: "Quality food made with love"
    },
    {
      title: "Healthy Options",
      illustration: slide2,
      subtitle: "Nutritious meals for everyone"
    },
    {
      title: "Happy Community",
      illustration: slide3,
      subtitle: "Where great food brings people together"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">{slides[currentSlide].title}</h2>
                <div className="flex justify-center mb-6">
                  <img 
                    src={slides[currentSlide].illustration} 
                    alt={slides[currentSlide].title}
                    className="w-64 h-64 object-contain"
                  />
                </div>
                <p className="text-muted-foreground">{slides[currentSlide].subtitle}</p>
              </div>
              
              <div className="flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
        <section className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <img src={aaharamLogo} alt="aaharam logo" className="h-8" />
                <span className="text-muted-foreground">+</span>
                <img src={tatvasoftLogo} alt="TatvaSoft logo" className="h-8" />
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
                <div className="flex items-center gap-2"><Checkbox id="remember" className="rounded-sm" /><Label htmlFor="remember">Remember me</Label></div>
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
