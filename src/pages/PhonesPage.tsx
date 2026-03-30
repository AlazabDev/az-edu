import { Phone, Plus, Settings, MoreVertical } from "lucide-react";

const phones = [
  { id: 1, number: "+966501234567", name: "الرقم الرئيسي", status: "متصل", messages: 1250, quality: "عالية" },
  { id: 2, number: "+966509876543", name: "رقم الدعم", status: "متصل", messages: 890, quality: "عالية" },
  { id: 3, number: "+966507654321", name: "رقم التسويق", status: "غير متصل", messages: 340, quality: "متوسطة" },
];

export default function PhonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">أرقام الهواتف</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          إضافة رقم
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{phone.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono" dir="ltr">{phone.number}</p>
                </div>
              </div>
              <button className="p-1 rounded hover:bg-muted"><MoreVertical size={16} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة</span>
                <span className={phone.status === "متصل" ? "text-primary" : "text-destructive"}>{phone.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الرسائل المرسلة</span>
                <span className="text-foreground">{phone.messages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">جودة الرقم</span>
                <span className="text-foreground">{phone.quality}</span>
              </div>
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
              <Settings size={14} />
              إعدادات
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
