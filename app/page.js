import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <Hero />
      <Services />
      <Portfolio />
    </main>
  );
}
