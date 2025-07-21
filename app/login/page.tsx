import { login } from "../route/auth"
import { AuthForm } from "@/components/AuthForm"
import HomeButton from "@/components/HomeButton"

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HomeButton />
      <AuthForm title="Se connecter" link="/signup" linkLabel="Créer un compte" formAction={login} confirmLabel="Se connecter" />
    </div>
  )
}