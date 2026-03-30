import { useState } from "react";
import { Search, Phone, MoreVertical, Send, Plus, Eye, BellOff, X } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  initials: string;
  phone: string;
  lastMessage: string;
  time: string;
  agent: string;
  unread?: boolean;
  color: string;
}

const conversations: Conversation[] = [
  { id: "1", name: "محمد سامي", initials: "MS", phone: "201095663003", lastMessage: "مش بترد عليا ليه يا كينج", time: "منذ حوالي ساعة واحدة", agent: "محمد عزب نشط", color: "bg-primary" },
  { id: "2", name: "يد محمد154", initials: "HM", phone: "201099884670", lastMessage: "صورة مرفقة (image_cd37814e...)", time: "منذ حوالي 6 ساعات", agent: "محمد عزب نشط", color: "bg-info" },
  { id: "3", name: "م محمود سعد", initials: "مم", phone: "201012345678", lastMessage: "حوالي فلوس شغل 5000", time: "منذ حوالي 10 ساعات", agent: "محمد عزب نشط", color: "bg-warning" },
];

const chatMessages = [
  { id: "1", type: "image" as const, time: "10:35 م", sender: "them" as const },
  { id: "2", type: "image" as const, time: "10:35 م", sender: "them" as const },
  { id: "3", type: "text" as const, text: "صورة مرفقة من Galaxy A14", time: "10:35 م", sender: "them" as const },
];

export default function InboxPage() {
  const [selectedConv, setSelectedConv] = useState<Conversation>(conversations[1]);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <div className="w-80 border-l border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">صندوق الوارد</h2>
            <div className="flex items-center gap-2">
              <BellOff size={16} className="text-muted-foreground" />
            </div>
          </div>
          <div className="relative mb-3">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full pr-9 pl-3 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="ابحث عن أرقام الهواتف..."
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="text-xs border border-border rounded px-2 py-1 bg-background text-foreground">
              <option>جميع أرقام واتساب</option>
            </select>
            <select className="text-xs border border-border rounded px-2 py-1 bg-background text-foreground">
              <option>نشط</option>
            </select>
            <select className="text-xs border border-border rounded px-2 py-1 bg-background text-foreground">
              <option>جميع الموكلين إ...</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              className={`w-full p-3 border-b border-border text-right hover:bg-muted transition-colors ${
                selectedConv.id === conv.id ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${conv.color} flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0`}>
                  {conv.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-foreground">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-muted-foreground">• {conv.agent}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${selectedConv.color} flex items-center justify-center text-primary-foreground text-xs font-bold`}>
              {selectedConv.initials}
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">{selectedConv.name}</p>
              <p className="text-xs text-muted-foreground">نشط • {selectedConv.time} • {selectedConv.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <button className="text-sm hover:text-foreground">معلومات</button>
            <button className="text-sm hover:text-foreground flex items-center gap-1">
              <X size={14} /> إغلاق
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "them" ? "justify-start" : "justify-end"}`}>
              {msg.type === "image" ? (
                <div className="bg-muted rounded-lg p-1 max-w-xs">
                  <div className="w-64 h-48 bg-muted-foreground/10 rounded flex items-center justify-center text-muted-foreground text-sm">
                    📷 صورة
                  </div>
                  <span className="text-xs text-muted-foreground block text-left mt-1 px-1">{msg.time}</span>
                </div>
              ) : (
                <div className="bg-accent rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-foreground">{msg.text}</p>
                  <span className="text-xs text-muted-foreground block text-left mt-1">{msg.time}</span>
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span>⏱</span>
            <span>الوضع اليدوي</span>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground">
              <Plus size={20} />
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="اكتب رسالتك..."
            />
            <button className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details Panel */}
      <div className="w-72 border-r border-border bg-card p-4 overflow-y-auto hidden lg:block">
        <div className="flex gap-2 mb-6 text-sm border-b border-border pb-2">
          <button className="font-medium text-foreground border-b-2 border-primary pb-2 px-2">معلومات</button>
          <button className="text-muted-foreground px-2 pb-2">صفحة</button>
        </div>

        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full ${selectedConv.color} flex items-center justify-center text-primary-foreground text-lg font-bold mx-auto mb-2`}>
            {selectedConv.initials}
          </div>
          <p className="font-medium text-foreground">{selectedConv.name}</p>
          <p className="text-xs text-muted-foreground">{selectedConv.phone}</p>
          <div className="flex gap-2 justify-center mt-3">
            <button className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted">
              عرض المحادثات
            </button>
            <button className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted">
              + إضافة ملاحظة
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">👥 التعيين</p>
            <p className="text-sm text-foreground">لم يتم تعيينه</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">ℹ️ الحالة</p>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-medium">نشط</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">📊 النشاط</p>
            <p className="text-sm text-foreground">آخر مرة نشطة: {selectedConv.time}</p>
            <p className="text-sm text-foreground">إجمالي الرسائل: 165</p>
          </div>
        </div>
      </div>
    </div>
  );
}
