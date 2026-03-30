import { Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddNumberPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">إضافة رقم جديد</h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Phone size={28} className="text-primary" />
        </div>
        <p className="text-center text-muted-foreground text-sm">أضف رقم واتساب أعمال جديد لربطه بالنظام</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">اسم الرقم</label>
            <input className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm" placeholder="مثال: رقم المبيعات" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">رقم الهاتف</label>
            <input className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-mono" dir="ltr" placeholder="+966XXXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">معرف حساب واتساب أعمال (WABA ID)</label>
            <input className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-mono" dir="ltr" placeholder="XXXXXXXXXXXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">رمز الوصول (Access Token)</label>
            <input type="password" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm" placeholder="••••••••••••••••" />
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          ربط الرقم
        </button>
      </div>
    </div>
  );
}
