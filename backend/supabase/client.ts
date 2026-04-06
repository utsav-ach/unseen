/**
 * File: supabase/client.ts
 * 
 * This file is used to create a Supabase client for client-side operations.
 * It uses the createBrowserClient function from the @supabase/ssr package.
 * 
 * @returns {Promise<SupabaseClient>} - The Supabase client
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gwhfdibumtvrritxpoxp.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aGZkaWJ1bXR2cnJpdHhwb3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDA3NTYsImV4cCI6MjA5MDExNjc1Nn0.hZ6aTbRKI3yOO3KsKTabvCCbav4Qh3CLQND0gMaLkeo'
    )
}

// Export a singleton instance for convenience
export const supabase = createClient();