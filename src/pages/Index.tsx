import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <AppLayout title="Aaharam Admin • Cafeteria" description="Manage orders, daily menus, and items with a clean, responsive dashboard.">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-semibold">Cafeteria Admin</h1>
        <p className="mb-8 text-muted-foreground">
          Lightweight demo inspired by your screenshots. Explore Orders, Today’s Menu, and Add/Edit Items.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/orders">View Orders</Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
