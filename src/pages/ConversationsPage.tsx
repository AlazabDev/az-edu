import { MessageSquare, Search, Filter, MoreVertical } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: 1, name: "أحمد محمد", phone: "+966501234567", lastMessage: "شكراً لكم على الخدمة الممتازة", time: "منذ 5 دقائق", unread: 2, status: "نشط" },
  { id: 2, name: "فاطمة علي", phone: "+966509876543", lastMessage: "هل يمكنني الاستفسار عن المنتج؟", time: "منذ 15 دقيقة", unread: 0, status: "نشط" },
  { id: 3, name: "خالد عبدالله", phone: "+966507654321", lastMessage: "أريد إلغاء الطلب", time: "منذ ساعة", unread: 1, status: "معلق" },
  { id: 4, name: "نورة سعد", phone: "+966502345678", lastMessage: "تم الاستلام بنجاح", time: "منذ 3 ساعات", unread: 0, status: "مغلق" },
  { id: 5, name: "سلطان حسن", phone: "+966508765432", lastMessage: "متى سيتم التوصيل؟", time: "أمس", unread: 0, status: "نشط" },
  { id: 6, name: "ريم محمود", phone: "+966503456789", lastMessage: "أحتاج مساعدة في الدفع", time: "أمس", unread: 3, status: "معلق" },
];

export default function ConversationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");

  const filtered = conversations.filter((c) => {
    const matchSearch = c.name.includes(search) || c.phone.includes(search);
    const matchFilter = filter === "الكل" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">المحادثات</h1>
        <span className="text-sm text-muted-foreground">{conversations.length} محادثة</span>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
            placeholder="بحث في المحادثات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["الكل", "نشط", "معلق", "مغلق"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-right p-3 font-medium text-muted-foreground">جهة الاتصال</th>
              <th className="text-right p-3 font-medium text-muted-foreground">آخر رسالة</th>
              <th className="text-right p-3 font-medium text-muted-foreground">الوقت</th>
              <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
              <th className="text-right p-3 font-medium text-muted-foreground">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((conv) => (
              <tr key={conv.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageSquare size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{conv.name}</p>
                      <p className="text-xs text-muted-foreground">{conv.phone}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-muted-foreground max-w-[200px] truncate">{conv.lastMessage}</td>
                <td className="p-3 text-muted-foreground">{conv.time}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    conv.status === "نشط" ? "bg-primary/20 text-primary" :
                    conv.status === "معلق" ? "bg-yellow-500/20 text-yellow-600" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {conv.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="p-1 rounded hover:bg-muted">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
