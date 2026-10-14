import { KeyRound, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/WorkspaceUI";
export default function ApiKeysPage(){return <><PageHeading title="مفاتيح API"/><section className="border-y border-border py-10 max-w-3xl"><KeyRound size={32} className="text-primary mb-5"/><h2 className="font-semibold text-lg">لم تُفعّل إدارة مفاتيح التطبيق بعد</h2><p className="text-muted-foreground mt-3 mb-6 text-sm">لا توجد مفاتيح إنتاج مُدارة من هذه الصفحة. مفاتيح Meta وMinIO الخاصة يجب حفظها في إعدادات الخدمة الآمنة، وليس في المتصفح.</p><Button asChild variant="outline"><a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">فتح Supabase <ExternalLink/></a></Button></section></>;}
