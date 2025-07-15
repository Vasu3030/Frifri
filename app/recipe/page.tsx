'use client'

import React, { useState } from 'react'
import Prompt from './components/Prompt'
import { generateRecipes } from '../route/action'
import { PandaLoader } from "@/components/ui/loader";

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
}

import TagGroup from './components/TagGroup'
import RecipeCard from './components/RecipeCard'

const Recipe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  const [ignored, setIgnored] = useState<string[]>();
  const [tags, setTags] = useState<string[]>();
  const [error, setError] = useState<string | null>();

  const handlePromptSubmit = async (value: string) => {
    setIsLoading(true);
    setError(null);
    const res = await getRecipes(value);
    setRecipes(res.recipes);
    setIsLoading(false);
  }

  const getRecipes = async (prompt: string) => {
    const response = await generateRecipes(prompt)
    if (response.status === 200) {
      setRecipes(response.recipes)
      setIgnored(response.ignored);
      setTags(response.tags);
    } else {
      setError(response.message)
    }
    return response
  }

  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <Prompt onSubmit={handlePromptSubmit} />
      <div className="flex flex-col items-start gap-4 w-full px-4">
        {!isLoading && (
          <>
            <TagGroup title="Tags" items={tags || []} colorClass="bg-green-400" />
            <TagGroup title="Ignoré" items={ignored || []} colorClass="bg-red-400" />
          </>
        )}
      </div>

      <div className='flex flex-wrap justify-center items-center'>
        {isLoading ?
          <div className='flex flex-col justify-center items-center'>
            <PandaLoader />
          </div>
          : null}
        {!isLoading && error && (
          <p className="text-center text-red-600 font-semibold mt-4">
            {error}
          </p>
        )}
        {!isLoading && recipes && recipes.map((recipe, index) => (
          <div key={index} className="m-4">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recipe
