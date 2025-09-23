import AboutCard from "./about-card";

export default function About() {
  return (
    <section className="w-full py-10 2xl:py-20">
      <AboutCard reverse />
      <AboutCard />
      <AboutCard reverse />
    </section>
  );
}
