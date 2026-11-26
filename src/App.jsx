import { useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import ServiceBar from "./components/ServiceBar";
import AboutSection from "./components/AboutSection";
import CountriesSection from "./components/CountriesSection";
import ReadinessSection from "./components/readiness/ReadinessSection";
import AirlinesSection from "./components/AirlinesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import SmartTrip from "./components/SmartTrip";
import ChatBot from "./components/ChatBot";
import B2BButton from "./components/B2BButton";
import SplashScreen from "./components/SplashScreen";
import HotelsPage from "./components/pages/HotelsPage";
import { useHashRoute } from "./lib/useHashRoute";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { route, navigate } = useHashRoute();

  const isHotelsPage = route.raw.startsWith("#/hotels");

  if (isHotelsPage) {
    return <HotelsPage onBackToHome={() => navigate("#/home")} />;
  }

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <HeroSlider>
        <Header />
      </HeroSlider>
      <ServiceBar />
      <SmartTrip />
      <AboutSection />
      <CountriesSection />
      <ReadinessSection />
      <AirlinesSection />
      <WhyChooseUs />
      <B2BButton />
      <ChatBot />
    </>
  );
}
