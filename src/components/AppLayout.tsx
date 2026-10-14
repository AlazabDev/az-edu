import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, MessageSquare, Plus } from "lucide-react";
import AppSidebar from "./AppSidebar";
import { Button } from "@/components/ui/button";
export default function AppLayout({ children }: { children: React.ReactNode }) {
 const [collapsed,setCollapsed]=useState(false); const [open,setOpen]=useState(false); const location=useLocation();
 return <div className="min-h-screen bg-background"><div className={`${open ? "block" : "hidden"} md:block`}><AppSidebar collapsed={collapsed} onToggle={()=>{setCollapsed(!collapsed);setOpen(false);}} onNavigate={()=>setOpen(false)} /></div><main className={`min-w-0 transition-all duration-200 ${collapsed ? "md:mr-16" : "md:mr-60"}`}><header className="h-16 px-4 md:px-8 border-b border-border bg-card flex items-center justify-between gap-3"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="md:hidden" aria-label="فتح القائمة" onClick={()=>setOpen(!open)}><Menu /></Button><MessageSquare className="text-primary"/><span className="font-semibold">واتساب أعمال</span></div><Button asChild size="sm" variant="outline"><Link to="/add-number"><Plus /> إضافة رقم</Link></Button></header><div key={location.pathname} className={`animate-in fade-in duration-300 ${location.pathname === "/inbox" ? "" : "px-4 py-6 md:p-8 max-w-[1440px] mx-auto"}`}>{children}</div></main></div>;
}