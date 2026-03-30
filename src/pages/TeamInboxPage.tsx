import { Mail, Users, Search } from "lucide-react";

const teamMessages = [
  { id: 1, from: "محمد أحمد", subject: "تحديث سياسة الرد", time: "منذ 10 دقائق", read: false },
  { id: 2, from: "سارة خالد", subject: "تقرير أداء الأسبوع", time: "منذ ساعة", read: false },
  { id: 3, from: "عمر يوسف", subject: "طلب إضافة رقم جديد", time: "منذ 3 ساعات", read: true },
  { id: 4, from: "ليلى حسن", subject: "مشكلة في الويبهوك", time: "أمس", read: true },
];

export default function TeamInboxPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">صندوق وارد الفريق</h1>
        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {teamMessages.filter((m) => !m.read).length} جديد
        </span>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm" placeholder="بحث..." />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {teamMessages.map((msg) => (
          <div key={msg.id} className={`flex items-center gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${!msg.read ? "bg-primary/5" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Users size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${!msg.read ? "font-semibold text-foreground" : "text-foreground"}`}>{msg.from}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
            </div>
            {!msg.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
