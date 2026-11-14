import { supabase } from "@utils/supabase";
import type { projectInterface } from "@components/types/Interface";

export async function getProjectRoutes() {
  const { data, error } = await supabase
    .rpc("get_projects")
    .select("category,prefix_url")
    .returns<Pick<projectInterface, "category" | "prefix_url">[]>();

  if (error) throw error;

  if (!Array.isArray(data)) return [];

  return (data ?? []).map(
    (project) =>
      `/project-detail/${project.category}/${project.prefix_url}`
  );
}
