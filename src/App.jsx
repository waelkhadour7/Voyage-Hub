import { useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import ServiceBar from "./components/ServiceBar";
import AboutSection from "./components/AboutSection";
import CountriesSection from "./components/CountriesSection";
import ReadinessSection from "./components/readiness/ReadinessSection";
import AirlinesSection from "./components/AirlinesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import SmartTripSummary from "./components/SmartTripSummary";
import ChatBot from "./components/ChatBot";
import Onboarding from "./components/Onboarding";
import { isAppMode } from "./lib/appMode";
import HotelsPage from "./components/pages/HotelsPage";
import { useHashRoute } from "./lib/useHashRoute";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(() => isAppMode());
  const finishOnboarding = () => {
    setShowOnboarding(false);
  };
  const { route, navigate } = useHashRoute();

  const isHotelsPage = route.raw.startsWith("#/hotels");

  if (showOnboarding) return <Onboarding onFinish={finishOnboarding} />;

  if (isHotelsPage) {
    return <HotelsPage onBackToHome={() => navigate("#/home")} />;
  }

  return (
    <>
      <HeroSlider>
        <Header />
      </HeroSlider>
      <ServiceBar />
      <SmartTripSummary />
      <CountriesSection />
      <AboutSection />
      <ReadinessSection />
      <AirlinesSection />
      <WhyChooseUs />
      <ChatBot />
    </>
  );
}
