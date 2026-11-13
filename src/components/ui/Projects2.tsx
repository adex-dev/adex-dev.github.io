import { Sections, ComingSoon } from "@components/atom";
import LinkGlassCustome from "@components/atom/LinkGlassCustome";
import { useResponsive } from "@responsive/useResponsive";
import React, { useState, useEffect } from "react";
import { supabase } from "@utils/supabase";
import type {
  categoryInterface,
  projectInterface,
} from "@components/types/Interface";

interface Projects2Props {
  initialCategories: categoryInterface[];
  initialProjects: projectInterface[];
}
import { Loadings } from "@components/atom";

const Projects2: React.FC<Projects2Props> = ({
  initialCategories,
  initialProjects,
}) => {
  const [loading, setloading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState(initialCategories);
  const [project, setProjects] = useState(initialProjects);
  const { config } = useResponsive();
  const colors = ["rust", "teal", "yellow", "green", "purple"] as const;
  const textCorner = {
    rust: "#d34516",
    teal: "#38bdf8",
    yellow: "#ffbd2e",
    green: "#2dd4bf",
    purple: "#6366f1",
  } as const;

  const handleFilter = async (filters: string) => {
    setFilter(filters);
    setLoading(true);
    try {
      let query = supabase
        .rpc("get_projects")
        .select(
          "id,title_thumbnail,title_short,short_desc,stacks,stack_colors,period,status_category,category,app_type,status,status_thumbnail,prefix_url",
        );
      if (filters !== "all") {
        query = query.eq("category", filters.toLowerCase());
      }
      const { data, error } = await query
        .limit(100)
        .return<projectInterface[]>();
      if (error) throw error;
      setProjects(data ?? []);
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setloading(false);
    }
  };

  return (
    <Sections
      id="portfoliolist"
      className={`default-section ${config.section.default} lg-px-12!`}>
      <div className="flex flex-wrap gap-3 mb-12 reveal visible">
        <button
          onClick={() => handleFilter("all")}
          className={`filter-btn capitalize ${filter.toLocaleLowerCase() === "all" ? "active" : ""}`}>
          All
        </button>
        {categories.map((ct) => (
          <button
            key={ct.id}
            onClick={() => handleFilter(ct.name.toLocaleLowerCase())}
            className={`filter-btn capitalize ${ct.name.toLocaleLowerCase() === filter ? "active" : ""}`}>
            {ct.name}
          </button>
        ))}
      </div>
      <div className={`project-box ${config.project.box}`}>
        {loading ? (
          <Loadings />
        ) : project?.length ? (
          project.map((pj) => {
            const listStacks = pj.stacks.split(";");
            // const listStacksColor = project.stack_colors.split(";");
            const color = colors[pj.id % colors.length];
            return (
              <LinkGlassCustome
                links={`/project-detail/${pj.category}/${pj.prefix_url}`}
                color={textCorner[color]}
                tag={listStacks}
                desc={pj.short_desc}
                title={pj.title_short}
                corner={pj.status_category}
                period={pj.period}
                impact={pj.title_thumbnail}
                category={pj.category}
                live={`${pj.status} ${pj.status_thumbnail}`}
                apptype={pj.app_type}
                key={pj.id}></LinkGlassCustome>
            );
          })
        ) : (
          <ComingSoon />
        )}
      </div>
    </Sections>
  );
};

export default Projects2;
