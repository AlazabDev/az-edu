# Architecture
- Keep WhatsApp UI within the existing React router and shared application shell so all management pages have consistent navigation.
- Read WhatsApp records through user-scoped React Query hooks and the existing Supabase client to avoid mixing cached records between sessions.
- Store unpublished integration and message drafts separately from live records, scoped to the signed-in user; browser drafts must never be presented as delivered messages or active integrations.
- Do not collect provider secrets in browser draft storage; live provider actions require a verified server integration.