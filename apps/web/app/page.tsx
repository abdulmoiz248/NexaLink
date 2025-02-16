import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import FeaturesSection from "./components/FeaturesSection"
import TestimonialSection from "./components/TestimonialSection"
import Footer from "./components/Footer"
import BackgroundAnimation from "./components/BackgroundAnimation"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TestimonialSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

