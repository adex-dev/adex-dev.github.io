import { Sections } from "@components/atom";
import CardGlassCustome from "@components/atom/CardGlassCustome";
import { useResponsive } from "@responsive/useResponsive";
import React,{useState,useEffect} from "react";
import type { categoryInterface,projectInterface } from "@components/types/Interface";
import { supabase } from "@utils/supabase";
import { useNavigate } from "react-router";
const Projects2: React.FC = () => {
  const [filter, setFilter] = useState("all")
  const [categories,setCategories] = useState<categoryInterface[]>([]);
  const [project,setProjects] = useState<projectInterface[]>([]);
  const navigate = useNavigate();
  const handlerclick = (link: number) => {
    navigate(`/project-detail?id${link}`);
  };
  const { config } = useResponsive();
  const colors = ["rust", "teal", "yellow", "green","purple"] as const;
  const textCorner = {
    rust: "#d34516",
    teal: "#38bdf8",
    yellow: "#ffbd2e",
    green: "#2dd4bf",
    purple: "#6366f1",
  } as const;

  const getCategories = async ()=>{
    try {
    let query = supabase.from('categories').select("id,name")
      const {data,error} = await query;
      if(error) throw error;
      setCategories((data ?? []) as categoryInterface[])
    } catch (error) {
      console.error(error);
      setCategories([])
      setFilter('all')
    }
  }
  const getData = async (limit:number=100,where:string="all")=>{
    let maxData =where.toLocaleLowerCase() === 'all' ? 100 : limit;
    try {
    let query = supabase.rpc("get_projects").select("id,title_thumbnail,title_short,short_desc,stacks,stack_colors,period,status_category,category,app_type,status,status_thumbnail");
      if (where.toLocaleLowerCase() !='all') {
        query = query.eq('category',where.toLocaleLowerCase())
      }
      query = query.limit(maxData)
      const {data,error} = await query.returns<projectInterface[]>();
      if(error) throw error;
      const projectData = (Array.isArray(data) ? data : []) as projectInterface[]
      setProjects(projectData)
    } catch (error) {
      setProjects([])
      setFilter('all')
      console.error(error);
    }
  }
  const handleFilter = (filters : string) =>{
    setProjects([])
    setFilter(filters)
    getData(100,filters)
  }
  useEffect(() => {
    getCategories()
    getData()
  }, [])
  

  return (
    <Sections
      id='portfoliolist'
      className={`default-section ${config.section.default} lg-px-12!`}
    >
      <div className='flex flex-wrap gap-3 mb-12 reveal'>
        <button onClick={()=>handleFilter('all')} className={`filter-btn capitalize ${filter.toLocaleLowerCase() ==='all' ? 'active' :''}`}>All</button>
        {
          categories.map((ct) =>(
            <button key={ct.id} onClick={()=>handleFilter(ct.name.toLocaleLowerCase())} className={`filter-btn capitalize ${ct.name.toLocaleLowerCase() === filter ? 'active' : ''}` } >{ct.name}</button>
          ))
        }
      </div>
      <div className={`project-box ${config.project.box}`}>
        {project.map((pj) => {
          const listStacks = pj.stacks.split(";");
          // const listStacksColor = project.stack_colors.split(";");
          const color = colors[pj.id % colors.length];
          return (
            <CardGlassCustome
              onClick={() => handlerclick(pj.id)}
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
              key={pj.id}
            ></CardGlassCustome>
          );
        })}
      </div>
    </Sections>
  );
};

export default Projects2;
