import React, { useEffect } from "react";
import { AppProvider, useApp } from "./lib/AppContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/pages/HomePage";
import { TeamPage } from "./components/pages/TeamPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { ProjectDetailPage } from "./components/pages/ProjectDetailPage";
import { ContactPage } from "./components/pages/ContactPage";
import { JustForFunPage } from "./components/pages/JustForFunPage";
import { ConsentBanner } from "./components/ConsentBanner";
import { Toaster } from "./components/ui/sonner";

const AppContent: React.FC = () => {
  const { currentPage, language } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "team":
        return <TeamPage />;
      case "profile":
        return <ProfilePage />;
      case "projects":
        return <ProjectsPage />;
      case "project-detail":
        return <ProjectDetailPage />;
      case "fun":
        return <JustForFunPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-float-slow-delayed" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-slow-delayed-2" />
      </div>

      <Header />
      <main className="flex-1 relative z-0">
        {renderPage()}
      </main>
      <Footer />
      <ConsentBanner language={language} />
      <Toaster />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}