import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;

export const projectSelect =
  "id,title,title_thumbnail,title_short,short_desc,stacks,stack_colors,period,status_category,category,app_type,status,status_thumbnail,prefix_url,vendor,image_url,asset_url,demo_url,overviews,problem_solving,role,durations,category_note,impact_branch,impact_branch_count,impact_hr,impact_hr_count,impact_incident,impact_incident_count,descriptions,challenge_1,challenge_2,solution_1,solution_2,technical_note,technical_code,technical_code_title,result_note,results_1,results_2,results_3,results_4,results_5,results_6";

export interface Project {
  id: number;
  title: string;
  title_thumbnail: string;
  title_short: string;
  short_desc: string;
  stacks: string;
  stack_colors: string;
  period: string;
  status_category: string;
  category: string;
  app_type: string;
  status: string;
  status_thumbnail: string;
  prefix_url: string;
  vendor: string;
  image_url: string;
  asset_url?: string | null;
  demo_url: string;
  overviews: string;
  problem_solving: string;
  role: string;
  durations: string;
  category_note: string;
  impact_branch: string;
  impact_branch_count: string;
  impact_hr: string;
  impact_hr_count: string;
  impact_incident: string;
  impact_incident_count: string;
  descriptions: string;
  challenge_1: string;
  challenge_2: string;
  solution_1: string;
  solution_2: string;
  technical_note: string;
  technical_code: string;
  technical_code_title: string;
  result_note: string;
  results_1: string;
  results_2: string;
  results_3: string;
  results_4: string;
  results_5: string;
  results_6: string;
}

export interface Service {
  id: number;
  num: string;
  icon: string;
  title: string;
  description: string;
  highlight: boolean;
  stacks: string;
}

export interface Price {
  id: number;
  prefix: string;
  price: string;
  state: string;
  services_id: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  avatar: string;
  name: string;
  role: string;
  types: string;
}

export interface TimelineItem {
  id: number;
  dot: string;
  labels: string;
  name: string;
  desc: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  join_date: string;
  role: string;
  job_desc: string;
  stack_name: string;
}

export interface Category {
  id: string;
  name: string;
}
