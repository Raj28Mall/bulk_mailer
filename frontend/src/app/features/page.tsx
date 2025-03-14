import Link from "next/link"
import { Mail, CheckCircle, Clock, BarChart2, Calendar, FileText, Users, Edit, FileSpreadsheet, Database,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
      <main className="flex-1 px-12">
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Features</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to send personalized emails to your audience
            </p>
          </div>
        </section>

        <section className="container pb-12">
          <Tabs defaultValue="current">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="current" className="flex-1">
                Current Features
              </TabsTrigger>
              <TabsTrigger value="coming-soon" className="flex-1">
                Coming Soon
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Personalized Email Campaigns</h2>
                  <p className="text-muted-foreground">
                    Create highly personalized email campaigns with dynamic content that changes based on recipient
                    data. Use placeholders like [name], [company], or any custom field to make each email feel personal
                    and relevant.
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
                      <div className="mb-2 font-semibold">Subject: Your Custom Report is Ready</div>
                      <div className="prose prose-sm max-w-none">
                        <p>Dear [name],</p>
                        <br />
                        <p>
                          Your custom report for [company] is now ready to view. We&apos;ve analyzed your data and prepared
                          some insights that we think you&apos;ll find valuable.
                        </p>
                        <br />
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

              <div className="grid gap-12 md:grid-cols-2 mt-12 border-t pt-12">
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
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Basic Contact Management</h2>
                  <p className="text-muted-foreground">
                    Import your contacts from CSV files to quickly set up your recipient lists. Our simple interface
                    makes it easy to get started.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                      <span>CSV file import</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                      <span>Preview imported contacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                      <span>Send to all imported contacts</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 mt-12 border-t pt-12">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Template Library</h2>
                  <p className="text-muted-foreground">
                    Save time with our template library. Choose from professionally designed templates or create your
                    own. All templates are fully customizable.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                      <span>Ready-to-use email templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                      <span>Create and save your own templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                      <span>Reuse templates for multiple campaigns</span>
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
            </TabsContent>

            <TabsContent value="coming-soon">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Coming Soon</h2>
                <p className="text-muted-foreground mt-2">
                  I&apos;m constantly improving BulkMailer. Here&apos;s what&apos;s on my roadmap.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Advanced Sending Options */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BarChart2 className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Advanced Sending Options</CardTitle>
                    </div>
                    <CardDescription>Get more insights and control over your email campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Track email opens to see who&apos;s engaging with your content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart2 className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Track link clicks to measure the effectiveness of your calls to action</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Schedule emails for later to reach your audience at the perfect time</span>
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4">
                      Coming 2025
                    </Badge>
                  </CardContent>
                </Card>

                {/* Professional Templates */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Professional Templates</CardTitle>
                    </div>
                    <CardDescription>Expanded library of professionally designed email templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <FileText className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Industry-specific templates for various business needs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Seasonal and event-based templates for timely campaigns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Responsive designs that look great on all devices</span>
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4">
                      Coming 2025
                    </Badge>
                  </CardContent>
                </Card>

                {/* Advanced Contact Management */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Advanced Contact Management</CardTitle>
                    </div>
                    <CardDescription>Comprehensive tools for managing your contact lists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Edit className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Add, edit, and delete contacts manually with an intuitive interface</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileSpreadsheet className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Support for Excel, Google Sheets, and other file formats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Database className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Create and manage multiple contact lists and segments</span>
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4">
                      Coming 2025
                    </Badge>
                  </CardContent>
                </Card>

                {/* Email Analytics */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BarChart2 className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Email Analytics</CardTitle>
                    </div>
                    <CardDescription>Detailed insights into your email campaign performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <BarChart2 className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Comprehensive dashboards with open rates, click rates, and more</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart2 className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Compare campaign performance over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart2 className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Export reports for presentation and analysis</span>
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4">
                      Coming 2025
                    </Badge>
                  </CardContent>
                </Card>

                {/* Automation */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Email Automation</CardTitle>
                    </div>
                    <CardDescription>Set up automated email sequences and workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Create drip campaigns with scheduled follow-ups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Trigger emails based on recipient actions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Set up welcome sequences for new subscribers</span>
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4">
                      Coming 2025
                    </Badge>
                  </CardContent>
                </Card>

                {/* API Integration */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>API & Integrations</CardTitle>
                    </div>
                    <CardDescription>Connect BulkMailer with your favorite tools and services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Database className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Integrate with CRM systems like Salesforce and HubSpot</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Database className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Connect with e-commerce platforms like Shopify and WooCommerce</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Database className="mt-1 h-5 w-5 text-muted-foreground" />
                        <span>Public API for custom integrations with your own systems</span>
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4">
                      Coming 2025
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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
      <footer className="border-t py-6 px-5">
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

