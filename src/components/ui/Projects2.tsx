import { Sections, ComingSoon } from "@components/atom";
import LinkGlassCustome from "@components/atom/LinkGlassCustome";
import { useResponsive } from "@responsive/useResponsive";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@utils/supabase";
import { PROJECTS_PAGE_SIZE } from "@utils/projectListLoader";
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
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialProjects.length === PROJECTS_PAGE_SIZE,
  );
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [categories] = useState(initialCategories);
  const [project, setProjects] = useState(initialProjects);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const inFlightRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const { config } = useResponsive();
  const colors = ["rust", "teal", "yellow", "green", "purple"] as const;
  const textCorner = {
    rust: "#d34516",
    teal: "#38bdf8",
    yellow: "#ffbd2e",
    green: "#2dd4bf",
    purple: "#6366f1",
  } as const;

  const fetchPage = useCallback(async (
    category: string,
    offset: number,
    signal: AbortSignal,
  ) => {
    try {
      let query = supabase
        .rpc("get_projects")
        .select(
          "id,title_thumbnail,title_short,short_desc,stacks,stack_colors,period,status_category,category,app_type,status,status_thumbnail,prefix_url",
        )
        .order("id", { ascending: false })
        .range(offset, offset + PROJECTS_PAGE_SIZE - 1)
        .abortSignal(signal);
      if (category !== "all") {
        query = query.eq("category", category.toLowerCase());
      }
      const { data, error } = await query.returns<projectInterface[]>();
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (signal.aborted) return null;
      console.error(error);
      throw error;
    }
  }, []);

  const handleFilter = async (category: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    inFlightRef.current = false;
    setFilter(category);
    setProjects([]);
    setHasMore(true);
    setLoadError(false);
    setLoading(true);
    setLoadingMore(false);

    try {
      const data = await fetchPage(category, 0, controller.signal);
      if (!data || controller.signal.aborted) return;
      setProjects(data);
      setHasMore(data.length === PROJECTS_PAGE_SIZE);
    } catch {
      if (!controller.signal.aborted) setLoadError(true);
    } finally {
      if (controllerRef.current === controller) setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || inFlightRef.current) return;
    const controller = new AbortController();
    controllerRef.current?.abort();
    controllerRef.current = controller;
    inFlightRef.current = true;
    setLoadingMore(true);
    setLoadError(false);

    try {
      const data = await fetchPage(filter, project.length, controller.signal);
      if (!data || controller.signal.aborted) return;
      setProjects((current) => [...current, ...data]);
      setHasMore(data.length === PROJECTS_PAGE_SIZE);
    } catch {
      if (!controller.signal.aborted) setLoadError(true);
    } finally {
      if (controllerRef.current === controller) {
        inFlightRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [fetchPage, filter, hasMore, loading, project.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loading || loadError) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore();
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadError, loadMore, loading, loadingMore, project.length]);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return (
    <Sections
      id="portfoliolist"
      className={`default-section ${config.section.default} lg-px-12!`}>
      <div className="flex flex-wrap gap-3 mb-12 reveal visible">
        <button
          type="button"
          aria-pressed={filter.toLocaleLowerCase() === "all"}
          onClick={() => handleFilter("all")}
          className={`filter-btn capitalize ${filter.toLocaleLowerCase() === "all" ? "active" : ""}`}>
          All
        </button>
        {categories.map((ct) => (
          <button
            key={ct.id}
            type="button"
            aria-pressed={ct.name.toLocaleLowerCase() === filter}
            onClick={() => handleFilter(ct.name.toLocaleLowerCase())}
            className={`filter-btn capitalize ${ct.name.toLocaleLowerCase() === filter ? "active" : ""}`}>
            {ct.name}
          </button>
        ))}
      </div>
      <div className={`project-box ${config.project.box}`}>
        {loading && !project.length ? (
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
      <div
        ref={sentinelRef}
        className="project-load-more"
        aria-live="polite"
      >
        {loadError ? (
          <button type="button" className="filter-btn" onClick={() => void loadMore()}>
            Couldn't load projects. Try again
          </button>
        ) : loadingMore ? (
          <span>Loading more projects…</span>
        ) : hasMore ? (
          <button type="button" className="filter-btn" onClick={() => void loadMore()}>
            Load more projects
          </button>
        ) : project.length > 0 ? (
          <span>All projects loaded</span>
        ) : null}
      </div>
    </Sections>
  );
};

export default Projects2;
