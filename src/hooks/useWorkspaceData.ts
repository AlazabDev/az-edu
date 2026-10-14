import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";

export function useWorkspaceData<T extends "contacts" | "conversations" | "messages" | "media_files" | "whatsapp_accounts">(table: T) {
  const { user } = useAuth();
  return useQuery({ queryKey: [table, user?.id], enabled: !!user, queryFn: async () => {
    if (!user) return [] as Tables<T>[];
    const { data, error } = await supabase.from(table).select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) throw error;
    return data as unknown as Tables<T>[];
  }});
}