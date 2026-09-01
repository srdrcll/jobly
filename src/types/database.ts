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
          status: 'saved' | 'applied' | 'contacted' | 'interview' | 'case_study' | 'offer' | 'rejected';
          applied_date: string | null;
          notes_count: number;
          target_role: string | null;
          priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik' | null;
          job_url: string | null;
          contact_name: string | null;
          contact_email: string | null;
          source: string | null;
          notes: string | null;
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
          status: 'saved' | 'applied' | 'contacted' | 'interview' | 'case_study' | 'offer' | 'rejected';
          applied_date?: string | null;
          notes_count?: number;
          target_role?: string | null;
          priority?: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik' | null;
          job_url?: string | null;
          contact_name?: string | null;
          contact_email?: string | null;
          source?: string | null;
          notes?: string | null;
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
          status?: 'saved' | 'applied' | 'contacted' | 'interview' | 'case_study' | 'offer' | 'rejected';
          applied_date?: string | null;
          notes_count?: number;
          target_role?: string | null;
          priority?: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik' | null;
          job_url?: string | null;
          contact_name?: string | null;
          contact_email?: string | null;
          source?: string | null;
          notes?: string | null;
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
          status: 'Target' | 'Applied' | 'Interviewed' | 'Offer' | 'Archived' | 'Researching' | 'Contacted' | null;
          website: string | null;
          company_size: string | null;
          contact_person: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          linkedin_url: string | null;
          career_page_url: string | null;
          notes: string | null;
          is_favorite: boolean;
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
          status?: 'Target' | 'Applied' | 'Interviewed' | 'Offer' | 'Archived' | 'Researching' | 'Contacted' | null;
          website?: string | null;
          company_size?: string | null;
          contact_person?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          linkedin_url?: string | null;
          career_page_url?: string | null;
          notes?: string | null;
          is_favorite?: boolean;
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
          status?: 'Target' | 'Applied' | 'Interviewed' | 'Offer' | 'Archived' | 'Researching' | 'Contacted' | null;
          website?: string | null;
          company_size?: string | null;
          contact_person?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          linkedin_url?: string | null;
          career_page_url?: string | null;
          notes?: string | null;
          is_favorite?: boolean;
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
      interviews: {
        Row: {
          id: string;
          user_id: string;
          application_id: string | null;
          company_name: string;
          position: string;
          stage: string;
          type: 'Online' | 'On-site' | 'Phone' | 'Hybrid';
          date: string;
          time: string;
          duration_minutes: number;
          interviewer_name: string | null;
          interviewer_role: string | null;
          meeting_link: string | null;
          location: string | null;
          prep_notes: string | null;
          interview_notes: string | null;
          result: 'Pending' | 'Passed' | 'Failed' | 'Offer';
          follow_up_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          application_id?: string | null;
          company_name: string;
          position: string;
          stage?: string;
          type?: 'Online' | 'On-site' | 'Phone' | 'Hybrid';
          date: string;
          time?: string;
          duration_minutes?: number;
          interviewer_name?: string | null;
          interviewer_role?: string | null;
          meeting_link?: string | null;
          location?: string | null;
          prep_notes?: string | null;
          interview_notes?: string | null;
          result?: 'Pending' | 'Passed' | 'Failed' | 'Offer';
          follow_up_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          application_id?: string | null;
          company_name?: string;
          position?: string;
          stage?: string;
          type?: 'Online' | 'On-site' | 'Phone' | 'Hybrid';
          date?: string;
          time?: string;
          duration_minutes?: number;
          interviewer_name?: string | null;
          interviewer_role?: string | null;
          meeting_link?: string | null;
          location?: string | null;
          prep_notes?: string | null;
          interview_notes?: string | null;
          result?: 'Pending' | 'Passed' | 'Failed' | 'Offer';
          follow_up_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
