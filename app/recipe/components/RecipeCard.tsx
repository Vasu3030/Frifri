'use client'

import { useState } from "react";
import Image from "next/image";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Recipe {
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image?: string;
}

interface Props {
    recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer w-[300px] md:w-[500px] lg:w-[700px] transition-all duration-500"
        >
            <Card className={cn("overflow-hidden", isOpen && "ring-4 ring-amber-300")}>
                {/* Image */}
                <div className="relative w-full h-60 md:h-72">
                    <Image
                        src={recipe.image || "/poulet.avif"}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Titre + Description */}
                <div className="p-4">
                    <CardHeader className="p-0 mb-2">
                        <CardTitle className="text-lg text-green-800">{recipe.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm text-gray-700">
                            {recipe.description}
                        </CardDescription>
                    </CardContent>
                </div>

                {/* Détails animés */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ transformOrigin: "top" }}
                            className="px-4 pb-4 origin-top text-sm space-y-4"
                        >
                            <div>
                                <p className="font-semibold">Ingrédients :</p>
                                <ul className="list-disc list-inside ml-2">
                                    {recipe.ingredients.map((ingredient, i) => (
                                        <li key={i}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="font-semibold">Préparation :</p>
                                <ol className="list-decimal list-inside ml-2">
                                    {recipe.steps.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};

export default RecipeCard;
