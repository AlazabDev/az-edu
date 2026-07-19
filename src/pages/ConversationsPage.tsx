import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Search, MoreVertical, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const statusMap: Record<string, { label: string; cls: string }> = {
  active: { label: "نشط", cls: "bg-primary/20 text-primary" },
  pending: { label: "معلق", cls: "bg-yellow-500/20 text-yellow-600" },
  closed: { label: "مغلق", cls: "bg-muted text-muted-foreground" },
};

export default function ConversationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const { data: convs = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, contacts(phone, display_name, whatsapp_id)")
        .order("last_message_at", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = convs.filter((c: any) => {
    const contact = c.contacts;
    const matchSearch = !search || contact?.phone?.includes(search) || contact?.display_name?.includes(search);
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">المحادثات</h1>
        <span className="text-sm text-muted-foreground">{convs.length} محادثة</span>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-card text-sm"
            placeholder="بحث في المحادثات..."
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[["all", "الكل"], ["active", "نشط"], ["pending", "معلق"], ["closed", "مغلق"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-3 py-2 rounded-lg text-sm ${filter === v ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">لا توجد محادثات بعد.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right p-3 font-medium text-muted-foreground">جهة الاتصال</th>
                <th className="text-right p-3 font-medium text-muted-foreground">آخر نشاط</th>
                <th className="text-right p-3 font-medium text-muted-foreground">غير مقروء</th>
                <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
                <th className="text-right p-3 font-medium text-muted-foreground">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c: any) => (
                <tr key={c.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageSquare size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.contacts?.display_name || c.contacts?.phone || "غير معروف"}</p>
                        <p className="text-xs text-muted-foreground">{c.contacts?.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">
                    {c.last_message_at ? new Date(c.last_message_at).toLocaleString("ar-EG") : "-"}
                  </td>
                  <td className="p-3">
                    {c.unread_count > 0 ? (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">{c.unread_count}</span>
                    ) : <span className="text-muted-foreground">-</span>}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusMap[c.status]?.cls}`}>{statusMap[c.status]?.label}</span>
                  </td>
                  <td className="p-3">
                    <Link to="/inbox" className="text-primary text-xs hover:underline">فتح</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
