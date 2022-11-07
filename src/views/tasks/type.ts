import { Option } from "@/views/projects/type";

export interface TaskCreate {
  task_title: string;
  task_content: string;
  assignee_id: Option | null;
  accountable_id: Option | null;
  estimate_time: number | null;
  start_date: string;
  end_date: string;
  type: Option | null;
  created_by: string;
  updated_by: string;
  parent: number | null;
  backlog_id: Option | null;
  priority: Option | null;
  progress: number;
  project_id: number;
}
