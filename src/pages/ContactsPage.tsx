import { Search, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Phone } from "lucide-react";
import { useState } from "react";

const contactsData = [
  { phone: "201004093405", whatsappId: "يوسف أكرم", displayName: "واتساب: يوسف أكرم", created: "منذ 3 أيام" },
  { phone: "201080159529", whatsappId: "+9529 015 108 20", displayName: "واتساب: +9529 015 108 20+", created: "منذ 7 أيام" },
  { phone: "201096435460", whatsappId: "مصطفى حاجه ٣", displayName: "واتساب: مصطفى حاجه ٣", created: "منذ 8 أيام" },
  { phone: "201151955131", whatsappId: "مندوب بوسطة", displayName: "واتساب: مندوب بوسطة", created: "منذ 11 يوماً" },
  { phone: "201095660091", whatsappId: "حازم دويدار", displayName: "واتساب: حازم دويدار", created: "منذ 17 يوماً" },
  { phone: "966507790082", whatsappId: "ابراهيم قللي", displayName: "واتساب: ابراهيم قللي", created: "منذ 18 يوماً" },
  { phone: "201005232633", whatsappId: "أحمد جمعة", displayName: "واتساب: أحمد جوماء", created: "منذ 18 يوماً" },
  { phone: "201127271593", whatsappId: "SAFA", displayName: "واتساب: SAFA", created: "منذ 18 يوماً" },
  { phone: "919484535875", whatsappId: "أمي", displayName: "واتساب: أمي", created: "منذ 18 يوماً" },
  { phone: "201015346680", whatsappId: "الدوكشدوكش", displayName: "واتساب: aldwkshdwkshaldwksh", created: "منذ 19 يوماً" },
  { phone: "201005193433", whatsappId: "a7medsla4in", displayName: "واتساب: a7medsla4in", created: "قبل 20 يوماً" },
  { phone: "201062239752", whatsappId: "داد وود", displayName: "واتساب: داد وود", created: "منذ 21 يوماً" },
];

export default function ContactsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = contactsData.filter(
    (c) => c.phone.includes(search) || c.whatsappId.includes(search) || c.displayName.includes(search)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">جهات اتصال واتساب</h1>
        <span className="text-sm text-muted-foreground">إدارة جهات الاتصال واتساب 📇</span>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-lg">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-9 pl-3 py-2.5 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="ابحث بالهاتف أو بالاسم..."
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right p-3 text-muted-foreground font-medium">الهاتف</th>
                <th className="text-right p-3 text-muted-foreground font-medium">معرف واتساب</th>
                <th className="text-right p-3 text-muted-foreground font-medium">اسم العرض</th>
                <th className="text-right p-3 text-muted-foreground font-medium">تأسيس</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="font-mono text-xs">{contact.phone}</span>
                    </div>
                  </td>
                  <td className="p-3 text-foreground">{contact.whatsappId}</td>
                  <td className="p-3 text-muted-foreground">{contact.displayName}</td>
                  <td className="p-3 text-muted-foreground">{contact.created}</td>
                  <td className="p-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-3 border-t border-border">
          <span className="text-xs text-muted-foreground">1 - 20 من أصل 112 مشاركة</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground ml-2">لكل صفحة</span>
            <select className="text-xs border border-border rounded px-2 py-1 bg-background">
              <option>20</option>
              <option>50</option>
            </select>
            <button className="p-1 rounded hover:bg-muted"><ChevronsRight size={14} /></button>
            <button className="p-1 rounded hover:bg-muted"><ChevronRight size={14} /></button>
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded text-xs ${
                  currentPage === p
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="p-1 rounded hover:bg-muted"><ChevronLeft size={14} /></button>
            <button className="p-1 rounded hover:bg-muted"><ChevronsLeft size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

