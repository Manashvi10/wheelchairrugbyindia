import {
  LayoutDashboard,
  Globe,
  Users,
  Calendar,
  Image as ImageIcon,
  Quote,
  Handshake,
  Mail,
  Search,
  Settings,
  UserCog,
  Activity,
  Home,
  Info,
  UserCheck,
  ClipboardList,
  Award,
  Trophy,
  CalendarPlus,
  CalendarCheck,
  ListChecks,
  Folder,
  Video,
  FileText,
  Tag,
  Medal,
  Megaphone,
  Bell,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
  badge?: string;
};

export const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Website Management",
    icon: Globe,
    children: [
      { label: "Home Page", href: "/admin/website/home", icon: Home },
      { label: "About Us", href: "/admin/website/about", icon: Info },
      { label: "News Page", href: "/admin/website/news", icon: FileText },
      { label: "History Page", href: "/admin/website/history", icon: Trophy },
      { label: "Events Page", href: "/admin/website/events", icon: CalendarPlus },
      { label: "Contact Page", href: "/admin/website/contact", icon: Mail },
      { label: "Notices / Marquee", href: "/admin/website/notices", icon: Megaphone },
      { label: "Announcement Popup", href: "/admin/website/popup", icon: Bell },
    ],
  },
  {
    label: "Athlete Management",
    icon: Award,
    children: [
      { label: "Athletes", href: "/admin/athletes", icon: Users },
      { label: "Athlete Categories", href: "/admin/athletes/categories", icon: Tag },
      { label: "Athlete Achievements", href: "/admin/athletes/achievements", icon: Medal },
    ],
  },
  {
    label: "Events & Tournaments",
    icon: Trophy,
    children: [
      { label: "Upcoming Events", href: "/admin/events/upcoming", icon: CalendarPlus },
      { label: "Past Events", href: "/admin/events/past", icon: CalendarCheck },
      { label: "Tournament Registrations", href: "/admin/events/registrations", icon: ListChecks },
    ],
  },
  {
    label: "Media Center",
    icon: ImageIcon,
    children: [
      { label: "Gallery", href: "/admin/media/gallery", icon: Folder },
      { label: "Videos", href: "/admin/media/videos", icon: Video },
      { label: "Documents", href: "/admin/media/documents", icon: FileText },
    ],
  },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Partners Management", href: "/admin/partners", icon: Handshake },
  { label: "Contact Management", href: "/admin/contact", icon: Mail },
  { label: "SEO Management", href: "/admin/seo", icon: Search },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Admin Users", href: "/admin/users", icon: UserCog },
  { label: "Activity Logs", href: "/admin/logs", icon: Activity },
  { label: "Calendar", href: "/admin/calendar", icon: Calendar },
];
