'use client'

import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import CarouselComponent from './components/Carousel';

const Landing = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='flex flex-col lg:flex-row w-full justify-between items-center px-24 pt-12 gap-12'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className='text-center font-extrabold text-4xl'>Let Me Cook</div>
                    <div className='relative flex flex-row w-[8rem] h-[8rem] lg:w-[24rem] lg:h-[24rem]'>
                        <Image src="panda.svg" alt="chef-panda" fill />
                    </div>
                </div>
                <div className='flex w-screen lg:w-full md:w-full max-h-xs'>
                    <CarouselComponent />
                </div>
            </div>
            <Link href="/recipe">
                <Button className='cursor-pointer font-semibold bg-green-600'>
                    GO !
                </Button>
            </Link>
        </div>
    )
}

export default Landing