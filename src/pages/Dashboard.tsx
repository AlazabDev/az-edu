import { Phone, MessageSquare, AlertTriangle, Workflow, ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const stats = [
  { label: "الأرقام", value: "3", sub: "3 التعايش", icon: Phone },
  { label: "الرسائل", value: "1,245", sub: "↓ 320 في · ↑ 925 خارج", icon: MessageSquare },
  { label: "السجلات", value: "42 خطأ", sub: "من 1,890 إجمالي", icon: AlertTriangle },
  { label: "سير العمل", value: "5 نقاط", sub: "جميعها ناجحة", icon: Workflow },
];

const chartData = [
  { name: "السبت", الوارد: 12, الخارج: 25 },
  { name: "الأحد", الوارد: 18, الخارج: 35 },
  { name: "الاثنين", الوارد: 45, الخارج: 80 },
  { name: "الثلاثاء", الوارد: 32, الخارج: 55 },
  { name: "الأربعاء", الوارد: 28, الخارج: 48 },
  { name: "الخميس", الوارد: 15, الخارج: 30 },
  { name: "الجمعة", الوارد: 8, الخارج: 20 },
];

const recentMessages = [
  { phone: "201095663003", contact: "محمد سامي", direction: "الوارد", status: "—", content: "مش بترد عليا ليه يا كينج", time: "11:28 م" },
  { phone: "201099884670", contact: "يد محمد154", direction: "الخارج", status: "أرسل", content: "صورة مرفقة (image_37814e5f3b.jpeg)", time: "06:40 م" },
  { phone: "201099884670", contact: "يد محمد154", direction: "الخارج", status: "أرسل", content: "صورة مرفقة (image_3d66d0260b.jpeg)", time: "06:40 م" },
  { phone: "201040759091", contact: "النظام السريع", direction: "الوارد", status: "—", content: "طلب سريع للمنتج الجديد", time: "05:15 م" },
  { phone: "201064700463", contact: "أبو روندا 4", direction: "الخارج", status: "أرسل", content: "تم إرسال الفاتورة بنجاح", time: "04:30 م" },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">لوحة المعلومات</h1>
          <span className="text-sm text-muted-foreground">الترقية: مجاني</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>اليوم</span>
          <span className="text-foreground font-medium">هذا الأسبوع</span>
          <span>هذا الشهر</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-lg border border-border p-5 flex items-start justify-between hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </div>
            <ChevronLeft size={16} className="text-muted-foreground mt-1" />
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">الرسائل اليومية</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">الوارد</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary/50" />
              <span className="text-xs text-muted-foreground">الخارج</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="الوارد" fill="hsl(145 63% 49%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="الخارج" fill="hsl(145 63% 49% / 0.4)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">إجراءات سريعة</h2>
          <div className="space-y-3">
            {[
              { label: "أضف رقم الهاتف", desc: "نحن نوفره لك", icon: Phone },
              { label: "إنشاء مفتاح API", desc: "التكامل عبر واجهة برمجة النظ...", icon: "🔑" },
              { label: "إنشاء webhook", desc: "احصل على إشعارات بالرسائل", icon: "🔗" },
              { label: "إنشاء سير العمل", desc: "وكلاء الذكاء الاصطناعي والأ...", icon: Workflow },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-right"
              >
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground shrink-0">
                  {typeof action.icon === "string" ? (
                    <span>{action.icon}</span>
                  ) : (
                    <action.icon size={16} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-card rounded-lg border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">الرسائل الحديثة</h2>
          <button className="text-sm text-primary hover:underline">عرض صندوق الوارد</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-3 text-muted-foreground font-medium">الهاتف</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الاتصال</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الإخراج</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الحالة</th>
                <th className="text-right p-3 text-muted-foreground font-medium">المحتوى</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الزمن</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.map((msg, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-3 font-mono text-xs">{msg.phone}</td>
                  <td className="p-3">{msg.contact}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        msg.direction === "الوارد"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {msg.direction}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{msg.status}</td>
                  <td className="p-3 max-w-xs truncate">{msg.content}</td>
                  <td className="p-3 text-muted-foreground">{msg.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
