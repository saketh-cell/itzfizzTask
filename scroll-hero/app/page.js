import Hero from "@/components/Hero";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  return (
    <main>
      <ScrollIndicator />
      <Hero />
      <section className="h-[200vh] bg-black" />
    </main>
  );
}