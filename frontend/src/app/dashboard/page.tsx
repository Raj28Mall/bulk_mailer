"use client";
import Link from "next/link"
import { fetchData, sendData } from "@/lib/api";
import { useEffect, useState } from "react";
import { Mail, User, FileText, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useTemplateStore } from "@/store/templateStore";

export default function Dashboard() {
  const templates = useTemplateStore((state) => state.templates);
  const setTemplates = useTemplateStore((state) => state.setTemplates);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };
  
  const fetchTemplates = async () => {
    const data = await fetchData("email_template");
    if (data) {
      setTemplates(data); 
    } else {
      console.error("Error fetching templates initially");
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []); 

  const handleSaveTemplate = async () => {
    if (!subject || !body) {
      alert("Please enter subject and body to save the template");
      return;
    }

    alert(`Template saved!\nSubject: ${subject}\nBody: ${body}`);
    const template_data = { subject, body };

    await sendData("email_template", template_data);
    fetchTemplates();
    setSubject("");
    setBody("");
  };

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
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
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
          <Button variant="outline" size="sm" className="mt-2 w-full justify-start gap-2">
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
                    Create your email template with placeholders like [name] for personalization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter email subject" value={subject} onChange={handleSubjectChange}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Body</Label>
                    <Textarea
  id="template" onChange={handleBodyChange} value={body}
  placeholder={`Dear [name],

Write your email content here. You can use [name] as a placeholder that will be replaced with each recipient's name.

Best regards,
Your Name`}
  className="min-h-[300px]"
/>

                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveTemplate}>Save Template</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recipients" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                  <CardDescription>Add your recipients or import them from a CSV file.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="rounded-md border p-4">
                      <h3 className="text-sm font-medium mb-2">Use Contact Lists</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="team-list" />
                          <Label htmlFor="team-list">Team Members (24)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="clients-list" />
                          <Label htmlFor="clients-list">Clients (42)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="partners-list" />
                          <Label htmlFor="partners-list">Partners (18)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="executives-list" />
                          <Label htmlFor="executives-list">Executives (8)</Label>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <span>2 lists selected</span>
                        <span>66 recipients total</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="outline">Import CSV</Button>
                      <span className="text-sm text-muted-foreground">or add recipients manually</span>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                      <div className="font-medium">Recipients (68)</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
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
                            className="h-4 w-4 mr-1"
                          >
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                          </svg>
                          Save List
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">Email</div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-2">Source</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">john@example.com</div>
                      <div className="col-span-3">John Doe</div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          Team Members
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
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
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">jane@example.com</div>
                      <div className="col-span-3">Jane Smith</div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          Clients
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
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
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">robert@example.com</div>
                      <div className="col-span-3">Robert Williams</div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          Executives
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
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
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">michael@example.com</div>
                      <div className="col-span-3">Michael Chen</div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          Team Members
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
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
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-5">
                        <Input placeholder="Email" className="h-8" />
                      </div>
                      <div className="col-span-3 pl-2">
                        <Input placeholder="Name" className="h-8" />
                      </div>
                      <div className="col-span-2 pl-2">
                        <Badge variant="outline" className="text-xs">
                          Manual
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <Button size="sm">Add</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive/20 hover:bg-destructive/10"
                      >
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
                          className="mr-2 h-3.5 w-3.5"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                        Remove Selected
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">Showing 4 of 68 recipients</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preview" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preview & Send</CardTitle>
                  <CardDescription>Preview your email and send it to your recipients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="mb-2 font-semibold">Subject: Meeting Invitation</div>
                    <div className="prose prose-sm max-w-none">
                      <p>Dear John,</p>
                      <br />
                      <p>
                        I hope this email finds you well. I would like to invite you to our upcoming team meeting
                        scheduled for next week.
                      </p>
                      <b></b>
                      <p>Please let me know if you can attend, and I will send you the calendar invitation.</p>
                      <p>
                        <br />
                        Best regards,
                        <br />
                        Your Name
                      </p>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="mb-2 font-medium">Recipients</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Team Members
                        <span className="text-xs ml-1 text-muted-foreground">(24)</span>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Clients
                        <span className="text-xs ml-1 text-muted-foreground">(42)</span>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Manual Entries
                        <span className="text-xs ml-1 text-muted-foreground">(2)</span>
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium">Total Recipients</span>
                        <span className="text-muted-foreground">68 contacts</span>
                      </div>
                      <Button variant="link" size="sm" className="px-0 mt-1">
                        View all recipients
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="mb-2 font-medium">Sending Options</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="track-opens" defaultChecked />
                        <Label htmlFor="track-opens">Track email opens</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="track-clicks" defaultChecked />
                        <Label htmlFor="track-clicks">Track link clicks</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="schedule" />
                        <Label htmlFor="schedule">Schedule for later</Label>
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
  )
}

