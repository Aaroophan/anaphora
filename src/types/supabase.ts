export  type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          headline: string
          bio: string
          location: string
          avatar_url: string | null
          contact_email: string | null
          social_links: Json | null
          experiences: Json | null
          projects: Json | null
          skills: Json | null
          education: Json | null
          achievements: Json | null
          theme: Json | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          headline?: string
          bio?: string
          location?: string
          avatar_url?: string | null
          contact_email?: string | null
          social_links?: Json | null
          experiences?: Json | null
          projects?: Json | null
          skills?: Json | null
          education?: Json | null
          achievements?: Json | null
          theme?: Json | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          headline?: string
          bio?: string
          location?: string
          avatar_url?: string | null
          contact_email?: string | null
          social_links?: Json | null
          experiences?: Json | null
          projects?: Json | null
          skills?: Json | null
          education?: Json | null
          achievements?: Json | null
          theme?: Json | null
          updated_at?: string
          created_at?: string
        }
      }
    }
    Functions: {
      getProfileByUsername: {
        Args: { username_param: string }
        Returns: {
          id: string
          username: string
          full_name: string
          headline: string
          bio: string
          location: string
          avatar_url: string | null
          contact_email: string | null
          social_links: Json | null
          experiences: Json | null
          projects: Json | null
          skills: Json | null
          education: Json | null
          achievements: Json | null
          theme: Json | null
          updated_at: string
          created_at: string
        }
      }
    }
  }
}
 