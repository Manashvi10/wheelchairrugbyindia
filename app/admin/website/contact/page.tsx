"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  MessageSquare,
  MapPin,
  Share2,
  Map as MapIcon,
  HelpCircle,
  Save,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Textarea, Toggle, Badge } from "../../components/ui";

const TABS = [
  { id: "hero", label: "Page Hero", icon: ImageIcon },
  { id: "form", label: "Contact Form", icon: MessageSquare },
  { id: "details", label: "Contact Details", icon: MapPin },
  { id: "social", label: "Follow Us / Social", icon: Share2 },
  { id: "map", label: "Map Embed", icon: MapIcon },
  { id: "faq", label: "FAQ Section", icon: HelpCircle },
];

export default function ContactPageCMS() {
  const [active, setActive] = useState("hero");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Page CMS"
        subtitle="Manage every section of the public Contact page."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Website Management" },
          { label: "Contact Page" },
        ]}
        actions={
          <>
            <Button variant="outline">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button variant="primary">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Card className="p-2 h-fit lg:sticky lg:top-20">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Page Sections
          </div>
          <ul className="space-y-0.5">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setActive(t.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-saffron text-white font-semibold shadow"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                        isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate text-left">{t.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="space-y-6 min-w-0">
          {active === "hero" && <HeroSection />}
          {active === "form" && <FormSection />}
          {active === "details" && <DetailsSection />}
          {active === "social" && <SocialSection />}
          {active === "map" && <MapSection />}
          {active === "faq" && <FAQSection />}
        </div>
      </div>
    </div>
  );
}

function SectionToggleHeader({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-100">
      <div>
        <h3 className="text-base font-semibold text-navy">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge color={enabled ? "green" : "slate"}>{enabled ? "Visible" : "Hidden"}</Badge>
        <Toggle checked={enabled} onChange={onToggle} />
      </div>
    </div>
  );
}

/* ────────────────────────────────  SECTIONS  ──────────────────────────────── */

function HeroSection() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Card>
      <SectionToggleHeader
        title="Page Hero"
        description="Top banner of the Contact Us page."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Eyebrow Label">
          <Input defaultValue="Reach Out" />
        </Field>
        <Field label="Hero Title" required>
          <Input defaultValue="Contact Us" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea
              rows={3}
              defaultValue="Have questions? Want to volunteer, start a team, or partner with us? We'd love to hear from you."
            />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function FormSection() {
  const [enabled, setEnabled] = useState(true);
  const [subjects, setSubjects] = useState([
    { value: "general", label: "General Inquiry" },
    { value: "join", label: "Join / Register as Athlete" },
    { value: "volunteer", label: "Volunteer" },
    { value: "sponsor", label: "Sponsorship / Partnership" },
    { value: "event", label: "Event Information" },
    { value: "media", label: "Media / Press" },
    { value: "other", label: "Other" },
  ]);
  return (
    <Card>
      <SectionToggleHeader
        title="Contact Form"
        description='"Send Us a Message" form — heading, helper text, subject options and submission settings.'
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Form Title" required>
          <Input defaultValue="Send Us a Message" />
        </Field>
        <Field label="Submit Button Text">
          <Input defaultValue="Send Message" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Helper Text">
            <Textarea
              rows={2}
              defaultValue="Fill out the form below and our team will get back to you within 24–48 hours."
            />
          </Field>
        </div>
        <Field label="Recipient Email">
          <Input defaultValue="wcrfi.india@gmail.com" />
        </Field>
        <Field label="Auto-Reply Subject">
          <Input defaultValue="We received your message – WRFI" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Auto-Reply Message">
            <Textarea
              rows={3}
              defaultValue="Thanks for reaching out to WRFI. Our team will review your message and respond within 24–48 hours."
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">Subject Dropdown Options</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSubjects([...subjects, { value: "new", label: "New Subject" }])}
            >
              <Plus className="w-3.5 h-3.5" /> Add Subject
            </Button>
          </div>
          <div className="space-y-2">
            {subjects.map((s, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-300 cursor-grab shrink-0" />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Value (key)">
                    <Input defaultValue={s.value} />
                  </Field>
                  <Field label="Label">
                    <Input defaultValue={s.label} />
                  </Field>
                </div>
                <button
                  onClick={() => setSubjects(subjects.filter((_, j) => j !== i))}
                  className="p-2 text-slate-400 hover:text-red-600 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function DetailsSection() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Card>
      <SectionToggleHeader
        title="Contact Details"
        description="Address, phone, email and office hours block on the right sidebar."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Block Heading">
          <Input defaultValue="Contact Details" />
        </Field>
        <Field label="Office Hours Label">
          <Input defaultValue="Office Hours" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Address (multi-line)" required>
            <Textarea
              rows={3}
              defaultValue={"House no 53 shivlok phase 4\nKhajurikalan Piplani Bhopal Madhya Pradesh 462022"}
            />
          </Field>
        </div>
        <Field label="Phone" required>
          <Input defaultValue="+91 7223051792" />
        </Field>
        <Field label="Phone Link (tel:)">
          <Input defaultValue="tel:+917223051792" />
        </Field>
        <Field label="Email" required>
          <Input defaultValue="wcrfi.india@gmail.com" />
        </Field>
        <Field label="Email Link (mailto:)">
          <Input defaultValue="mailto:wcrfi.india@gmail.com" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Office Hours">
            <Input defaultValue="Mon – Fri: 10:00 AM – 5:00 PM IST" />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function SocialSection() {
  const [enabled, setEnabled] = useState(true);
  const [socials, setSocials] = useState([
    { platform: "Facebook", url: "https://www.facebook.com/WCRFI/" },
    { platform: "Twitter", url: "https://x.com/rugby_india" },
    { platform: "Instagram", url: "https://www.instagram.com/wcrugby_india/" },
    { platform: "YouTube", url: "https://www.youtube.com/@WheelchairRugbyIndia" },
  ]);
  return (
    <Card>
      <SectionToggleHeader
        title='"Follow Us" Block'
        description="Social media links shown in the right sidebar."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Block Heading">
            <Input defaultValue="Follow Us" />
          </Field>
          <Field label="Block Subtitle">
            <Input defaultValue="Stay connected for the latest updates, events, and stories." />
          </Field>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{socials.length} social links</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSocials([...socials, { platform: "New", url: "https://" }])}
          >
            <Plus className="w-3.5 h-3.5" /> Add Social
          </Button>
        </div>
        <div className="space-y-2">
          {socials.map((s, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-slate-300 cursor-grab shrink-0" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3">
                <Field label="Platform">
                  <Input defaultValue={s.platform} />
                </Field>
                <Field label="URL">
                  <Input defaultValue={s.url} />
                </Field>
              </div>
              <div className="flex flex-col">
                <button className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
              </div>
              <button
                onClick={() => setSocials(socials.filter((_, j) => j !== i))}
                className="p-2 text-slate-400 hover:text-red-600 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function MapSection() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Card>
      <SectionToggleHeader
        title="Map Embed"
        description="Google Maps iframe shown below the social block."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <Field label="Map Title (for accessibility)">
          <Input defaultValue="WRFI Office Location" />
        </Field>
        <Field label="Google Maps Embed URL" required hint="Use the iframe src from Google Maps > Share > Embed a map">
          <Textarea
            rows={3}
            defaultValue="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3!2d77.4!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
          />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label='"Open in Maps" Link Text'>
            <Input defaultValue="Open in Maps" />
          </Field>
          <Field label='"Open in Maps" URL'>
            <Input defaultValue="https://maps.google.com/?q=WRFI+Bhopal" />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function FAQSection() {
  const [enabled, setEnabled] = useState(true);
  const [items, setItems] = useState([
    { q: "How can I join WRFI as an athlete?", a: "Fill out the contact form above with your details, or email us at wcrfi.india@gmail.com. We welcome athletes with physical disabilities from all states of India." },
    { q: "Does WRFI provide equipment and wheelchairs?", a: "Yes, WRFI provides rugby-specific wheelchairs and equipment to registered athletes through our equipment support programs." },
    { q: "How can I volunteer or support WRFI?", a: "We're always looking for volunteers, coaches, and supporters. Reach out through the contact form or email us to learn about opportunities." },
    { q: "How can my organization sponsor or partner with WRFI?", a: "We offer multiple sponsorship and partnership tiers. Contact us with the 'Sponsorship / Partnership' subject for detailed information." },
  ]);
  return (
    <Card>
      <SectionToggleHeader
        title="Frequently Asked Questions"
        description="Accordion of common questions shown at the bottom of the page."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <Field label="Section Title">
          <Input defaultValue="Frequently Asked Questions" />
        </Field>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{items.length} FAQs</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setItems([...items, { q: "New question", a: "Answer..." }])}
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </Button>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="slate">FAQ #{i + 1}</Badge>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button
                    onClick={() => setItems(items.filter((_, j) => j !== i))}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <Field label="Question" required>
                <Input defaultValue={it.q} />
              </Field>
              <Field label="Answer">
                <Textarea rows={3} defaultValue={it.a} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
