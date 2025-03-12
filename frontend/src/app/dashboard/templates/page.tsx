"use client";
import Link from "next/link"
import { Mail, User, FileText, Settings, LogOut, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTemplateStore } from "@/store/templateStore";

interface Template{
  id: number | string;
  subject: string;
  body: string;
  last_date: string;
}

export default function Templates() {
  function handleLastEdited(dateString: string): string {
    const date = new Date(dateString); 
    date.setMinutes(date.getMinutes() - 330); //Adjusting for IST times
  
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }

  const rawTemplates= useTemplateStore((state)=>state.templates);
  const templates:Template[] = rawTemplates.map(template => ({
    id: template[0],
    subject: template[2],
    body: template[3],
    last_date: handleLastEdited(template[4]),
  }));

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <span className="text-xl font-semibold">BulkMailer</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>Compose</span>
            </Link>
            <Link
              href="/dashboard/contacts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <User className="h-4 w-4" />
              <span>Contacts</span>
            </Link>
            <Link
              href="/dashboard/templates"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary"
            >
              <FileText className="h-4 w-4" />
              <span>Templates</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-2 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-2 w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-medium">Email Templates</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search templates..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="my-templates">
            <TabsList>
              <TabsTrigger value="my-templates">My Templates</TabsTrigger>
              <TabsTrigger value="gallery">Template Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="my-templates" className="pt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-3">
                      <CardTitle>{template.subject}</CardTitle>
                      <CardDescription>Last edited: {template.last_date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs">
                        <p>{template.body}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Use
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-muted-foreground">Create New Template</CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-40 items-center justify-center">
                    <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full">
                      <Plus className="h-10 w-10 text-muted-foreground" />
                      <span className="sr-only">Create new template</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="gallery" className="pt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Professional Newsletter</CardTitle>
                    <CardDescription>Corporate communication template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs">
                      <div className="bg-primary/10 p-1 mb-1 text-center text-primary">NEWSLETTER</div>
                      <p className="mt-1">Hello [name],</p>
                      <p className="mt-1">Here are the latest updates from [company]...</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button size="sm">Use Template</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Promotional Offer</CardTitle>
                    <CardDescription>Sales and marketing template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs">
                      <div className="bg-primary/10 p-1 mb-1 text-center text-primary">SPECIAL OFFER</div>
                      <p className="mt-1">Hi [name],</p>
                      <p className="mt-1">For a limited time, we&apos;re offering [discount]% off...</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button size="sm">Use Template</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Thank You Email</CardTitle>
                    <CardDescription>Customer appreciation template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs">
                      <div className="bg-primary/10 p-1 mb-1 text-center text-primary">THANK YOU</div>
                      <p className="mt-1">Dear [name],</p>
                      <p className="mt-1">We wanted to express our sincere thanks for your business...</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button size="sm">Use Template</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Feedback Request</CardTitle>
                    <CardDescription>Customer survey template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs">
                      <div className="bg-primary/10 p-1 mb-1 text-center text-primary">YOUR FEEDBACK</div>
                      <p className="mt-1">Hello [name],</p>
                      <p className="mt-1">We value your opinion and would love to hear your thoughts...</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button size="sm">Use Template</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

