import type {
  PriceServiceInterface,
  projectInterface,
  ServiceInterface,
  TestimonialInterface,
  TimelineInterface,
} from "@components/types/Interface";
import { supabase } from "@utils/supabase";
export async function getHomeData() {
const defaultPrefix = "USD";
  const [projects,services,price, testimonials, timeline] = await Promise.all([
    // Query Projects
    supabase
      .rpc("get_projects_random")
      .select(
        "id,title_short,stacks,vendor,status_category,short_desc,stack_colors,category,prefix_url",
      )
      .eq("status_project_primary", "primary")
      .limit(3)
      .returns<projectInterface[]>(),
    // Query Services
    supabase
      .rpc("get_services")
      .returns<ServiceInterface[]>(),
    // Query Price
    supabase
      .from("pricelist")
      .select("id,prefix,price,state,services_id")
      .eq("prefix", defaultPrefix.toUpperCase())
      .limit(3)
      .returns<PriceServiceInterface[]>(),
    // Query Testimonials
    supabase
      .from("testimonials")
      .select(
        "*",
      ).order('id', { ascending: true })
      .returns<TestimonialInterface[]>(),
    // Query Timeline
     supabase
      .from("timelines")
      .select(
        "*",
      ).order('id', { ascending: true })
      .returns<TimelineInterface[]>(),
  ]);
  if (projects.error) throw projects.error;
   const projectsData = (
        Array.isArray(projects.data) ? projects.data : []
      ) as projectInterface[];
  if (services.error) throw services.error;
   const servicesData = (
        Array.isArray(services.data) ? services.data : []
      ) as ServiceInterface[];
  if (price.error) throw price.error;
  if (testimonials.error) throw testimonials.error;
  if (timeline.error) throw timeline.error;

   return {
    projects: projectsData,
    services: servicesData,
    price: price.data ?? [],
    testimonials: testimonials.data ?? [],
    timeline: timeline.data ?? [],
    defaultPrefix,
  };
}
