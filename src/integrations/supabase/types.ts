export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          background_color: string | null
          banner_type: string
          content: string
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          is_dismissible: boolean
          link_text: string | null
          link_url: string | null
          sort_order: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["content_status"]
          text_color: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          banner_type?: string
          content: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_dismissible?: boolean
          link_text?: string | null
          link_url?: string | null
          sort_order?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          text_color?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          banner_type?: string
          content?: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_dismissible?: boolean
          link_text?: string | null
          link_url?: string | null
          sort_order?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          text_color?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          featured_image_id: string | null
          id: string
          is_featured: boolean
          published_at: string | null
          read_time: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image_id?: string | null
          id?: string
          is_featured?: boolean
          published_at?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image_id?: string | null
          id?: string
          is_featured?: boolean
          published_at?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "leadership_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_featured_image_id_fkey"
            columns: ["featured_image_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
        ]
      }
      business_sectors: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          details: string | null
          featured_image_id: string | null
          icon_code: string | null
          id: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          details?: string | null
          featured_image_id?: string | null
          icon_code?: string | null
          id?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          details?: string | null
          featured_image_id?: string | null
          icon_code?: string | null
          id?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_sectors_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sectors_featured_image_id_fkey"
            columns: ["featured_image_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
        ]
      }
      client_logos: {
        Row: {
          company_name: string
          created_at: string
          created_by: string | null
          id: string
          is_featured: boolean
          logo_image_id: string | null
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_featured?: boolean
          logo_image_id?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_featured?: boolean
          logo_image_id?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_logos_logo_image_id_fkey"
            columns: ["logo_image_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string
          email: string
          form_type: string | null
          id: string
          message: string
          metadata: Json | null
          name: string
          notes: string | null
          phone: string | null
          priority: string | null
          response_date: string | null
          response_sent: boolean
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email: string
          form_type?: string | null
          id?: string
          message: string
          metadata?: Json | null
          name: string
          notes?: string | null
          phone?: string | null
          priority?: string | null
          response_date?: string | null
          response_sent?: boolean
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email?: string
          form_type?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          name?: string
          notes?: string | null
          phone?: string | null
          priority?: string | null
          response_date?: string | null
          response_sent?: boolean
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          attempted_at: string
          created_at: string
          email: string
          email_type: string
          error_message: string | null
          id: string
          status: string
        }
        Insert: {
          attempted_at?: string
          created_at?: string
          email: string
          email_type: string
          error_message?: string | null
          id?: string
          status: string
        }
        Update: {
          attempted_at?: string
          created_at?: string
          email?: string
          email_type?: string
          error_message?: string | null
          id?: string
          status?: string
        }
        Relationships: []
      }
      event_reservations: {
        Row: {
          company: string
          created_at: string
          email: string
          event_name: string | null
          first_name: string
          id: string
          industry: string | null
          last_name: string
          message: string | null
          phone: string | null
          position: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          event_name?: string | null
          first_name: string
          id?: string
          industry?: string | null
          last_name: string
          message?: string | null
          phone?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          event_name?: string | null
          first_name?: string
          id?: string
          industry?: string | null
          last_name?: string
          message?: string | null
          phone?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category_id: string | null
          created_at: string
          created_by: string | null
          id: string
          question: string
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          answer: string
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          question: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          answer?: string
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          question?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "faqs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faqs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      leadership_profiles: {
        Row: {
          bio: string | null
          created_at: string
          created_by: string | null
          email: string | null
          expertise: string[] | null
          id: string
          linkedin_url: string | null
          name: string
          phone: string | null
          position: string
          profile_image_id: string | null
          quote: string | null
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          expertise?: string[] | null
          id?: string
          linkedin_url?: string | null
          name: string
          phone?: string | null
          position: string
          profile_image_id?: string | null
          quote?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          expertise?: string[] | null
          id?: string
          linkedin_url?: string | null
          name?: string
          phone?: string | null
          position?: string
          profile_image_id?: string | null
          quote?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leadership_profiles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leadership_profiles_profile_image_id_fkey"
            columns: ["profile_image_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
        ]
      }
      media_library: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          file_path: string
          file_size: number | null
          filename: string
          id: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string | null
          original_name: string
          tags: string[] | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type?: string | null
          original_name: string
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          mime_type?: string | null
          original_name?: string
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_library_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          is_verified: boolean
          source: string | null
          subscribed_at: string
          token_expires_at: string | null
          verification_token: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          is_verified?: boolean
          source?: string | null
          subscribed_at?: string
          token_expires_at?: string | null
          verification_token?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          is_verified?: boolean
          source?: string | null
          subscribed_at?: string
          token_expires_at?: string | null
          verification_token?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_data: Json
          content_type: string
          created_at: string
          created_by: string | null
          id: string
          page_name: string
          section_name: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          content_data: Json
          content_type: string
          created_at?: string
          created_by?: string | null
          id?: string
          page_name: string
          section_name: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          content_data?: Json
          content_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          page_name?: string
          section_name?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_image_id: string | null
          client_name: string
          client_position: string | null
          company_logo_id: string | null
          company_name: string
          content: string
          created_at: string
          created_by: string | null
          id: string
          is_featured: boolean
          project_description: string | null
          rating: number | null
          sector_id: string | null
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          client_image_id?: string | null
          client_name: string
          client_position?: string | null
          company_logo_id?: string | null
          company_name: string
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_featured?: boolean
          project_description?: string | null
          rating?: number | null
          sector_id?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          client_image_id?: string | null
          client_name?: string
          client_position?: string | null
          company_logo_id?: string | null
          company_name?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_featured?: boolean
          project_description?: string | null
          rating?: number | null
          sector_id?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_client_image_id_fkey"
            columns: ["client_image_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_company_logo_id_fkey"
            columns: ["company_logo_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "business_sectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_expired_verification_tokens: { Args: never; Returns: undefined }
      create_first_admin: {
        Args: { admin_email: string; admin_name: string }
        Returns: undefined
      }
      get_public_leadership_profiles: {
        Args: never
        Returns: {
          bio: string
          created_at: string
          expertise: string[]
          id: string
          job_position: string
          name: string
          profile_image_id: string
          quote: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          years_experience: number
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      validate_admin_access: { Args: never; Returns: boolean }
    }
    Enums: {
      content_status: "draft" | "published" | "archived"
      media_type: "image" | "video" | "document" | "pdf"
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_status: ["draft", "published", "archived"],
      media_type: ["image", "video", "document", "pdf"],
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const
