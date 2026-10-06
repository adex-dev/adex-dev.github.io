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