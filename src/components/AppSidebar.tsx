import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Inbox,
  Phone,
  Webhook,
  Key,
  MessageSquare,
  FileText,
  Image,
  Users,
  HelpCircle,
  BookOpen,
  Mail,
  ChevronDown,
  ChevronLeft,
  Database,
} from "lucide-react";
import { useState } from "react";

const navSections = [
  {
    items: [
      { label: "لوحة المعلومات", icon: LayoutDashboard, path: "/" },
      { label: "أضف رقماً جديداً", icon: Plus, path: "/add-number" },
      { label: "صندوق الوارد", icon: Inbox, path: "/inbox" },
    ],
  },
  {
    title: "التكامل",
    items: [
      {
        label: "أرقام الهواتف",
        icon: Phone,
        path: "/phones",
        expandable: true,
      },
      { label: "ويبهوكس", icon: Webhook, path: "/webhooks" },
      { label: "مفاتيح واجهة برمجة التطبيقات", icon: Key, path: "/api-keys" },
      { label: "تدفقات واتساب", icon: MessageSquare, path: "/flows" },
      { label: "القوالب", icon: FileText, path: "/templates" },
    ],
  },
  {
    title: "البيانات",
    items: [
      { label: "المحادثات", icon: MessageSquare, path: "/conversations" },
      { label: "الرسائل", icon: Mail, path: "/messages" },
      { label: "الإعلام", icon: Image, path: "/media" },
      { label: "جهات الاتصال", icon: Users, path: "/contacts" },
    ],
  },
];

const bottomItems = [
  { label: "وثائق", icon: BookOpen, path: "/docs" },
  { label: "المساعدة", icon: HelpCircle, path: "/help" },
  { label: "صندوق وارد الفريق", icon: Mail, path: "/team-inbox" },
];

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function AppSidebar({ collapsed = false, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (path: string) => location.pathname === path;

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-screen bg-card border-l border-border flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <span className="font-bold text-foreground text-sm">نظام الإدارة</span>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-muted text-muted-foreground"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navSections.map((section, si) => (
          <div key={si} className="mb-2">
            {section.title && !collapsed && (
              <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm transition-colors ${
                    isActive(item.path)
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-muted"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                  {!collapsed && item.expandable && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        expandedItems.includes(item.label) ? "rotate-180" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand(item.label);
                      }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="border-t border-border py-2">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm transition-colors text-sidebar-foreground hover:bg-muted ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={18} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        {/* User */}
        <div
          className={`flex items-center gap-3 px-4 py-3 border-t border-border mt-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
            م
          </div>
          {!collapsed && (
            <span className="text-sm text-foreground truncate">admin@example.com</span>
          )}
        </div>
      </div>
    </aside>
  );
}
