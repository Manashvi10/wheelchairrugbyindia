"use client";

import { Save, Upload } from "lucide-react";
import { PageHeader, Card, CardHeader, Button, Field, Input, Textarea } from "../components/ui";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account details and password."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Profile" }]}
        actions={<Button variant="primary"><Save className="w-4 h-4" /> Save Changes</Button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Personal Information" />
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Full Name"><Input defaultValue="Rajiv Kumar" /></Field>
            <Field label="Email"><Input defaultValue="admin@wrfi.org" /></Field>
            <Field label="Phone"><Input defaultValue="+91 98765 43210" /></Field>
            <Field label="Role"><Input defaultValue="Super Admin" disabled /></Field>
            <div className="md:col-span-2"><Field label="Bio"><Textarea rows={3} placeholder="Short bio..." /></Field></div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader title="Avatar" />
            <div className="p-5">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1b77a8] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">RK</div>
              <Button variant="outline" className="w-full"><Upload className="w-4 h-4" /> Change Photo</Button>
            </div>
          </Card>
          <Card>
            <CardHeader title="Change Password" />
            <div className="p-5 space-y-3">
              <Field label="Current Password"><Input type="password" /></Field>
              <Field label="New Password"><Input type="password" /></Field>
              <Field label="Confirm New Password"><Input type="password" /></Field>
              <Button variant="primary" className="w-full">Update Password</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
