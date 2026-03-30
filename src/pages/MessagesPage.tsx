import { Mail, Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useState } from "react";

const messages = [
  { id: 1, direction: "in", contact: "أحمد محمد", phone: "+966501234567", content: "مرحباً، أريد الاستفسار عن المنتج", time: "10:30", date: "2026-03-30", status: "مقروءة" },
  { id: 2, direction: "out", contact: "أحمد محمد", phone: "+966501234567", content: "أهلاً بك! كيف يمكنني مساعدتك؟", time: "10:32", date: "2026-03-30", status: "تم التسليم" },
  { id: 3, direction: "in", contact: "فاطمة علي", phone: "+966509876543", content: "هل المنتج متوفر؟", time: "09:15", date: "2026-03-30", status: "مقروءة" },
  { id: 4, direction: "out", contact: "خالد عبدالله", phone: "+966507654321", content: "تم شحن طلبك بنجاح", time: "08:45", date: "2026-03-30", status: "تم التسليم" },
  { id: 5, direction: "in", contact: "نورة سعد", phone: "+966502345678", content: "شكراً جزيلاً", time: "أمس", date: "2026-03-29", status: "مقروءة" },
  { id: 6, direction: "out", contact: "سلطان حسن", phone: "+966508765432", content: "عرض خاص لك! خصم 20% على جميع المنتجات", time: "أمس", date: "2026-03-29", status: "فشل" },
];

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [dirFilter, setDirFilter] = useState("الكل");

  const filtered = messages.filter((m) => {
    const matchSearch = m.contact.includes(search) || m.content.includes(search);
    const matchDir = dirFilter === "الكل" || (dirFilter === "واردة" && m.direction === "in") || (dirFilter === "صادرة" && m.direction === "out");
    return matchSearch && matchDir;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">الرسائل</h1>
        <span className="text-sm text-muted-foreground">{messages.length} رسالة</span>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
            placeholder="بحث في الرسائل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {["الكل", "واردة", "صادرة"].map((f) => (
          <button key={f} onClick={() => setDirFilter(f)} className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            dirFilter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
          }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-right p-3 font-medium text-muted-foreground">الاتجاه</th>
              <th className="text-right p-3 font-medium text-muted-foreground">جهة الاتصال</th>
              <th className="text-right p-3 font-medium text-muted-foreground">المحتوى</th>
              <th className="text-right p-3 font-medium text-muted-foreground">الوقت</th>
              <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((msg) => (
              <tr key={msg.id} className="border-b border-border hover:bg-muted/30">
                <td className="p-3">
                  {msg.direction === "in" ? (
                    <ArrowDownLeft size={16} className="text-primary" />
                  ) : (
                    <ArrowUpRight size={16} className="text-blue-500" />
                  )}
                </td>
                <td className="p-3">
                  <p className="text-foreground">{msg.contact}</p>
                  <p className="text-xs text-muted-foreground font-mono" dir="ltr">{msg.phone}</p>
                </td>
                <td className="p-3 text-muted-foreground max-w-[250px] truncate">{msg.content}</td>
                <td className="p-3 text-muted-foreground">{msg.time}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    msg.status === "تم التسليم" ? "bg-primary/20 text-primary" :
                    msg.status === "فشل" ? "bg-destructive/20 text-destructive" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {msg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
