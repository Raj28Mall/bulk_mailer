import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Features() {
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
      <main className="flex-1 px-10">
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Features</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to send personalized emails to your audience
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Personalized Email Campaigns</h2>
              <p className="text-muted-foreground">
                Create highly personalized email campaigns with dynamic content that changes based on recipient data.
                Use placeholders like [name], [company], or any custom field to make each email feel personal and
                relevant.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Dynamic content insertion with placeholders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Preview personalized emails before sending</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Conditional content based on recipient data</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border bg-muted/40 p-6">
              <div className="space-y-4">
                <div className="font-medium">Email Preview</div>
                <div className="rounded-md border bg-background p-4">
                  <div className="mb-2 font-medium">Subject: Your Custom Report is Ready</div>
                  <div className="prose prose-sm max-w-none">
                    <p>Dear [name],</p>
                    <p>
                      Your custom report for [company] is now ready to view. We&apos;ve analyzed your data and prepared some
                      insights that we think you&apos;ll find valuable.
                    </p>
                    <p>
                      Best regards,
                      <br />
                      The BulkMailer Team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 border-t">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-lg border bg-muted/40 p-6">
              <div className="space-y-4">
                <div className="font-medium">Contact Management</div>
                <div className="rounded-md border bg-background">
                  <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                    <div className="col-span-5">Email</div>
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Company</div>
                  </div>
                  <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                    <div className="col-span-5">john@example.com</div>
                    <div className="col-span-4">John Doe</div>
                    <div className="col-span-3">Acme Inc</div>
                  </div>
                  <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                    <div className="col-span-5">jane@example.com</div>
                    <div className="col-span-4">Jane Smith</div>
                    <div className="col-span-3">XYZ Corp</div>
                  </div>
                  <div className="grid grid-cols-12 items-center px-4 py-3">
                    <div className="col-span-5">alex@example.com</div>
                    <div className="col-span-4">Alex Johnson</div>
                    <div className="col-span-3">123 LLC</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Advanced Contact Management</h2>
              <p className="text-muted-foreground">
                Easily manage your contact lists with powerful organization tools. Import contacts from CSV files,
                create segments, and keep your lists clean and up-to-date.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Bulk import from CSV and Excel files</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Create custom fields for advanced personalization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Segment contacts into targeted lists</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container py-12 border-t">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Template Library</h2>
              <p className="text-muted-foreground">
                Save time with our extensive template library. Choose from professionally designed templates or create
                your own. All templates are fully customizable and responsive.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Professional, ready-to-use email templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Rich text editor for custom designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                  <span>Save and reuse your own templates</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border bg-muted/40 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border bg-background p-4">
                  <div className="text-sm font-medium mb-2">Welcome Email</div>
                  <div className="h-32 bg-muted rounded-md"></div>
                </div>
                <div className="rounded-md border bg-background p-4">
                  <div className="text-sm font-medium mb-2">Newsletter</div>
                  <div className="h-32 bg-muted rounded-md"></div>
                </div>
                <div className="rounded-md border bg-background p-4">
                  <div className="text-sm font-medium mb-2">Product Update</div>
                  <div className="h-32 bg-muted rounded-md"></div>
                </div>
                <div className="rounded-md border bg-background p-4">
                  <div className="text-sm font-medium mb-2">Event Invitation</div>
                  <div className="h-32 bg-muted rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of users who are already sending personalized emails with BulkMailer.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
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

