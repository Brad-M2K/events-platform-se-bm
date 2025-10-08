import Image from "next/image";

export default function Home() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p>Browse upcoming events.</p>
      <a href="/events" className="inline-block rounded bg-black px-4 py-2 text-white">View events</a>
    </section>
  );
}
