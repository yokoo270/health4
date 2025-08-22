import { LoginForm } from "@/auth/login-form"
import { AuthLayout } from "@/auth/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your fitness journey"
      footerText="Don't have an account?"
      footerLink="/auth/register"
      footerLinkText="Sign up"
    >
      <LoginForm />
    </AuthLayout>
  )
}
