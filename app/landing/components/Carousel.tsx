import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

const CarouselComponent = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    return (
        <Carousel className='w-full' plugins={[plugin.current]}>
            <CarouselContent>
                <CarouselItem className='h-full'>
                    <Card className='bg-[#8B4513] text-amber-100'>
                        <CardContent className="flex min-h-[14rem] items-center justify-center p-6">
                            <div className='flex flex-col justify-evenly items-center h-full font-bold text-center'>
                                <div className='text-3xl font-bold text-amber-300'>
                                    STEP 1
                                </div>
                                <div>
                                    Dites au chef les ingrédients et envies que vous avez via des mots clés
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem >
                    <Card className='bg-[#8B4513] text-amber-100'>
                        <CardContent className="flex min-h-[14rem] items-center justify-center p-6">
                            <div className='flex flex-col justify-evenly items-center h-full font-bold text-center'>
                                <div className='text-3xl font-bold text-amber-300'>
                                    STEP 2
                                </div>
                                <div>
                                    Patientez un instant le temps que le chef vous propose les meilleurs plats selon vos goûts et ressources...
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem >
                    <Card className='bg-[#8B4513] text-amber-100'>
                        <CardContent className="flex min-h-[14rem] items-center justify-center p-6">
                            <div className='flex flex-col justify-evenly items-center h-full font-bold text-center'>
                                <div className='text-3xl font-bold text-amber-300'>
                                    STEP 3
                                </div>
                                <div>
                                    Jetez un oeil aux plats proposé ainsi que leur recette et faites votre choix !
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarouselComponent