import { Feedback } from "./components/feedback";
import { MainPlans } from "./components/main-plans";
import { InfoSection } from "./components/info-section";
import { Logos } from "./components/logos";
import { Banner } from "./components/banner";

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
