interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
}

export default function FeatureCard({ title, children }: FeatureCardProps) {
  return (
    <div className="w-full 2xl:w-1/4 flex flex-col items-center p-4">
      <div className="w-full h-auto rounded-md mb-4 flex justify-center items-center">
        {children}
      </div>
      <h3 className="3xl:text-[22px] 2xl:text-[20px] text-[22px] font-semibold mb-2 text-center">
        {title}
      </h3>
    </div>
  );
}
