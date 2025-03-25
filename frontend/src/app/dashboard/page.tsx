/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link"
import { fetchTemplate, sendTemplate, sendContacts, sendTestMail, sendAllMail } from "@/lib/api";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { Mail, User, FileText, Settings, LogOut, Save, FileDown, Upload, Download, AlertCircle, Check, FileUp, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription,  } from "@/components/ui/alert"
import { useTemplateStore } from "@/store/templateStore";
import { useSubjectStore, useBodyStore } from "@/store/emailStore"
import { useLogStore } from "@/store/logStore";
import { useUserStore } from "@/store/userStore";
import { handleLastEdited } from "@/lib/utils";

interface Recipient{
  email:string;
  name:string;
  description?:string;
}

export default function Dashboard() {
  const [templateName, setTemplateName]= useState("");
  const templates = useTemplateStore((state) => state.templates);
  const setTemplates = useTemplateStore((state) => state.setTemplates);
  const subject = useSubjectStore((state) => state.subject);
  const body = useBodyStore((state) => state.body);
  const setSubject = useSubjectStore((state) => state.setSubject);
  const setBody = useBodyStore((state) => state.setBody);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [activeTab, setActiveTab]= useState<string>("compose");
  const loggedIn=useLogStore((state)=>state.loggedIn);
  const setLoggedIn=useLogStore((state)=>state.setLoggedIn);
  const user=useUserStore((state)=>state.user);
  let subjectIgnore:number=0;

  if(!loggedIn){
    window.location.href='/';
  }

const testMail = async()=>{
  if(!body){
    toast.error("Please enter body");
    return;
  }
  const response=await sendTestMail(subject, body, user.email);
  if(response?.message=='true'){
    toast.success("Test mail sent successfully");
  }
  else if(response?.message=='false'){
    toast.error("Error sending test mail");
  }
}

const allMail= async()=>{
  if(!body){
    toast.error("Please enter body");
    return;
  }
  if(recipients.length==0){
    toast.error("Please add some contacts first");
    return;
  }
  if(!subject && subjectIgnore==0){
    subjectIgnore++;
    toast("No subject entered. Try again if you want to send without subject", {
      icon: "ℹ️",
      style: {
        border: "1px solid #3498db",
        padding: "8px",
        color: "#3498db",
      },
    });
    return;
  }
  const to_emails=recipients.map((recipient)=>recipient.email);
  const to_names = body.includes("[name]")? recipients.map((recipient) => recipient.name):undefined;
  const response=await sendAllMail(subject, body, to_emails, to_names);
  if(response?.message=='true'){
    toast.success("Mails sent successfully");
  }
  else if(response?.message=='false'){
    toast.error("Error sending mails");
  }
}

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile)
      setUploadSuccess(false)
      e.target.value="";
    }
  }

  const handleImport = async () => {
    if (!file) return;

    setIsUploading(true);
    const selectedFile = file;
    const response=await sendContacts(selectedFile);
    if(response.message==='true'){
      setRecipients(response.contacts);
      setIsUploading(false);
      setUploadSuccess(true);
    }
    else{
      setIsUploading(false);
      toast.error(`Error uploading file: ${response.error}`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile)
      setUploadSuccess(false)
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/contacts.csv"; 
    link.download = "contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
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
    const data = await fetchTemplate();
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
      await sendTemplate(template_data);
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
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.picture.replace("=s96-c", "=s400-c")} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.name
                  .split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button onClick={()=>{setLoggedIn(false); window.location.href='/';}} variant="outline" size="sm" className="mt-2 w-full justify-start gap-2">
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                      placeholder={`Dear [name],
 
Write your email content here. You can use [name] as a placeholder that will be replaced with each recipient's name.

Best regards,
Your Name`}
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
                    <Button onClick={()=>{setActiveTab("recipients")}}>Continue</Button> 
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="recipients" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                  <CardDescription>Import your recipients from a CSV file.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>CSV Format</AlertTitle>
                    <AlertDescription>
                      Your CSV should have headers: email, name, description
                    </AlertDescription>
                  </Alert>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                      uploadSuccess ? "bg-green-50 border-green-300" : "border-gray-300 hover:border-primary/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      {uploadSuccess ? (
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileUp className="h-6 w-6 text-primary" />
                        </div>
                      )}

                      <div className="text-center">
                        {file ? (
                          <div className="flex flex-col items-center">
                            <p className="font-medium text-lg">
                              {uploadSuccess ? "File uploaded successfully!" : "File selected:"}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              <FileText className="h-4 w-4" />
                              {file.name}
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className="font-medium text-lg">Drag & drop your CSV file here</p>
                            <p className="text-sm text-muted-foreground mt-1">or click the button below to browse</p>
                          </>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {!uploadSuccess && (
                          <Label
                            htmlFor="csv-upload"
                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                          >
                            {file ? "Choose Another File" : "Browse Files"}
                          </Label>
                        )}

                        <Input
                          id="csv-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        {file && !uploadSuccess && (
                          <Button onClick={handleImport} disabled={isUploading} className="gap-2 py-5 px-2">
                            {isUploading ? (
                              <>Processing...</>
                            ) : (
                              <>
                                <Upload className="h-4 w-4" />
                                Import Recipients
                              </>
                            )}
                          </Button>
                        )}

                        {file && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setFile(null);
                              setUploadSuccess(false);
                              setRecipients([]);
                              const fileInput = document.getElementById("csv-upload") as HTMLInputElement;
                              if (fileInput) {
                                fileInput.value = "";
                              }
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button onClick={handleDownload}  variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Sample CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recipients Preview</CardTitle>
                  <CardDescription>Preview of your imported recipients.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-5">Email</div>
                      <div className="col-span-4">Name</div>
                      <div className="col-span-3">Description</div>
                    </div>
                    {recipients.slice(0,30).map((recipient, index) => (
                      <div key={index} className="grid grid-cols-12 items-center border-b px-4 py-3">
                        <div className="col-span-5">{recipient.email}</div>
                        <div className="col-span-4">{recipient.name}</div>
                        <div className="col-span-3">{recipient.description}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">Showing first {recipients.length>30?30:recipients.length} recipients</div>
                </CardContent>
                <CardContent className="flex justify-end">
                  <Button onClick={()=>{if(recipients.length>0){setActiveTab("preview")} else {toast.error("Please add some contacts first")}}}>Continue to Preview & Send</Button>
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
                    <div className="mb-2 font-semibold">Subject: {subject}</div>
                    <div className="text-sm">
                    <pre className="mt-1 text-xs h-full w-full overflow-y-auto whitespace-pre-wrap">{body}</pre>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button onClick={testMail} variant="outline">
                      Send Test Email
                    </Button>
                    <Button onClick={allMail}>Send to All Recipients</Button>
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

