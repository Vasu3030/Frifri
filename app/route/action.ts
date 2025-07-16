'use server'

import { ChatOpenAI } from "@langchain/openai";
import { getUnsplashImage } from '../route/getUnsplashedImage'
import { generateRecipesPrompt } from "../../lib/prompt";
import { IRecipe } from "@/lib/types/recipe";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPEN_AI_KEY
})

export async function generateRecipes(prompt: string) {

  const MAX_WORDS = 20;
  const MAX_CHARACTERS = 250;

  const trimmedPrompt = prompt.trim();
  const wordCount = trimmedPrompt.split(/\s+/).length;
  const charCount = trimmedPrompt.length;

  if (charCount > MAX_CHARACTERS) {
    return {
      status: 413,
      message: `Le prompt est trop long. Maximum ${MAX_CHARACTERS} caractères autorisés.`,
    };
  }

  if (wordCount > MAX_WORDS) {
    return {
      status: 413,
      message: `Le prompt contient trop de mots. Maximum ${MAX_WORDS} autorisés.`,
    };
  }

  const request = generateRecipesPrompt(prompt);

  try {

    const response = await chatModel.invoke(request);

    const parsed = JSON.parse(response.content as string);

    if (parsed.status === 400) {
      return { status: 400, message: "Votre prompt n'a pas de rapport avec la cuisine." };
    }

    const recipesWithImages = await Promise.all(
      parsed.recipes.map(async (recipe: IRecipe) => {
        const query = `plat cuisiné ${recipe.name} food dish`
        const image = await getUnsplashImage(query);
        return { ...recipe, image };
      })
    );

    return {
      ...parsed,
      recipes: recipesWithImages,
    };
  } catch (error) {
    console.error("Erreur de parsing ou d'API :", error);
    return { status: 500, message: "Erreur lors de la génération ou du parsing." };
  }
}