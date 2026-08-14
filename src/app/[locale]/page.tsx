import { Feedback } from "@/app/components/feedback";
import { MainPlans } from "@/app/components/main-plans";
import { InfoSection } from "@/app/components/info-section";
import { Logos } from "@/app/components/logos";
import { Banner } from "@/app/components/banner";

export default function Home() {
  return (
    <div className="home">
      <Banner />
      <MainPlans />
      <InfoSection />
      <Logos />
      <Feedback />
    </div>
  );
}
