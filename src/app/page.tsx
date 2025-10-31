import { Feedback } from "./components/feedback";
import { MainPlans } from "./components/main-plans";
import { PlanExample } from "./components/plan-example";
import { Us } from "./components/us";

import Image from "next/image";

export default function Home() {
  return (
    <div className="wrapper">
      <Image
        src="/service.jpg"
        alt="3dplan"
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: '60%',
          height: 'auto',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
      />
    </div>
  )

  // return (
  //   <div className="home">
  //     <Us />
  //     <MainPlans />
  //     <PlanExample />
  //     <Feedback />
  //   </div>
  // );
}
