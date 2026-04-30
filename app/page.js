import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
       <Footer />
       <ScrollToTop  />
    </main>
  );
}
