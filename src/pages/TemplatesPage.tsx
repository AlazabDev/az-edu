import { FileText, Plus, Search, MoreVertical, Copy, Trash2, Edit } from "lucide-react";
import { useState } from "react";

const templates = [
  { id: 1, name: "رسالة ترحيب", category: "تسويق", status: "معتمد", language: "العربية", lastEdited: "2026-03-25" },
  { id: 2, name: "تأكيد الطلب", category: "معاملات", status: "معتمد", language: "العربية", lastEdited: "2026-03-20" },
  { id: 3, name: "إشعار الشحن", category: "معاملات", status: "قيد المراجعة", language: "العربية", lastEdited: "2026-03-28" },
  { id: 4, name: "عرض خاص", category: "تسويق", status: "معتمد", language: "العربية", lastEdited: "2026-03-15" },
  { id: 5, name: "استبيان رضا العملاء", category: "خدمة", status: "مرفوض", language: "العربية", lastEdited: "2026-03-10" },
  { id: 6, name: "تذكير بالدفع", category: "معاملات", status: "معتمد", language: "العربية", lastEdited: "2026-03-22" },
];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");

  const filtered = templates.filter((t) => t.name.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">القوالب</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          إنشاء قالب
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
          placeholder="بحث في القوالب..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => (
          <div key={template.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                template.status === "معتمد" ? "bg-primary/20 text-primary" :
                template.status === "قيد المراجعة" ? "bg-yellow-500/20 text-yellow-600" :
                "bg-destructive/20 text-destructive"
              }`}>
                {template.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{template.language}</span>
              <span>آخر تعديل: {template.lastEdited}</span>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <button className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                <Edit size={12} /> تعديل
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                <Copy size={12} /> نسخ
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-md hover:bg-muted transition-colors text-destructive">
                <Trash2 size={12} /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
