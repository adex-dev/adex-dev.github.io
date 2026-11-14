import type { ExperienceInterface } from "@components/types/Interface";
import { supabase } from "@utils/supabase";

export async function getExperienceData() {
  const { data, error } = await supabase
    .rpc("get_experiences")
    .order("id", { ascending: false })
    .returns<ExperienceInterface[]>();

  if (error) throw error;
  return { experienceList: data ?? [] };
}
