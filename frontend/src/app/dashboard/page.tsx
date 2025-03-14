/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link"
import { fetchData, sendData } from "@/lib/api";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { Mail, User, FileText, Settings, LogOut, Save, FileDown, Upload, Download, AlertCircle} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription,  } from "@/components/ui/alert"
import { useTemplateStore } from "@/store/templateStore";

export default function Dashboard() {
  const [templateName, setTemplateName]= useState("");
  const templates = useTemplateStore((state) => state.templates);
  const setTemplates = useTemplateStore((state) => state.setTemplates);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function handleLastEdited(dateString: string): string {
    const date = new Date(dateString); 
    date.setMinutes(date.getMinutes() - 330); //Adjusting for IST times from GMT tims
  
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
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
      toast.error("Please enter subject and body to save the template");
      return;
    }
  
    const template_data = { "subject": subject, "body": body, "name": templateName };
    try {
      await sendData("email_template", template_data);
      fetchTemplates();
      setSubject("");
      setBody("");
      setTemplateName("");
      toast.success("Template saved successfully!", {
        duration: 2000,
        style: {
          border: '1px solid #4CAF50',
          padding: '16px',
          color: '#4CAF50',
          background: '#f0fdf4',
        },
        iconTheme: {
          primary: '#4CAF50',
          secondary: '#f0fdf4',
        },
      });
    } catch (error) {
      toast.error("Failed to save template. Please try again.");
    }
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
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Email Template</CardTitle>
                    <CardDescription>
                      Create your email template with placeholders like [name] for personalization.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FileDown className="mr-2 h-4 w-4" />
                          Load Template
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Load Template</DialogTitle>
                          <DialogDescription>Choose a template to load into the editor.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 ">
                          <div className="grid grid-cols-1 gap-4 ">
                            <div className="flex flex-col items-center justify-between rounded-md p-3 hover:bg-muted/50 cursor-pointer max-h-80 overflow-y-scroll">
                            {templates.map((template)=>{
                              return(
                                <div className="flex items-center justify-between rounded-md border p-3 w-full mb-2" key={template[0]}>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">{template[3]}</h4>
                                    <p className="text-sm text-muted-foreground">Last edited: {handleLastEdited(template[5])}</p>
                                  </div>
                                  <Button size="sm" onClick={()=>{
                                    setSubject(template[2]);
                                    setBody(template[4]);
                                  }}>Use</Button>
                                </div>
                              )
                            })}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter email subject" value={subject} onChange={handleSubjectChange}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Body</Label>
                    <Textarea
                      id="template" value={body} onChange={handleBodyChange}
                      placeholder="Dear [name],

Write your email content here. You can use [name] as a placeholder that will be replaced with each recipient's name.

Best regards,
Your Name"
                      className="min-h-[300px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Save className="mr-2 h-4 w-4" />
                        Save Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Template</DialogTitle>
                        <DialogDescription>Save this template for future use.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="template-name" className="text-right">
                            Template Name
                          </Label>
                          <Input id="template-name" value={templateName} placeholder="Leave empty if you just want it to be the subject" className="col-span-3" onChange={handleTemplateNameChange}/>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleSaveTemplate}>Save Template</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>Continue</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => {}}>Continue to Recipients</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => {}}>
                        <Save className="mr-2 h-4 w-4" />
                        Save and Continue
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="recipients" className="space-y-4 pt-4">
            <Card className="mb-6">
            <CardHeader>
              <CardTitle>Import Contacts</CardTitle>
              <CardDescription>Upload a CSV file with your contacts to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>CSV Format</AlertTitle>
                <AlertDescription>Your CSV should have headers: email, name, description (optional)</AlertDescription>
              </Alert>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="csv-file">Upload CSV</Label>
                <div className="flex items-center gap-2">
                  <Input id="csv-file" type="file" accept=".csv" className="flex-1" />
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Sample CSV
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export All Contacts
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Preview</CardTitle>
              <CardDescription>Preview of your imported contacts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-5">Email</div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-3">Description</div>
                </div>
                <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                  <div className="col-span-5">john@example.com</div>
                  <div className="col-span-4">John Doe</div>
                  <div className="col-span-3">Senior Developer</div>
                </div>
                <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                  <div className="col-span-5">jane@example.com</div>
                  <div className="col-span-4">Jane Smith</div>
                  <div className="col-span-3">Marketing Lead</div>
                </div>
                <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                  <div className="col-span-5">michael@example.com</div>
                  <div className="col-span-4">Michael Chen</div>
                  <div className="col-span-3">UX Designer</div>
                </div>
                <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                  <div className="col-span-5">emily@example.com</div>
                  <div className="col-span-4">Emily Davis</div>
                  <div className="col-span-3">Business Analyst</div>
                </div>
                <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                  <div className="col-span-5">robert@example.com</div>
                  <div className="col-span-4">Robert Williams</div>
                  <div className="col-span-3">CEO</div>
                </div>
                <div className="grid grid-cols-12 items-center px-4 py-3">
                  <div className="col-span-5">jennifer@example.com</div>
                  <div className="col-span-4">Jennifer Lee</div>
                  <div className="col-span-3">Product Manager</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">Showing 6 of 92 contacts</div>
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
                      <p>Please let me know if you can attend, and I will send you the calendar invitation.</p>
                      <br />
                      <p>
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

