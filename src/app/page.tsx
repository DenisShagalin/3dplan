import { Feedback } from "./components/feedback";
import { MainPlans } from "./components/main-plans";
import { Partners } from "./components/partners";
import { PlanExample } from "./components/plan-example";
import { Us } from "./components/us";

export default function Home() {
  return (
    <div className="home">
      <Us />
      <MainPlans />
      <PlanExample />
      <Partners />
      <Feedback />
    </div>
  );
}
