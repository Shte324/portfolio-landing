import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Моё портфолио</h1>
      <p className="mt-4">Скоро здесь будет магия.</p>
      <Hero />
    </main>
  );
}
