import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Save, RefreshCw, Database, Bell, Shield } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-charcoal-800">
          Settings
        </h1>
        <p className="text-base text-charcoal-500">
          Configure your IATS admin panel preferences.
        </p>
      </div>

      <Card className="flat-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky/20">
              <Database className="h-4 w-4 text-charcoal-700" />
            </div>
            <CardTitle>System Configuration</CardTitle>
          </div>
          <CardDescription>Manage backend connection and data sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-charcoal-700">Backend Mode</label>
            <div className="flex gap-2">
              <Badge variant="default">Mock Data (Active)</Badge>
              <Badge variant="outline">Live API</Badge>
            </div>
            <p className="text-xs text-charcoal-500 mt-2">
              Currently using mock data. Connect to backend API for production use.
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block text-charcoal-700">API Endpoint</label>
            <Input placeholder="https://api.iats.com/v1" disabled />
          </div>

          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Test Connection
          </Button>
        </CardContent>
      </Card>

      <Card className="flat-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-lime/20">
              <Bell className="h-4 w-4 text-charcoal-700" />
            </div>
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure alert preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-cream-200 border border-charcoal-100">
            <div>
              <p className="font-medium text-charcoal-800">New Applications</p>
              <p className="text-sm text-charcoal-500">Get notified when new candidates apply</p>
            </div>
            <Badge variant="secondary">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-cream-200 border border-charcoal-100">
            <div>
              <p className="font-medium text-charcoal-800">Review Reminders</p>
              <p className="text-sm text-charcoal-500">Daily summary of pending reviews</p>
            </div>
            <Badge variant="secondary">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-cream-200 border border-charcoal-100">
            <div>
              <p className="font-medium text-charcoal-800">System Alerts</p>
              <p className="text-sm text-charcoal-500">Important system notifications</p>
            </div>
            <Badge variant="secondary">Enabled</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="flat-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange/20">
              <Shield className="h-4 w-4 text-charcoal-700" />
            </div>
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-charcoal-700">Change Password</label>
            <div className="space-y-2">
              <Input type="password" placeholder="Current password" />
              <Input type="password" placeholder="New password" />
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>

          <Button variant="default" className="gap-2">
            <Save className="h-4 w-4" />
            Update Password
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end pb-4">
        <Button size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
