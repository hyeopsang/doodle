import FeatureCard from "./feature-card";
import Mobile from "@/assets/mobile.svg?react";
import Touch from "@/assets/touch.svg?react";
import Layer from "@/assets/layer.svg?react";
import Minimal from "@/assets/minimal.svg?react";
export default function Feature() {
  return (
    <section className="w-full 2xl:h-62 3xl:h-[250px] gap-10 2xl:gap-0 py-10 2xl:py-0 flex flex-col 2xl:flex-row items-center">
      <FeatureCard title="Mobile ready">
        <Mobile width={36} height={36} />
      </FeatureCard>
      <FeatureCard title="Touch input">
        <Touch width={36} height={36} />
      </FeatureCard>
      <FeatureCard title="Layer tools">
        <Layer width={36} height={36} />
      </FeatureCard>
      <FeatureCard title="Minimal UI">
        <Minimal width={36} height={36} />
      </FeatureCard>
    </section>
  );
}
