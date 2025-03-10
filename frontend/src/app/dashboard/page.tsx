import Link from "next/link";
import { Mail, User, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="flex max-h-screen">
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
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary"
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
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
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b px-6">
          <h1 className="text-lg font-medium">Compose Email</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="compose" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compose">Compose</TabsTrigger>
              <TabsTrigger value="recipients">Recipients</TabsTrigger>
              <TabsTrigger value="preview">Preview & Send</TabsTrigger>
            </TabsList>
            <TabsContent value="compose" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Template</CardTitle>
                  <CardDescription>
                    Create your email template with placeholders like [name] for
                    personalization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Body</Label>
                    <Textarea
                      id="template"
                      placeholder="Dear [name],

Write your email content here. You can use [name] as a placeholder that will be replaced with each recipient's name.

Best regards,
Your Name"
                      className="min-h-[300px]"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Template</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recipients" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                  <CardDescription>
                    Add your recipients or import them from a CSV file.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline">Import CSV</Button>
                    <span className="text-sm text-muted-foreground">
                      or add recipients manually
                    </span>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-5">Email</div>
                      <div className="col-span-5">Name</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-5">john@example.com</div>
                      <div className="col-span-5">John Doe</div>
                      <div className="col-span-2 text-right">
                        <Button variant="ghost" size="sm">
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
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-5">jane@example.com</div>
                      <div className="col-span-5">Jane Smith</div>
                      <div className="col-span-2 text-right">
                        <Button variant="ghost" size="sm">
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
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-5">
                        <Input placeholder="Email" className="h-8" />
                      </div>
                      <div className="col-span-5 pl-2">
                        <Input placeholder="Name" className="h-8" />
                      </div>
                      <div className="col-span-2 text-right">
                        <Button size="sm">Add</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preview" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preview & Send</CardTitle>
                  <CardDescription>
                    Preview your email and send it to your recipients.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="mb-2 font-medium">
                      Subject: Meeting Invitation
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p>Dear John,</p>
                      <p>
                        I hope this email finds you well. I would like to invite
                        you to our upcoming team meeting scheduled for next
                        week.
                      </p>
                      <p>
                        Please let me know if you can attend, and I will send
                        you the calendar invitation.
                      </p>
                      <p>
                        Best regards,
                        <br />
                        Your Name
                      </p>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="mb-2 font-medium">Recipients (2)</div>
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span>John Doe</span>
                        <span className="text-muted-foreground">
                          john@example.com
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Jane Smith</span>
                        <span className="text-muted-foreground">
                          jane@example.com
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline">Send Test Email</Button>
                    <Button>Send to All Recipients</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
