/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link"
import { Mail, User, FileText, Settings, LogOut, Plus, Search, Trash2, Edit2, Ghost } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTemplateStore } from "@/store/templateStore";
import { fetchTemplate, deleteTemplate } from "@/lib/api";  
import { useEffect } from 'react';
import { useSubjectStore, useBodyStore } from "@/store/emailStore";
import { handleLastEdited } from "@/lib/utils";
import toast from "react-hot-toast";

interface Template{
  id: number;
  subject: string;
  name:string;
  body: string;
  last_date: string;
}

interface proTemplate{
  id: number;
  subject: string;
  body: string;
  header:string;
  description:string;
}

export default function Templates() {
  const setSubject = useSubjectStore((state) => state.setSubject);
  const setBody = useBodyStore((state) => state.setBody);
  const rawTemplates= useTemplateStore((state)=>state.templates);
  const setTemplates = useTemplateStore((state) => state.setTemplates);
  const deleteZustandTemplate = useTemplateStore((state) => state.deleteTemplate);

  const fetchDBTemplate = async () => {
    const data = await fetchTemplate();
    if (data) {
      setTemplates(data); 
    } else {
      console.error("Error fetching templates initially");
    }
  };

  const deleteDBTemplate = async (id: number) => {
    try {
      const response = await deleteTemplate(id);
      
      if (response && response.data && response.data.success) {  
        toast.success("Template deleted successfully!", {
          duration: 2000,
          style: {
            border: '1px solid #F97316', 
            padding: '16px',
            color: '#F97316', 
            background: '#FFF7ED', 
          },
          iconTheme: {
            primary: '#F97316', 
            secondary: '#FFF7ED', 
          },
        });
        
  
        await fetchDBTemplate();
      } else {
        throw new Error("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template!", {
        duration: 2000,
        style: {
          border: '1px solid #DC2626',
          padding: '16px',
          color: '#DC2626', 
          background: '#FEF2F2',
        },
        iconTheme: {
          primary: '#DC2626', 
          secondary: '#FEF2F2', 
        },
      });
    }
  };
  

  useEffect(() => {
    fetchDBTemplate();
  }, []); 

  const templates:Template[] = rawTemplates.map(template => ({
    id: template[0],
    subject: template[2],
    body: template[4],
    name: template[3],
    last_date: handleLastEdited(template[5]),
  }));

  const handleDeleteTemplate = async (id: number) => {
    deleteDBTemplate(id);
    deleteZustandTemplate(id);
    await fetchDBTemplate();
  }

  const handleCurrentTemplate=(subject:string, body:string)=>{
    setSubject(subject);
    setBody(body);
  }


  const professionalTemplates:proTemplate[]= [
    {
      "id": 1,
      "subject": "Professional Newsletter",
      "description": "Corporate communication template",
      "header": "NEWSLETTER",
      "body": "Hello [name],\nHere are the latest updates from [company]..."
    },
    {
      "id": 2,
      "subject": "Promotional Offer",
      "description": "Sales and marketing template",
      "header": "SPECIAL OFFER",
      "body": "Hi [name],\nFor a limited time, we're offering [discount]% off..."
    },
    {
      "id": 3,
      "subject": "Thank You Email",
      "description": "Customer appreciation template",
      "header": "THANK YOU",
      "body": "Dear [name],\nWe wanted to express our sincere thanks for your business..."
    },
    {
      "id": 4,
      "subject": "Feedback Request",
      "description": "Customer survey template",
      "header": "YOUR FEEDBACK",
      "body": "Hello [name],\nWe value your opinion and would love to hear your thoughts..."
    }
  ]
  

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
            <Link href='/dashboard'>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Template
              </Button>
            </Link>
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
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>Last edited: {template.last_date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs">
                        <pre className="h-full w-full overflow-y-auto break-words whitespace-pre-wrap">
                          <h3 className="font-semibold text-sm">{template.subject}</h3>
                          <br />
                          {template.body}
                        </pre>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href={`/dashboard`}>
                        <Button className="text-sm" onClick={()=>handleCurrentTemplate(template.subject, template.body)} size="sm">
                          Use
                        </Button>
                      </Link>
                      <Button onClick={()=>handleDeleteTemplate(template.id)} className="flex w-fit text-red-500 h-full space-x-2 justify-start" variant={'ghost'}>
                      <Trash2 className="h-6 w-6" />
                      Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-muted-foreground">Create New Template</CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-40 items-center justify-center">
                    <Link href='/dashboard'>
                    <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full">
                      <Plus className="h-10 w-10 text-muted-foreground" />
                      <span className="sr-only">Create new template</span>
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="gallery" className="pt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {professionalTemplates.map((template)=>{
                  return(
                    <Card key={template.id}>
                  <CardHeader className="pb-3">
                    <CardTitle>{template.subject}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 rounded-md border bg-muted/40 p-2 text-xs w-full" >
                      <div className="bg-primary/10 p-1 mb-1 text-center text-primary">{template.header}</div>
                      <pre className="mt-1 h-full w-full overflow-y-auto whitespace-pre-wrap">{template.body}</pre>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                      <Link href={`/dashboard`}>
                        <Button onClick={()=>handleCurrentTemplate(template.subject, template.body)} size="sm">
                          Use
                        </Button>
                      </Link>
                  </CardFooter>
                </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

