import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface Props {
    title: string;
    link: string;
    linkLabel: string;
    formAction: (formData: FormData) => Promise<void>;
    confirmLabel: string;
}

export function AuthForm({ title, link, linkLabel, formAction, confirmLabel }: Props) {
    return (
        <Card className="w-full max-w-sm py-5 bg-[#8B4513] text-amber-100">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardAction>
                    <Link
                        href={link}
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:pointer text-amber-300"
                    >
                        {linkLabel}
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="nom@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mot de passe</Label>
                                {title === "Se connecter" && (<Link
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:pointer text-amber-300"
                                >
                                    Mot de passe oublié ?
                                </Link>)}
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>
                    </div>
                    <CardFooter className="flex-col gap-2 mt-6">
                        <Button type="submit" className='cursor-pointer font-semibold bg-green-600'>
                            {confirmLabel}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
