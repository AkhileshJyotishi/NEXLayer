import ContentSection from '@/components/content'
import Stake from '@/components/stake';
import Restake from '@/components/restake';
import { BackgroundBeams } from '@/components/ui/background-beams'
import React from 'react'
import Award from '@/components/award';
import { NavbarDemo } from '@/components/navigation-menu';


const tabsData = [
  {
    value: "Stake",
    label: "Stake",
    content:<Stake />,
  },
  {
    value: "Restake",
    label: "Restake",
    content: <Restake/>,
  },
  {
    value: "Awards",
    label: "Awards",
    content: <Award/>,
  },
  {
    value: "Swap",
    label: "Swap",
    content: <> Make changes to your account here.</>,
  },
];

const index = () => {
  return (
    <div className="h-fit sm:h-[100vh] w-full  bg-neutral-950 relative flex flex-col  antialiased">
      <NavbarDemo />
      <ContentSection
        tabs={tabsData}
      />
      <BackgroundBeams />
    </div>
  )
}

export default index
