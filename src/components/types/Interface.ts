export interface ClientInterface {
  id: number;
  logo: string;
  logotype: string;
  animation: string;
  color: "teal" | "rust" | "dual";
  company: string;
  industry: string;
  desc: string;
  buildlabel: string;
  builditem: {
    tagcolor: string;
    name: string;
  }[];
  resulticon: string;
  resulttext: {
    strong: string;
    normal: string;
  }[];
  year: string;
  status: string;
}

export interface TestimonialInterface{
  id:number,
  quote:string,
  avatar:string,
  name:string,
  role:string,
  variant:string
}
export interface TimelineInterface{
  id:number,
  dot:string,
  label:string,
  title:string,
  desc:string,
}

export interface AuroraInterface{
  card:string,
  tl:string,
  iconclass:string,
  icon:string,
  title:string,
  desc:string,
  tag:string,
  tagclass:string
}