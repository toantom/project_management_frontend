export interface ProjectCreate {
  id: string;
  title: string;
  short_name: string;
  priority: Option | null;
  project_description: string;
  project_type: Option | null;
  start_date: string;
  end_date: string;
  project_manager: Option | null;
  status: number | null;
  public: Option | null;
  created_by_id: string;
  updated_by_id: string;
  employees: Option[];
}
export interface Option {
  value: number;
  label: string;
}

export interface Backlog {
  id: number;
  backlog_title: string;
  project_id: number;
  start_date: string;
  end_date: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface BacklogCreate {
  backlog_title: string;
  start_date: string;
  end_date: string;
}
