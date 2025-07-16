export interface IRecipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
}

export interface IRecipeResponse {
  status: 200 | 400;
  tags?: string[];
  ignored?: string[];
  recipes?: IRecipe[];
  message?: string;
}
