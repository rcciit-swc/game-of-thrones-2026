
import EventContainer from '@/components/events/EventContainer'
import EventsWrapper from '@/components/events/EventsWrapper'
import ImageMarquee from '@/components/events/ImageMarquee'

import React from 'react'

const page = () => {
  return (
    <div>
    <EventsWrapper />    
    <ImageMarquee />
    <div className='flex justify-center items-center my-20 px-4 relative'>
        <div className='absolute inset-0 flex justify-center items-center pointer-events-none'>
            <div className='block md:hidden top-20 relative w-96 h-96 bg-red-500/25 rounded-full blur-3xl'></div>
        </div>
        <h1 className=' rajdhanifont text-3xl max-w-4xl text-center tracking-wider text-[#CCA855] translate-y-20 relative z-10'>
            “Every match here is a rift into the unknown. The rules are simple, but the pressure is immense. Forget the Long Night—the real enemy is the clock, the opponent, and the doubt in your own mind. This is where champions are forged in fire and ice, and where only the fittest escape the Upside Down.”
        </h1>
    </div>
    <EventContainer />
    </div>
  )
}

export default page
