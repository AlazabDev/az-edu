import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

const apiKeys = [
  { id: 1, name: "مفتاح الإنتاج", key: "wba_live_sk_xxxxxxxxxxxxxxxxxxxx", created: "2026-01-15", lastUsed: "منذ دقيقة" },
  { id: 2, name: "مفتاح التطوير", key: "wba_test_sk_xxxxxxxxxxxxxxxxxxxx", created: "2026-02-01", lastUsed: "منذ 3 أيام" },
  { id: 3, name: "مفتاح الاختبار", key: "wba_test_sk_yyyyyyyyyyyyyyyyyyyy", created: "2026-03-10", lastUsed: "أبداً" },
];

export default function ApiKeysPage() {
  const [visibleKeys, setVisibleKeys] = useState<number[]>([]);

  const toggleVisibility = (id: number) => {
    setVisibleKeys((prev) => prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">مفاتيح API</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          إنشاء مفتاح
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-right p-3 font-medium text-muted-foreground">الاسم</th>
              <th className="text-right p-3 font-medium text-muted-foreground">المفتاح</th>
              <th className="text-right p-3 font-medium text-muted-foreground">تاريخ الإنشاء</th>
              <th className="text-right p-3 font-medium text-muted-foreground">آخر استخدام</th>
              <th className="text-right p-3 font-medium text-muted-foreground">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((ak) => (
              <tr key={ak.id} className="border-b border-border hover:bg-muted/30">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Key size={16} className="text-primary" />
                    <span className="text-foreground">{ak.name}</span>
                  </div>
                </td>
                <td className="p-3 font-mono text-xs text-muted-foreground" dir="ltr">
                  {visibleKeys.includes(ak.id) ? ak.key : "••••••••••••••••••••••••"}
                </td>
                <td className="p-3 text-muted-foreground">{ak.created}</td>
                <td className="p-3 text-muted-foreground">{ak.lastUsed}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => toggleVisibility(ak.id)} className="p-1.5 rounded hover:bg-muted">
                      {visibleKeys.includes(ak.id) ? <EyeOff size={14} className="text-muted-foreground" /> : <Eye size={14} className="text-muted-foreground" />}
                    </button>
                    <button className="p-1.5 rounded hover:bg-muted"><Copy size={14} className="text-muted-foreground" /></button>
                    <button className="p-1.5 rounded hover:bg-muted"><Trash2 size={14} className="text-destructive" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
