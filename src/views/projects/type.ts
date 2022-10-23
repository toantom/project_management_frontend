export interface Project {
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
  employee: object[] | null;
}
export interface Option {
  value: number;
  label: string;
}
