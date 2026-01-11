import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Users, CreditCard, DollarSign, Search, Settings, LogOut, LayoutDashboard, Mail } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Link } from "wouter";

type Tab = 'users' | 'configuration' | 'email';

export default function AdminPage() {
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('users');

    if (!currentUser?.isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-orange-600" />
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Button
                        variant={activeTab === 'users' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('users')}
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Users Directory
                    </Button>
                    <Button
                        variant={activeTab === 'configuration' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('configuration')}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Configuration
                    </Button>
                    <Button
                        variant={activeTab === 'email' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('email')}
                    >
                        <Mail className="mr-2 h-4 w-4" />
                        Email Settings
                    </Button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/">
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                            <LogOut className="mr-2 h-4 w-4" />
                            Exit to Site
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'users' && <UsersView />}
                    {activeTab === 'configuration' && <ConfigurationView />}
                    {activeTab === 'email' && <EmailSettingsView />}
                </div>
            </main>
        </div>
    );
}

function UsersView() {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: users, isLoading } = useQuery<User[]>({
        queryKey: ["/api/admin/users"],
    });

    const { data: priceSetting } = useQuery<{ value: string }>({
        queryKey: ["/api/admin/settings/subscription_price"],
    });

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />;

    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const totalUsers = users?.length || 0;
    const paidUsers = users?.filter(u => u.subscriptionStatus === 'active' || u.subscriptionStatus === 'lifetime').length || 0;
    const currentPrice = priceSetting?.value || "0";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Users Directory</h2>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Paid Members</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{paidUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Price</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${currentPrice}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>Manage and view user details.</CardDescription>
                    <div className="mt-4">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Paid Amount</TableHead>
                                    <TableHead>Paid On</TableHead>
                                    <TableHead className="text-right">Admin</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.username}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={user.subscriptionStatus === 'active' || user.subscriptionStatus === 'lifetime' ? "default" : "secondary"}
                                                    className={user.subscriptionStatus === 'active' || user.subscriptionStatus === 'lifetime' ? "bg-green-600 hover:bg-green-700" : ""}
                                                >
                                                    {user.subscriptionStatus || 'free'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {user.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">
                                                {user.amountPaid ? `$${(user.amountPaid / 100).toFixed(2)}` : '-'}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {user.paymentDate ? format(new Date(user.paymentDate), 'MMM d, yyyy h:mm a') : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {user.isAdmin ? (
                                                    <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">Admin</Badge>
                                                ) : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ConfigurationView() {
    const { toast } = useToast();
    const [priceInput, setPriceInput] = useState("");
    const [stripeSecretKey, setStripeSecretKey] = useState("");
    const [stripePublishableKey, setStripePublishableKey] = useState("");

    const { data: priceSetting } = useQuery<{ value: string }>({
        queryKey: ["/api/admin/settings/subscription_price"],
    });

    const currentPrice = priceSetting?.value || "0";

    const updateSettingMutation = useMutation({
        mutationFn: async ({ key, value }: { key: string, value: string }) => {
            const res = await apiRequest("POST", "/api/admin/settings", { key, value });
            return res.json();
        },
        onSuccess: (_, variables) => {
            if (variables.key === "subscription_price") {
                queryClient.invalidateQueries({ queryKey: ["/api/admin/settings/subscription_price"] });
            }
            toast({
                title: "Settings updated",
                description: "Configuration has been saved successfully.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Subscription Pricing
                        </CardTitle>
                        <CardDescription>
                            Current Price: <strong>${currentPrice}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">New Price ($)</label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder={currentPrice}
                                    value={priceInput}
                                    onChange={(e) => setPriceInput(e.target.value)}
                                />
                                <Button
                                    onClick={() => updateSettingMutation.mutate({ key: "subscription_price", value: priceInput })}
                                    disabled={updateSettingMutation.isPending || !priceInput}
                                >
                                    {updateSettingMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Stripe charge amount dynamically updates with this value.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Stripe Configuration
                        </CardTitle>
                        <CardDescription>
                            Manage API keys for payment processing
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Publishable Key</label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="pk_test_..."
                                    value={stripePublishableKey}
                                    onChange={(e) => setStripePublishableKey(e.target.value)}
                                />
                                <Button
                                    onClick={() => updateSettingMutation.mutate({ key: "stripe_publishable_key", value: stripePublishableKey })}
                                    disabled={updateSettingMutation.isPending || !stripePublishableKey}
                                >
                                    {updateSettingMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Secret Key</label>
                            <div className="flex gap-2">
                                <Input
                                    type="password"
                                    placeholder="sk_test_..."
                                    value={stripeSecretKey}
                                    onChange={(e) => setStripeSecretKey(e.target.value)}
                                />
                                <Button
                                    onClick={() => updateSettingMutation.mutate({ key: "stripe_secret_key", value: stripeSecretKey })}
                                    disabled={updateSettingMutation.isPending || !stripeSecretKey}
                                >
                                    {updateSettingMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function EmailSettingsView() {
    const { toast } = useToast();
    const [gmailUser, setGmailUser] = useState("");
    const [gmailAppPassword, setGmailAppPassword] = useState("");

    const updateSettingMutation = useMutation({
        mutationFn: async ({ key, value }: { key: string, value: string }) => {
            const res = await apiRequest("POST", "/api/admin/settings", { key, value });
            return res.json();
        },
        onSuccess: () => {
            toast({
                title: "Settings updated",
                description: "Email configuration saved successfully.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Email Settings</h2>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Gmail Configuration
                    </CardTitle>
                    <CardDescription>
                        Configure the sender email account for automated messages.
                        <br />
                        <span className="text-yellow-600 font-medium">Important: Use a Google App Password, not your login password.</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Gmail Address</label>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="your-email@gmail.com"
                                value={gmailUser}
                                onChange={(e) => setGmailUser(e.target.value)}
                            />
                            <Button
                                onClick={() => updateSettingMutation.mutate({ key: "gmail_user", value: gmailUser })}
                                disabled={updateSettingMutation.isPending || !gmailUser}
                            >
                                {updateSettingMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Google App Password</label>
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder="xxxx xxxx xxxx xxxx"
                                value={gmailAppPassword}
                                onChange={(e) => setGmailAppPassword(e.target.value)}
                            />
                            <Button
                                onClick={() => updateSettingMutation.mutate({ key: "gmail_app_password", value: gmailAppPassword })}
                                disabled={updateSettingMutation.isPending || !gmailAppPassword}
                            >
                                {updateSettingMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Generate this in your Google Account Security settings under "2-Step Verification" {'>'} "App Passwords".
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
