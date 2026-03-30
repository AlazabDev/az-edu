import { GitBranch, Plus, Search, Play, Pause, MoreVertical } from "lucide-react";
import { useState } from "react";

const flows = [
  { id: 1, name: "تدفق الترحيب", description: "رسالة ترحيب تلقائية للعملاء الجدد", status: "نشط", triggers: 245, lastRun: "منذ 10 دقائق" },
  { id: 2, name: "متابعة الطلبات", description: "إرسال تحديثات حالة الطلب", status: "نشط", triggers: 189, lastRun: "منذ 30 دقيقة" },
  { id: 3, name: "استبيان ما بعد الشراء", description: "طلب تقييم بعد إتمام الطلب", status: "متوقف", triggers: 56, lastRun: "منذ يومين" },
  { id: 4, name: "تذكير السلة المتروكة", description: "تنبيه العملاء بالمنتجات في السلة", status: "نشط", triggers: 132, lastRun: "منذ ساعة" },
  { id: 5, name: "دعم العملاء", description: "توجيه استفسارات العملاء للقسم المناسب", status: "نشط", triggers: 367, lastRun: "منذ 5 دقائق" },
];

export default function FlowsPage() {
  const [search, setSearch] = useState("");
  const filtered = flows.filter((f) => f.name.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">تدفقات واتساب</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          إنشاء تدفق
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
          placeholder="بحث في التدفقات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((flow) => (
          <div key={flow.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GitBranch size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{flow.name}</h3>
                  <p className="text-xs text-muted-foreground">{flow.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  flow.status === "نشط" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {flow.status}
                </span>
                <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  {flow.status === "نشط" ? <Pause size={16} className="text-muted-foreground" /> : <Play size={16} className="text-primary" />}
                </button>
                <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <MoreVertical size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="flex gap-6 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
              <span>عدد التشغيلات: <strong className="text-foreground">{flow.triggers}</strong></span>
              <span>آخر تشغيل: {flow.lastRun}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
