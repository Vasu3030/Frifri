import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HomeButton = () => {
    return (
        <Link href={"/"}>
            <div className='relative flex flex-row w-[8rem] h-[8rem] lg:w-[24rem] lg:h-[24rem]'>
                <Image src="panda.svg" alt="chef-panda" fill />
            </div>
        </Link>
    )
}

export default HomeButton