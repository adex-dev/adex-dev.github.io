
import type { projectInterface } from "@components/types/Interface";
import { supabase } from "@utils/supabase";

export async function getProjectDetail(
  stack: string,
  id: string
) {
  const { data, error } = await supabase
    .rpc("get_projects")
    .eq("category", stack.toLowerCase())
    .eq("prefix_url", id)
    .order('id', { ascending: false })
    .returns<projectInterface[]>();

  if (error) throw error;

  const projects = Array.isArray(data) ? data as projectInterface[] : [];
  const project = projects[0];

  if (!project) return null;

  const { data: related, error: relatedError } =
    await supabase
      .rpc("get_projects_random")
      .select(
        "id,title_short,stacks,vendor,status_category,prefix_url"
      )
      .eq("category", stack.toLowerCase())
      .not("prefix_url", "in", `(${id})`)
      .limit(3)
      .returns<projectInterface[]>();

  if (relatedError) throw relatedError;

  return {
    project,
    projectRandom: related ?? [],
  };
}
