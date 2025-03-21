"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userWelcome } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const setLoggedIn = useUserStore((state) => state.setLoggedIn);

  const handleGoogleSignIn= async () => {
    setIsLoading(true);
    try{
      const response=await userWelcome();
      if(response.success.trim()=='true'){
        setLoggedIn(true); 
        setIsLoading(false);
        setIsRedirecting(true);
        setTimeout(()=>{
          router.push('/');
        }, 5000);
      }
    } catch(error){
      console.log("This is in signin page: ", error);
    }
}

  const handleGoogleSignInn= ()=>{
    setLoggedIn(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Mail className="h-6 w-6" />
          <span className="text-xl font-semibold">BulkMailer</span>
        </Link>
      </div>
      <main className="flex flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Sign in to your BulkMailer account</p>
          </div>

          <Button
            variant="outline"
            className="w-full h-14 font-medium border-2 relative text-base"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <div className="absolute left-4 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span>{isLoading ? "Signing in..." : isRedirecting? "Redirecting to Home Page..." : "Continue with Google"}</span>
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
