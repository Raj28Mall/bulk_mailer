import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Pricing() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <span className="text-xl font-semibold">BulkMailer</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to send personalized emails to your audience
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Card className="w-full max-w-lg border-primary/50 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Free Plan</CardTitle>
                <CardDescription className="text-xl font-bold mt-2">
                  $0 <span className="text-sm font-normal text-muted-foreground">/ month</span>
                </CardDescription>
                <div className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                  Early Access
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg font-medium mb-6">
                  🎉 Totally FREE during our early access period! 🎉
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Unlimited email campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Up to 1,000 contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Personalized email templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Contact list management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Basic email analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span>CSV import and export</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  <Link href="/signup" className="w-full">
                    Get Started for Free
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Need more features or have questions?{" "}
              <Link href="/contact" className="text-primary underline">
                Contact us
              </Link>
            </p>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BulkMailer. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

