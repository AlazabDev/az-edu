import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">المساعدة والدعم</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <MessageCircle size={20} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">الدردشة المباشرة</h3>
          <p className="text-sm text-muted-foreground mb-3">تحدث مع فريق الدعم مباشرة</p>
          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">ابدأ محادثة</button>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Mail size={20} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">البريد الإلكتروني</h3>
          <p className="text-sm text-muted-foreground mb-3">أرسل لنا استفسارك</p>
          <button className="w-full py-2 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors">support@example.com</button>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Phone size={20} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">الهاتف</h3>
          <p className="text-sm text-muted-foreground mb-3">اتصل بنا</p>
          <button className="w-full py-2 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors" dir="ltr">+966 XX XXX XXXX</button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">الأسئلة الشائعة</h2>
        <div className="space-y-3">
          {[
            { q: "كيف أربط رقم واتساب أعمال؟", a: "اذهب إلى صفحة 'أضف رقماً جديداً' وأدخل بيانات حسابك." },
            { q: "ما هي حدود إرسال الرسائل؟", a: "تعتمد الحدود على مستوى حسابك وجودة الرقم." },
            { q: "كيف أنشئ قالب رسالة؟", a: "اذهب إلى صفحة القوالب واضغط على 'إنشاء قالب'." },
          ].map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex items-center gap-2 cursor-pointer py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <HelpCircle size={14} className="text-primary shrink-0" />
                {faq.q}
              </summary>
              <p className="pr-6 pb-2 text-sm text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
