import { TracingBeamDemo } from '@/components/about'
import { NavbarDemo } from '@/components/navigation-menu'
import React from 'react'

const About = () => {
  return (
    <>
    <NavbarDemo />
      <div className='pt-36 bg-black text-white'>
      <TracingBeamDemo/>
    </div>
    </>
  )
}

export default About
