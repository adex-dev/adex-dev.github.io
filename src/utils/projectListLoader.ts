
import { supabase } from "@utils/supabase";
import { getProjectRoutes } from "@utils/prerenderLoader";
import type {
  categoryInterface, 
  projectInterface,
} from "@components/types/Interface";

export async function getProjectListData() {
  const [categoryResult, projectResult] = await Promise.all([
    supabase
      .from("categories")
      .select("id,name")
      .eq("status", "true"),

    supabase
      .rpc("get_projects")
      .select(
        "id,title_thumbnail,title_short,short_desc,stacks,stack_colors,period,status_category,category,app_type,status,status_thumbnail,prefix_url"
      )
      .limit(100)
      .returns<projectInterface[]>(),
  ]);

  if (categoryResult.error) {
    throw categoryResult.error;
  }

  if (projectResult.error) {
    throw projectResult.error;
  }

  return {
    categories: (categoryResult.data ?? []) as categoryInterface[],
    projects: (projectResult.data ?? []) as projectInterface[],
  };
}
