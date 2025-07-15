'use server'

import { ChatOpenAI } from "@langchain/openai";
import { getUnsplashImage } from '../route/getUnsplashedImage'

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPEN_AI_KEY
})

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
}

export async function generateRecipes(prompt: string) {
    const request = `Tu es un chef. Réponds uniquement avec un objet JSON strict (conforme RFC 8259).

- Toutes les clés et toutes les chaînes doivent être entre doubles guillemets.
- Pas de texte hors du JSON.

Propose 3 plats adaptés à partir du prompt : "${prompt}".

Utilise la même langue que le prompt ci dessus.

Ignore les mots non liés à la cuisine, ajoute-les dans "ignored". Les mots pertinents vont dans "tags". Soit flexible sur les fautes d'orthographes.

Si le prompt n'est vraiemnt pas lié à la cuisine, retourne uniquement :
{
  "status": 400,
  "message": "..."
}

Sinon, retourne :
{
  "status": 200,
  "tags": [...],
  "ignored": [...],
  "recipes": [
    {
      "name": "...",
      "description": "...",
      "ingredients": [...],
      "steps": [...]
    },
    ...
  ]
}
Les ingrédients dans le json doivent être précédé par leur quantité nécessaire

Détaille le plus possible les étapes de la recette
`;

    try {

        const response = await chatModel.invoke(request);

        const parsed = JSON.parse(response.content as string);

        if (parsed.status === 400) {
          return { status: 400, message: "Votre prompt n'a pas de rapport avec la cuisine." };
        }

        const recipesWithImages = await Promise.all(
            parsed.recipes.map(async (recipe: Recipe) => {
                const image = await getUnsplashImage(recipe.name);
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