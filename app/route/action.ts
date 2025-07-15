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

  const request = `Tu es un chef. Réponds uniquement avec un objet JSON strictement valide (conforme à la RFC 8259).

- Toutes les clés et toutes les chaînes de caractères doivent être entre doubles guillemets.
- Aucune explication ou texte en dehors du JSON.
- Ton rôle est de proposer 3 et toujours 3 recettes adaptées à une intention ou envie exprimée par l'utilisateur.
- Chaque recette doit être différentes et cherche toujours à proposer des recettes avec un vrai nom.

Le prompt utilisateur peut être :
- Une phrase complète exprimant une envie de nourriture.
- Une suite de mots-clés (souvent séparés par des espaces ou des virgules).
- Parfois une combinaison des deux.

1. Analyse le prompt :
- Identifie les mots liés à la cuisine (ingrédients, plats, types de cuisson, goûts, etc.) → place-les dans "tags".
- Place dans "ignored" tous les mots qui :
  - Ne sont pas liés à l'alimentation ou à la cuisine (ex : "ordinateur", "prout", "football").
- Ne place pas dans "ignored" les mots qui, bien que peu utiles (comme "je", "veux", "manger"), aident à comprendre l’intention. Ils peuvent être ignorés dans ton raisonnement, mais ne doivent pas apparaître dans "ignored" sauf s’ils sont manifestement absurdes hors contexte.
- Si une partie des mots sont en rapport avec la cuisine et la nourriture alors il faudra une réponse avec les recettes mais bien sur sans prendre en compte les mots hors sujet tout en les plaçant dans "ignored".

- Retourne très exactement l'un des deux type de JSON ci dessous :

2. Si aucun mot pertinent en lien avec la cuisine n’est détecté, retourne uniquement :
{
  "status": 400,
  "message": "Le prompt ne semble pas lié à la nourriture ou à la cuisine. Veuillez reformuler."
}

3. Sinon, retourne un JSON complet au format suivant :
{
  "status": 200,
  "tags": [...], // mots liés à la cuisine
  "ignored": [...], // mots hors sujet
  "recipes": [
    {
      "name": "...",
      "description": "...",
      "ingredients": [
        "quantité + ingrédient"
      ],
      "steps": [
        "étape 1",
        "étape 2",
        ...
      ]
    },
    ...
  ]
}

- Les ingrédients doivent être précédés de leur quantité recommandée et cela pour 2 personnes impérativement sauf si le prompt de l'user décris le nombre de personnes.
- Les étapes de préparation ("steps")** doivent être :
  - Détaillées et précises.
  - Actionnables même pour un débutant.
  - Inclure les quantités approximatives d’eau ou d’huile, les températures, les durées, les ustensiles (ex : casserole, poêle, four), les techniques (faire revenir, porter à ébullition, laisser mijoter, etc.).
  - Par exemple, au lieu de dire : "cuire le riz", tu dois écrire :  
    → "Rincer 200g de riz à l’eau froide, puis le mettre dans une casserole avec 400ml d’eau. Porter à ébullition, couvrir, baisser à feu doux et cuire pendant 12 minutes. Laisser reposer 5 minutes hors du feu avant de servir."
    Rédige les étapes avec le souci du détail comme si tu t’adressais à quelqu’un qui ne sait pas cuisiner.
- Réponds dans la même langue que celle du prompt utilisateur.

Voici le prompt de l'utilisateur : ${prompt}
`;

  try {

    const response = await chatModel.invoke(request);

    const parsed = JSON.parse(response.content as string);

    if (parsed.status === 400) {
      return { status: 400, message: "Votre prompt n'a pas de rapport avec la cuisine." };
    }

    const recipesWithImages = await Promise.all(
      parsed.recipes.map(async (recipe: Recipe) => {
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