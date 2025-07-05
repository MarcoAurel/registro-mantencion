import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fzwfmmhfwaishzztorli.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6d2ZtbWhmd2Fpc2h6enRvcmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzU2NTYsImV4cCI6MjA2NzMxMTY1Nn0.Vj0DUqIxThmCbeVy1bm1Pf9SCnXdpzRsB2bja4KRVQo'

export const supabase = createClient(supabaseUrl, supabaseKey)