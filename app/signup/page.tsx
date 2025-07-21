import HomeButton from "@/components/HomeButton"
import { signup } from "../route/auth"
import { AuthForm } from "@/components/AuthForm"

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HomeButton />
      <AuthForm title="Créer un compte" link="/login" linkLabel="Déjà un compte ?" formAction={signup} confirmLabel="Créer un compte" />
    </div>
  )
}