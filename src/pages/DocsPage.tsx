import { BookOpen, ExternalLink } from "lucide-react";

const docs = [
  { title: "البدء السريع", description: "دليل سريع لإعداد حساب واتساب أعمال", link: "#" },
  { title: "إرسال الرسائل", description: "كيفية إرسال رسائل نصية ووسائط متعددة", link: "#" },
  { title: "القوالب", description: "إنشاء وإدارة قوالب الرسائل", link: "#" },
  { title: "الويبهوكس", description: "استقبال الإشعارات والأحداث", link: "#" },
  { title: "واجهة برمجة التطبيقات", description: "مرجع API الكامل", link: "#" },
  { title: "التدفقات", description: "أتمتة المحادثات والردود", link: "#" },
];

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">الوثائق</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <a key={doc.title} href={doc.link} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen size={18} className="text-primary" />
              </div>
              <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{doc.title}</h3>
            <p className="text-sm text-muted-foreground">{doc.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
