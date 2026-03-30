import { Webhook, Plus, Check, X, MoreVertical } from "lucide-react";

const webhooks = [
  { id: 1, url: "https://api.example.com/webhook/messages", events: ["الرسائل الواردة", "حالة التسليم"], status: "نشط", lastTriggered: "منذ 5 دقائق" },
  { id: 2, url: "https://crm.example.com/whatsapp/hook", events: ["جهة اتصال جديدة"], status: "نشط", lastTriggered: "منذ ساعة" },
  { id: 3, url: "https://analytics.example.com/track", events: ["كل الأحداث"], status: "معطل", lastTriggered: "منذ 3 أيام" },
];

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">ويبهوكس</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          إضافة ويبهوك
        </button>
      </div>

      <div className="space-y-3">
        {webhooks.map((wh) => (
          <div key={wh.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Webhook size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-mono text-foreground" dir="ltr">{wh.url}</p>
                  <p className="text-xs text-muted-foreground mt-1">آخر تشغيل: {wh.lastTriggered}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  wh.status === "نشط" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {wh.status === "نشط" ? <Check size={12} /> : <X size={12} />}
                  {wh.status}
                </span>
                <button className="p-1 rounded hover:bg-muted"><MoreVertical size={16} className="text-muted-foreground" /></button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {wh.events.map((ev) => (
                <span key={ev} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">{ev}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
