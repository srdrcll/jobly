export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          user_id: string;
          company_id: string | null;
          company_name: string;
          position: string;
          location: string | null;
          work_type: 'Remote' | 'Hybrid' | 'On-site' | null;
          salary: string | null;
          status: 'saved' | 'applied' | 'interview' | 'case_study' | 'offer' | 'rejected';
          applied_date: string | null;
          notes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_id?: string | null;
          company_name: string;
          position: string;
          location?: string | null;
          work_type?: 'Remote' | 'Hybrid' | 'On-site' | null;
          salary?: string | null;
          status: 'saved' | 'applied' | 'interview' | 'case_study' | 'offer' | 'rejected';
          applied_date?: string | null;
          notes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_id?: string | null;
          company_name?: string;
          position?: string;
          location?: string | null;
          work_type?: 'Remote' | 'Hybrid' | 'On-site' | null;
          salary?: string | null;
          status?: 'saved' | 'applied' | 'interview' | 'case_study' | 'offer' | 'rejected';
          applied_date?: string | null;
          notes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          industry: string | null;
          location: string | null;
          rating: number | null;
          open_positions_count: number;
          status: 'Target' | 'Researching' | 'Applied' | 'Contacted' | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          industry?: string | null;
          location?: string | null;
          rating?: number | null;
          open_positions_count?: number;
          status?: 'Target' | 'Researching' | 'Applied' | 'Contacted' | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          industry?: string | null;
          location?: string | null;
          rating?: number | null;
          open_positions_count?: number;
          status?: 'Target' | 'Researching' | 'Applied' | 'Contacted' | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          category: 'CV / Özgeçmiş' | 'Ön Mektup' | 'Mülakat Takip' | 'E-posta';
          description: string | null;
          content: string | null;
          usage_count: number;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          category: 'CV / Özgeçmiş' | 'Ön Mektup' | 'Mülakat Takip' | 'E-posta';
          description?: string | null;
          content?: string | null;
          usage_count?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          category?: 'CV / Özgeçmiş' | 'Ön Mektup' | 'Mülakat Takip' | 'E-posta';
          description?: string | null;
          content?: string | null;
          usage_count?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      reminders: {
        Row: {
          id: string;
          user_id: string;
          application_id: string | null;
          title: string;
          description: string | null;
          due_date: string;
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          application_id?: string | null;
          title: string;
          description?: string | null;
          due_date: string;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          application_id?: string | null;
          title?: string;
          description?: string | null;
          due_date?: string;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          application_id: string | null;
          title: string;
          file_path: string;
          file_size: number | null;
          file_type: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          application_id?: string | null;
          title: string;
          file_path: string;
          file_size?: number | null;
          file_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          application_id?: string | null;
          title?: string;
          file_path?: string;
          file_size?: number | null;
          file_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
