export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      complaints: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          status: 'pending' | 'in_progress' | 'resolved' | 'rejected'
          user_id: string
          category: string
          priority: 'low' | 'medium' | 'high'
          attachments: string[] | null
          admin_notes: string | null
          resolved_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          status?: 'pending' | 'in_progress' | 'resolved' | 'rejected'
          user_id: string
          category: string
          priority?: 'low' | 'medium' | 'high'
          attachments?: string[] | null
          admin_notes?: string | null
          resolved_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          status?: 'pending' | 'in_progress' | 'resolved' | 'rejected'
          user_id?: string
          category?: string
          priority?: 'low' | 'medium' | 'high'
          attachments?: string[] | null
          admin_notes?: string | null
          resolved_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          full_name: string
          role: 'user' | 'admin'
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          full_name: string
          role?: 'user' | 'admin'
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          role?: 'user' | 'admin'
          avatar_url?: string | null
        }
      }
    }
  }
}