import { Helmet } from "react-helmet-async";
import TopNav from "./TopNav";
import { ReactNode } from "react";

interface AppLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const AppLayout = ({ title, description, children }: AppLayoutProps) => {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <link rel="canonical" href={canonical} />
      </Helmet>
      <TopNav />
      <main className="container py-6">{children}</main>
    </div>
  );
};

export default AppLayout;
