'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'

const Prompt = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleClick = () => {
    const value = textareaRef.current?.value.trim()
    if (value) {
      onSubmit(value)
    }
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <textarea
        ref={textareaRef}
        placeholder="Décrivez vos envies ou dites les ingrédients que vous avez"
        className="w-[300px] md:w-[500px] h-32 p-4 bg-[#8B4513] text-amber-100 rounded-xl resize-y text-sm"
      />
      <Button 
        className='cursor-pointer font-semibold bg-amber-200 text-[#8B4513]'
        onClick={() => {handleClick()}}
      >
        Valider
      </Button>
    </div>
  )
}

export default Prompt
