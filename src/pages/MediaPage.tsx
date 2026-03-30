import { Search, Eye, Download, Copy, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

const mediaData = [
  { id: "6a395b49", phone: "201004006620", file: "image_570df9698289.jpeg", size: "57.0 كيلوبايت", type: "صورة", received: "١٤:٠٣ ص ٢٠٢٧/١/٤" },
  { id: "9d6fa242", phone: "201004006620", file: "image_eb9b0773ff19.jpeg", size: "25.9 كيلوبايت", type: "صورة", received: "١٤:٠١ ص ٢٠٢٧/١/٤" },
  { id: "6a00d531", phone: "201004006620", file: "image_c29897ae63f8.jpeg", size: "65.8 كيلوبايت", type: "صورة", received: "١٤:٠٠ ص ٢٠٢٧/١/٤" },
  { id: "689d0f24", phone: "201004006620", file: "image_1e54c05b5c02.jpeg", size: "66.0 كيلوبايت", type: "صورة", received: "١٤:٤٨ ص ٢٠٢٧/١/٤" },
  { id: "db827502", phone: "201004006620", file: "image_b9ea4a295e82.jpeg", size: "46.4 كيلوبايت", type: "صورة", received: "١٤:٤٧ ص ٢٠٢٧/١/٤" },
  { id: "6b8ad992", phone: "201004006620", file: "image_a8a3d17c33d8.jpeg", size: "82.9 كيلوبايت", type: "صورة", received: "١٤:٤٥ ص ٢٠٢٧/١/٤" },
  { id: "af9451e9", phone: "201004006620", file: "image_ec4a910feed4.jpeg", size: "45.8 كيلوبايت", type: "صورة", received: "١٤:٤٣ ص ٢٠٢٧/١/٤" },
  { id: "c568214c", phone: "201004006620", file: "image_5215453c32e8.jpeg", size: "63.5 كيلوبايت", type: "صورة", received: "١٤:٤١ ص ٢٠٢٧/١/٤" },
  { id: "45296b88", phone: "20109983467", file: "image_cd37814e5f3b.jpeg", size: "53.1 كيلوبايت", type: "صورة", received: "٦:٤٠:٣٠ 2026/2/6" },
  { id: "1b64d458", phone: "20109983467", file: "image_423d66d0260b.jpeg", size: "67.3 كيلوبايت", type: "صورة", received: "٦:٤٠:٢٩ 2026/2/6" },
];

const typeFilters = ["جميع الأنواع", "صورة", "فيديو", "مستند", "صوت"];
const timeFilters = ["كل الزمن", "اليوم", "آخر 7 أيام", "آخر 30 يوماً"];

export default function MediaPage() {
  const [activeType, setActiveType] = useState("جميع الأنواع");
  const [activeTime, setActiveTime] = useState("كل الزمن");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">واتساب ميديا</h1>
        <p className="text-sm text-muted-foreground">
          تصفح المرفقات الإعلامية عبر جميع المحادثات. قم بتنزيل أو إزالة الوسائط دون حذف الرسالة الأصلية.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <select
          value={activeType}
          onChange={(e) => setActiveType(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground"
        >
          {typeFilters.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg overflow-hidden">
          {timeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveTime(f)}
              className={`px-3 py-2 text-sm transition-colors ${
                activeTime === f
                  ? "bg-foreground text-card font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-muted-foreground hover:bg-muted flex items-center gap-1">
          📅 مجموعة مخصصة
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right p-3 text-muted-foreground font-medium">الرسالة</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الملف</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الحجم</th>
                <th className="text-right p-3 text-muted-foreground font-medium">النوع</th>
                <th className="text-right p-3 text-muted-foreground font-medium">تم الاستلام</th>
                <th className="text-right p-3 text-muted-foreground font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {mediaData.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div>
                      <span className="font-mono text-xs text-foreground">{item.id}</span>
                      <p className="text-xs text-primary">{item.phone}</p>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">{item.file}</td>
                  <td className="p-3 text-muted-foreground">{item.size}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-medium">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{item.received}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="text-muted-foreground hover:text-foreground"><Eye size={14} /></button>
                      <button className="text-muted-foreground hover:text-foreground"><Copy size={14} /></button>
                      <button className="text-muted-foreground hover:text-foreground"><Download size={14} /></button>
                      <button className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-3 border-t border-border">
          <span className="text-xs text-muted-foreground">1 - 50 من أصل 779 مشاركة</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground ml-2">لكل صفحة</span>
            <select className="text-xs border border-border rounded px-2 py-1 bg-background">
              <option>50</option>
              <option>20</option>
            </select>
            <button className="p-1 rounded hover:bg-muted"><ChevronsRight size={14} /></button>
            <button className="p-1 rounded hover:bg-muted"><ChevronRight size={14} /></button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded text-xs ${
                  currentPage === p
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-muted-foreground">...</span>
            <button className="w-8 h-8 rounded text-xs hover:bg-muted text-foreground">16</button>
            <button className="p-1 rounded hover:bg-muted"><ChevronLeft size={14} /></button>
            <button className="p-1 rounded hover:bg-muted"><ChevronsLeft size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
