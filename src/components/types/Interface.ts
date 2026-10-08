export interface ClientInterface {
  id: number;
  logo: string;
  is_logo: boolean;
  animation: string;
  color: "teal" | "rust" | "dual";
  company: string;
  industry: string;
  description: string;
  lables: string;
  icon: string;
  strongs: string;
  normals: string;
  period: string;
  status: string;
  stacks: string;
  stack_colors: string;
}

export interface TestimonialInterface{
  id:number,
  quote:string,
  avatar:string,
  name:string,
  role:string,
  types:string
}
export interface TimelineInterface{
  id:number,
  dot:string,
  labels:string,
  name:string,
  desc:string,
}

export interface ServiceInterface{
  id:number,
  num:string,
  icon:string,
  title:string,
  description:string,
  highlight:boolean,
  stacks:string,
}
export interface ExperienceInterface{
  id:number,
  company:string,
  join_date:string,
  role:string,
  job_desc:string,
  stacks:string,
}
export interface PriceServiceInterface{
  id:number,
  prefix:string,
  price:string,
  state:string,
  services_id:number,
}

export interface AuroraInterface{
  card?:string,
  tl?:string,
  iconclass?:string,
  icon?:string,
  title?:string,
  desc?:string,
  tag?:string,
  tagclass?:string
}

export interface TechCardsFace{
  card?:string[]
}

export interface projectInterface{
  id:number,
  vendor:string,
  category:string,
  title:string,
  title_thumbnail:string,
  short_desc:string,
  overviews:string,
  problem_solving:string,
  stacks:string,
  role:string,
  period:string,
  stack_colors:string,
  durations:string,
  descriptions:string,
  category_note:string,
  impact_branch:string,
  impact_branch_count:string,
  impact_hr:string,
  impact_hr_count:string,
  impact_incident:string,
  impact_incident_count:string,
  challenge_1:string,
  challenge_2:string,
  solution_1:string,
  solution_2:string,
  technical_code:string,
  technical_code_title:string,
  technical_note:string,
  result_note:string,
  status_thumbnail:string,
  status:string,
  status_category:string,
  image_url:string,
  demo_url:string,
}