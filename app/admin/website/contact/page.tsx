"use client";

import { useState, useEffect } from "react";
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

export interface HeroData { eyebrow: string; title: string; description: string; enabled: boolean; }
export interface FormData {
  title: string; helper: string; submit_text: string; recipient_email: string;
  reply_subject: string; reply_message: string; subjects: { value: string; label: string }[];
  enabled: boolean;
}
export interface DetailsData {
  heading: string; hours_label: string; address: string; phone: string; phone_link: string;
  email: string; email_link: string; office_hours: string; enabled: boolean;
}
export interface SocialData {
  heading: string; subtitle: string; links: { platform: string; url: string }[]; enabled: boolean;
}
export interface MapData {
  title: string; embed_url: string; link_text: string; link_url: string; enabled: boolean;
}
export interface FAQItem { q: string; a: string; }
export interface FAQData { title: string; items: FAQItem[]; enabled: boolean; }

const DEFAULT_HERO: HeroData = {
  eyebrow: "Reach Out",
  title: "Contact Us",
  description: "Have questions? Want to volunteer, start a team, or partner with us? We'd love to hear from you.",
  enabled: true,
};
const DEFAULT_FORM: FormData = {
  title: "Send Us a Message",
  helper: "Fill out the form below and our team will get back to you within 24–48 hours.",
  submit_text: "Send Message",
  recipient_email: "wcrfi.india@gmail.com",
  reply_subject: "We received your message – WRFI",
  reply_message: "Thanks for reaching out to WRFI. Our team will review your message and respond within 24–48 hours.",
  subjects: [
    { value: "general", label: "General Inquiry" },
    { value: "join", label: "Join / Register as Athlete" },
    { value: "volunteer", label: "Volunteer" },
    { value: "sponsor", label: "Sponsorship / Partnership" },
    { value: "event", label: "Event Information" },
    { value: "media", label: "Media / Press" },
    { value: "other", label: "Other" },
  ],
  enabled: true,
};
const DEFAULT_DETAILS: DetailsData = {
  heading: "Contact Details",
  hours_label: "Office Hours",
  address: "House no 53 shivlok phase 4\nKhajurikalan Piplani Bhopal Madhya Pradesh 462022",
  phone: "+91 7223051792",
  phone_link: "tel:+917223051792",
  email: "wcrfi.india@gmail.com",
  email_link: "mailto:wcrfi.india@gmail.com",
  office_hours: "Mon – Fri: 10:00 AM – 5:00 PM IST",
  enabled: true,
};
const DEFAULT_SOCIAL: SocialData = {
  heading: "Follow Us",
  subtitle: "Stay connected for the latest updates, events, and stories.",
  links: [
    { platform: "Facebook", url: "https://www.facebook.com/WCRFI/" },
    { platform: "Twitter", url: "https://x.com/rugby_india" },
    { platform: "Instagram", url: "https://www.instagram.com/wcrugby_india/" },
    { platform: "YouTube", url: "https://www.youtube.com/@WheelchairRugbyIndia" },
  ],
  enabled: true,
};
const DEFAULT_MAP: MapData = {
  title: "WRFI Office Location",
  embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3!2d77.4!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin",
  link_text: "Open in Maps",
  link_url: "https://maps.google.com/?q=WRFI+Bhopal",
  enabled: true,
};
const DEFAULT_FAQ: FAQData = {
  title: "Frequently Asked Questions",
  items: [
    { q: "How can I join WRFI as an athlete?", a: "Fill out the contact form above with your details, or email us at wcrfi.india@gmail.com. We welcome athletes with physical disabilities from all states of India." },
    { q: "Does WRFI provide equipment and wheelchairs?", a: "Yes, WRFI provides rugby-specific wheelchairs and equipment to registered athletes through our equipment support programs." },
    { q: "How can I volunteer or support WRFI?", a: "We're always looking for volunteers, coaches, and supporters. Reach out through the contact form or email us to learn about opportunities." },
    { q: "How can my organization sponsor or partner with WRFI?", a: "We offer multiple sponsorship and partnership tiers. Contact us with the 'Sponsorship / Partnership' subject for detailed information." },
  ],
  enabled: true,
};

export default function ContactPageCMS() {
  const [active, setActive] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO);
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [details, setDetails] = useState<DetailsData>(DEFAULT_DETAILS);
  const [social, setSocial] = useState<SocialData>(DEFAULT_SOCIAL);
  const [mapData, setMapData] = useState<MapData>(DEFAULT_MAP);
  const [faq, setFaq] = useState<FAQData>(DEFAULT_FAQ);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/contact-sections");
        const { sections } = await res.json();
        if (sections) {
          if (sections.hero?.data) setHero(sections.hero.data as HeroData);
          if (sections.form?.data) setForm(sections.form.data as FormData);
          if (sections.details?.data) setDetails(sections.details.data as DetailsData);
          if (sections.social?.data) setSocial(sections.social.data as SocialData);
          if (sections.map?.data) setMapData(sections.map.data as MapData);
          if (sections.faq?.data) setFaq(sections.faq.data as FAQData);
        }
      } catch (e) {
        console.error("Failed to load contact sections:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    try {
      const payloads: { section_key: string; data: unknown; is_enabled: boolean }[] = [
        { section_key: "hero", data: hero, is_enabled: hero.enabled },
        { section_key: "form", data: form, is_enabled: form.enabled },
        { section_key: "details", data: details, is_enabled: details.enabled },
        { section_key: "social", data: social, is_enabled: social.enabled },
        { section_key: "map", data: mapData, is_enabled: mapData.enabled },
        { section_key: "faq", data: faq, is_enabled: faq.enabled },
      ];
      for (const p of payloads) {
        await fetch("/api/contact-sections", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
      }
      alert("Changes saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

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
            <Button variant="primary" onClick={saveAll} disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
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
          {active === "hero" && <HeroSection data={hero} setData={setHero} />}
          {active === "form" && <FormSection data={form} setData={setForm} />}
          {active === "details" && <DetailsSection data={details} setData={setDetails} />}
          {active === "social" && <SocialSection data={social} setData={setSocial} />}
          {active === "map" && <MapSection data={mapData} setData={setMapData} />}
          {active === "faq" && <FAQSection data={faq} setData={setFaq} />}
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

function HeroSection({ data, setData }: { data: HeroData; setData: (d: HeroData) => void }) {
  return (
    <Card>
      <SectionToggleHeader
        title="Page Hero"
        description="Top banner of the Contact Us page."
        enabled={data.enabled}
        onToggle={(v) => setData({ ...data, enabled: v })}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Eyebrow Label">
          <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
        </Field>
        <Field label="Hero Title" required>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea rows={3} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function FormSection({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  const updateSubject = (i: number, field: "value" | "label", val: string) => {
    const subjects = data.subjects.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, subjects });
  };
  return (
    <Card>
      <SectionToggleHeader
        title="Contact Form"
        description='"Send Us a Message" form — heading, helper text, subject options and submission settings.'
        enabled={data.enabled}
        onToggle={(v) => setData({ ...data, enabled: v })}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Form Title" required>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </Field>
        <Field label="Submit Button Text">
          <Input value={data.submit_text} onChange={(e) => setData({ ...data, submit_text: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Helper Text">
            <Textarea rows={2} value={data.helper} onChange={(e) => setData({ ...data, helper: e.target.value })} />
          </Field>
        </div>
        <Field label="Recipient Email">
          <Input value={data.recipient_email} onChange={(e) => setData({ ...data, recipient_email: e.target.value })} />
        </Field>
        <Field label="Auto-Reply Subject">
          <Input value={data.reply_subject} onChange={(e) => setData({ ...data, reply_subject: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Auto-Reply Message">
            <Textarea rows={3} value={data.reply_message} onChange={(e) => setData({ ...data, reply_message: e.target.value })} />
          </Field>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">Subject Dropdown Options</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setData({ ...data, subjects: [...data.subjects, { value: "new", label: "New Subject" }] })}
            >
              <Plus className="w-3.5 h-3.5" /> Add Subject
            </Button>
          </div>
          <div className="space-y-2">
            {data.subjects.map((s, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-300 cursor-grab shrink-0" />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Value (key)">
                    <Input value={s.value} onChange={(e) => updateSubject(i, "value", e.target.value)} />
                  </Field>
                  <Field label="Label">
                    <Input value={s.label} onChange={(e) => updateSubject(i, "label", e.target.value)} />
                  </Field>
                </div>
                <button
                  onClick={() => setData({ ...data, subjects: data.subjects.filter((_, j) => j !== i) })}
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

function DetailsSection({ data, setData }: { data: DetailsData; setData: (d: DetailsData) => void }) {
  return (
    <Card>
      <SectionToggleHeader
        title="Contact Details"
        description="Address, phone, email and office hours block on the right sidebar."
        enabled={data.enabled}
        onToggle={(v) => setData({ ...data, enabled: v })}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Block Heading">
          <Input value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
        </Field>
        <Field label="Office Hours Label">
          <Input value={data.hours_label} onChange={(e) => setData({ ...data, hours_label: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Address (multi-line)" required>
            <Textarea rows={3} value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          </Field>
        </div>
        <Field label="Phone" required>
          <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </Field>
        <Field label="Phone Link (tel:)">
          <Input value={data.phone_link} onChange={(e) => setData({ ...data, phone_link: e.target.value })} />
        </Field>
        <Field label="Email" required>
          <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        </Field>
        <Field label="Email Link (mailto:)">
          <Input value={data.email_link} onChange={(e) => setData({ ...data, email_link: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Office Hours">
            <Input value={data.office_hours} onChange={(e) => setData({ ...data, office_hours: e.target.value })} />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function SocialSection({ data, setData }: { data: SocialData; setData: (d: SocialData) => void }) {
  const updateLink = (i: number, field: "platform" | "url", val: string) => {
    const links = data.links.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, links });
  };
  const move = (i: number, dir: -1 | 1) => {
    const arr = [...data.links];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setData({ ...data, links: arr });
  };
  return (
    <Card>
      <SectionToggleHeader
        title='"Follow Us" Block'
        description="Social media links shown in the right sidebar."
        enabled={data.enabled}
        onToggle={(v) => setData({ ...data, enabled: v })}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Block Heading">
            <Input value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
          </Field>
          <Field label="Block Subtitle">
            <Input value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
          </Field>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{data.links.length} social links</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setData({ ...data, links: [...data.links, { platform: "New", url: "https://" }] })}
          >
            <Plus className="w-3.5 h-3.5" /> Add Social
          </Button>
        </div>
        <div className="space-y-2">
          {data.links.map((s, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-slate-300 cursor-grab shrink-0" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3">
                <Field label="Platform">
                  <Input value={s.platform} onChange={(e) => updateLink(i, "platform", e.target.value)} />
                </Field>
                <Field label="URL">
                  <Input value={s.url} onChange={(e) => updateLink(i, "url", e.target.value)} />
                </Field>
              </div>
              <div className="flex flex-col">
                <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
              </div>
              <button
                onClick={() => setData({ ...data, links: data.links.filter((_, j) => j !== i) })}
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

function MapSection({ data, setData }: { data: MapData; setData: (d: MapData) => void }) {
  return (
    <Card>
      <SectionToggleHeader
        title="Map Embed"
        description="Google Maps iframe shown below the social block."
        enabled={data.enabled}
        onToggle={(v) => setData({ ...data, enabled: v })}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <Field label="Map Title (for accessibility)">
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </Field>
        <Field label="Google Maps Embed URL" required hint="Use the iframe src from Google Maps > Share > Embed a map">
          <Textarea rows={3} value={data.embed_url} onChange={(e) => setData({ ...data, embed_url: e.target.value })} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label='"Open in Maps" Link Text'>
            <Input value={data.link_text} onChange={(e) => setData({ ...data, link_text: e.target.value })} />
          </Field>
          <Field label='"Open in Maps" URL'>
            <Input value={data.link_url} onChange={(e) => setData({ ...data, link_url: e.target.value })} />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function FAQSection({ data, setData }: { data: FAQData; setData: (d: FAQData) => void }) {
  const update = (i: number, field: "q" | "a", val: string) => {
    const items = data.items.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, items });
  };
  const move = (i: number, dir: -1 | 1) => {
    const arr = [...data.items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setData({ ...data, items: arr });
  };
  return (
    <Card>
      <SectionToggleHeader
        title="Frequently Asked Questions"
        description="Accordion of common questions shown at the bottom of the page."
        enabled={data.enabled}
        onToggle={(v) => setData({ ...data, enabled: v })}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <Field label="Section Title">
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </Field>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{data.items.length} FAQs</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setData({ ...data, items: [...data.items, { q: "New question", a: "Answer..." }] })}
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </Button>
        </div>
        <div className="space-y-3">
          {data.items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="slate">FAQ #{i + 1}</Badge>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button
                    onClick={() => setData({ ...data, items: data.items.filter((_, j) => j !== i) })}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <Field label="Question" required>
                <Input value={it.q} onChange={(e) => update(i, "q", e.target.value)} />
              </Field>
              <Field label="Answer">
                <Textarea rows={3} value={it.a} onChange={(e) => update(i, "a", e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
