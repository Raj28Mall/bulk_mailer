import Link from "next/link"
import { Mail, User, FileText, Settings, LogOut, Plus, Search, Filter, Download, Upload, MoreHorizontal, Tag,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function Contacts() {
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
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary"
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
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-medium">Contacts</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contacts..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                  <DialogDescription>Add a new contact to your address book.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Full name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" placeholder="Email address" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input id="description" placeholder="Optional description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lists" className="text-right">
                      Add to Lists
                    </Label>
                    <div className="col-span-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Checkbox id="team" className="h-3 w-3" />
                        <Label htmlFor="team" className="text-xs">
                          Team Members
                        </Label>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Checkbox id="clients" className="h-3 w-3" />
                        <Label htmlFor="clients" className="text-xs">
                          Clients
                        </Label>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Checkbox id="partners" className="h-3 w-3" />
                        <Label htmlFor="partners" className="text-xs">
                          Partners
                        </Label>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Checkbox id="executives" className="h-3 w-3" />
                        <Label htmlFor="executives" className="text-xs">
                          Executives
                        </Label>
                      </Badge>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Contact</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue placeholder="Select list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="team">Team Members</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="partners">Partners</SelectItem>
                  <SelectItem value="executives">Executives</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Upload className="h-3.5 w-3.5" />
                <span>Import</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Manage Lists</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manage Contact Lists</DialogTitle>
                    <DialogDescription>
                      Create and manage your contact lists to organize your contacts.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="font-medium">Team Members</div>
                        <div className="text-sm text-muted-foreground">24 contacts</div>
                      </div>
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="font-medium">Clients</div>
                        <div className="text-sm text-muted-foreground">42 contacts</div>
                      </div>
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="font-medium">Partners</div>
                        <div className="text-sm text-muted-foreground">18 contacts</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="font-medium">Executives</div>
                        <div className="text-sm text-muted-foreground">8 contacts</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="New list name" />
                      <Button>Add List</Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between bg-muted/50 rounded-md p-2 border" id="bulk-actions">
            <div className="text-sm">3 contacts selected</div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Tag className="mr-2 h-3.5 w-3.5" />
                    Add to List
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add to List</DialogTitle>
                    <DialogDescription>Add selected contacts to one or more lists.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="team-list" />
                        <Label htmlFor="team-list">Team Members</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="clients-list" />
                        <Label htmlFor="clients-list">Clients</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="partners-list" />
                        <Label htmlFor="partners-list">Partners</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="executives-list" />
                        <Label htmlFor="executives-list">Executives</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add to Selected Lists</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                variant="outline"
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
                Delete Selected
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Contacts</TabsTrigger>
              <TabsTrigger value="team">Team Members</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="executives">Executives</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-2">Description</div>
                      <div className="col-span-1">Lists</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">John Smith</div>
                      <div className="col-span-4">john.smith@example.com</div>
                      <div className="col-span-2">Senior Developer</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          Team
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Sarah Johnson</div>
                      <div className="col-span-4">sarah.j@example.com</div>
                      <div className="col-span-2">Marketing Lead</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          Clients
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Michael Chen</div>
                      <div className="col-span-4">michael.c@example.com</div>
                      <div className="col-span-2">UX Designer</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          Team
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Emily Davis</div>
                      <div className="col-span-4">emily.d@example.com</div>
                      <div className="col-span-2">Business Analyst</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          Partners
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Robert Williams</div>
                      <div className="col-span-4">robert.w@example.com</div>
                      <div className="col-span-2">CEO</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          Executives
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Jennifer Lee</div>
                      <div className="col-span-4">jennifer.l@example.com</div>
                      <div className="col-span-2">Product Manager</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          Clients
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">Showing 6 of 92 contacts</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="team" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team members contact list.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-3">Description</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">John Smith</div>
                      <div className="col-span-4">john.smith@example.com</div>
                      <div className="col-span-3">Senior Developer</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Michael Chen</div>
                      <div className="col-span-4">michael.c@example.com</div>
                      <div className="col-span-3">UX Designer</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Lisa Wong</div>
                      <div className="col-span-4">lisa.w@example.com</div>
                      <div className="col-span-3">Frontend Developer</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">David Kim</div>
                      <div className="col-span-4">david.k@example.com</div>
                      <div className="col-span-3">Backend Developer</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Rachel Green</div>
                      <div className="col-span-4">rachel.g@example.com</div>
                      <div className="col-span-3">Project Manager</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Alex Thompson</div>
                      <div className="col-span-4">alex.t@example.com</div>
                      <div className="col-span-3">QA Engineer</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">Showing 6 of 24 team members</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="clients" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clients</CardTitle>
                  <CardDescription>Manage your clients contact list.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-3">Description</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Sarah Johnson</div>
                      <div className="col-span-4">sarah.j@example.com</div>
                      <div className="col-span-3">Marketing Lead</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Jennifer Lee</div>
                      <div className="col-span-4">jennifer.l@example.com</div>
                      <div className="col-span-3">Product Manager</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Mark Wilson</div>
                      <div className="col-span-4">mark.w@example.com</div>
                      <div className="col-span-3">Sales Director</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Jessica Brown</div>
                      <div className="col-span-4">jessica.b@example.com</div>
                      <div className="col-span-3">CTO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Thomas Clark</div>
                      <div className="col-span-4">thomas.c@example.com</div>
                      <div className="col-span-3">Marketing Manager</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Amanda Lewis</div>
                      <div className="col-span-4">amanda.l@example.com</div>
                      <div className="col-span-3">Operations Director</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">Showing 6 of 42 clients</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="partners" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Partners</CardTitle>
                  <CardDescription>Manage your partners contact list.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-3">Description</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Emily Davis</div>
                      <div className="col-span-4">emily.d@example.com</div>
                      <div className="col-span-3">Business Analyst</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">James Miller</div>
                      <div className="col-span-4">james.m@example.com</div>
                      <div className="col-span-3">Integration Specialist</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Sophia Martinez</div>
                      <div className="col-span-4">sophia.m@example.com</div>
                      <div className="col-span-3">API Developer</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Daniel Taylor</div>
                      <div className="col-span-4">daniel.t@example.com</div>
                      <div className="col-span-3">Solutions Architect</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Olivia Wilson</div>
                      <div className="col-span-4">olivia.w@example.com</div>
                      <div className="col-span-3">Strategic Partner</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">William Anderson</div>
                      <div className="col-span-4">william.a@example.com</div>
                      <div className="col-span-3">Channel Manager</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">Showing 6 of 18 partners</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="executives" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Executives</CardTitle>
                  <CardDescription>Manage your executives contact list.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-3">Description</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Robert Williams</div>
                      <div className="col-span-4">robert.w@example.com</div>
                      <div className="col-span-3">CEO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Patricia Johnson</div>
                      <div className="col-span-4">patricia.j@example.com</div>
                      <div className="col-span-3">CFO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Michael Rodriguez</div>
                      <div className="col-span-4">michael.r@example.com</div>
                      <div className="col-span-3">CTO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Elizabeth Chen</div>
                      <div className="col-span-4">elizabeth.c@example.com</div>
                      <div className="col-span-3">COO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">James Thompson</div>
                      <div className="col-span-4">james.t@example.com</div>
                      <div className="col-span-3">CMO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-3">Sarah Davis</div>
                      <div className="col-span-4">sarah.d@example.com</div>
                      <div className="col-span-3">CHRO</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">Showing 6 of 8 executives</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

