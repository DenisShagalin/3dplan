import { Feedback } from "@/app/components/feedback";
import { InfoSection } from "@/app/components/info-section";
import { Logos } from "@/app/components/logos";

export default function Home() {
  return (
    <div className="home">
      <InfoSection />
      <Logos />
      <Feedback />
    </div>
  );
}
