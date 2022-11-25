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
  parent_id: number | null;
  backlog_id: Option | null;
  priority: Option | null;
  progress: number;
  project_id: string;
  status: Option | null;
}

export interface Task {
  task_title: string;
  task_content: string | null;
  assignee_id: TaskUserInfo | null;
  accountable_id: TaskUserInfo | null;
  estimate_time: number | null;
  start_date: string | null;
  end_date: string | null;
  type: object | null;
  created_by: TaskUserInfo;
  updated_by: TaskUserInfo;
  parent_id: number | null;
  backlog_id: { id: number; backlog_title: string } | null;
  priority: Option | undefined;
  progress: number;
  project_id: string;
  status: number;
}

export interface TaskUserInfo {
  id: number;
  name: string;
}
