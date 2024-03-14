import { NavbarDemo } from '@/components/navigation-menu'
import Button from '@/components/ui/button'
import GridBackground from '@/components/ui/grid-background'
import { InfiniteMovingCards } from '@/components/ui/infinite-scroll'
import Spotlight from '@/components/ui/spot-light'
import Image from 'next/image'
import { AiFillThunderbolt } from "react-icons/ai";
import infiniteScrollData from '@/data/infinite-scroll.json'
import Artworks from '@/components/light-box'
import BluePrint from '@/assets/BluePrint.png'
import Restaking from '@/assets/Restaking.png'
import Footer from '@/components/footer'
import { HoverEffect } from '@/components/our-team'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeImage from "@/assets/Home_img.jpeg"
import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
const artwork = [
  BluePrint
  , Restaking
];

//👇 Configure our font object

const items = [
  {
    title: "Akhilesh Jyotishi",
    description: "Web Developer",
    link: "/item1",
  },
  {
    title: "Shreyash Lokhande",
    description: "Blockchain Developer",
    link: "/item2",
  },
  {
    title: "Yash Kudnar",
    description: "Blockchain Developer",
    link: "/item3",
  },
];

{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
<Image
  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  src="/next.svg"
  alt="Next.js Logo"
  width={180}
  height={37}
  priority
/>
</div> */}


export default function Home() {



  return (

    <main className="h-full">
      <ToastContainer />

      <NavbarDemo />
      <GridBackground >

        <Spotlight
          className=" -top-40 left-0 md:left-60 md:-top-20 "
          fill="#7423B7" />

        <div className='relative top-60 w-11/12 sm:w-[70%] mx-auto'>
          <div className='relative grid grid-cols-1 md:grid-cols-2 text-white  '>
            <div className='flex flex-col'>
              <div className='text-7xl font-extrabold capitalize ' >Liquid Dreams , multiple gains</div>
              <div className='mt-14 text-[20px] text-gray-300 tracking-wider  '>
                NEXLayer protocol is built on conflux that introduces restaking, a new primitive in cryptoeconomic security. This primitive enables the reuse of CFX on the consensus layer. Users that stake CFX natively or with a liquid staking token (LST) can opt-in to NEXLayer smart contracts to restake their CFX or LST and extend cryptoeconomic security to additional applications on the network to earn additional rewards.
              </div>
              <Button variant="blackNwhite" className='!mt-12' >
                <AiFillThunderbolt className='text-lg' />
                <Link href={"/stake"} className='font-bold'>Launch App</Link>
              </Button>
            </div>
            <div className='grid place-items-center'>
              <Image alt='' src={HomeImage} height={1000} width={1000} className=' shadow h-[520px] w-[520px] rounded-full ' style={{mixBlendMode:"lighten"}}/>
            </div>

          </div>
          <InfiniteMovingCards items={infiniteScrollData} className='mt-16' direction='left' key={"infinite"} pauseOnHover speed='normal' />
          <div className='mt-40'>
            <div className='text-white md:text-6xl text-3xl font-bold mx-auto w-fit capitalize text-center'>
              How <span className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text text-transparent'>NEXLayer</span> Works
            </div>
            <Artworks artwork={artwork} />
            </div>
          <h1 className='w-full text-3xl md:text-6xl text-center text-white mt-20 md:mt-40 font-bold'>
            Meet Our Team
          </h1>
          <h4 className='text-center text-gray-300 w-full text-lg md:text-2xl mt-4 italic'>We’re a dynamic group of individuals who are passionate about what we do.</h4>
          <HoverEffect items={items} />
        
          <Footer />
        </div>

      </GridBackground>

    </main>
  )
}
