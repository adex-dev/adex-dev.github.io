import React, { useEffect, useState } from "react";
import { Sections, CodeBlock } from "@components/atom";
import { useParams, Link,useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { useResponsive } from "@responsive/useResponsive";
import { supabase } from "@utils/supabase";
import sample from "@assets/sample.png";
import type { projectInterface } from "@components/types/Interface";
const ProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const { stack, id } = useParams();
  const { config } = useResponsive();
  const [projectMaps, setProjectMaps] = useState<projectInterface[]>([]);
  const [projectRandom, setProjectRandom] = useState<projectInterface[]>([]);
  const getData = async (stack: string,id: string) => {
    try {
      const { data, error } = await supabase
        .rpc("get_projects")
        .eq("category",stack.toLocaleLowerCase())
        .eq("id", id)
        .returns<projectInterface[]>();
      if (error) throw error;
   const projectData = Array.isArray(data) ? data : [];

   if (projectData.length === 0) {
     return navigate("/notfound", { replace: true });
   }
      setProjectMaps(projectData);
      const { data: datax, error: err } = await supabase
        .rpc("get_projects_random")
        .select("id,title_short,stacks,vendor,status_category")
        .eq("category",stack.toLocaleLowerCase())
        .not("id", "in", `(${id})`)
        .limit(3)
        .returns<projectInterface[]>();
      if (err) throw err;
      const projectRand = Array.isArray(datax) ? datax : [];
      setProjectRandom(projectRand);
    } catch (error) {
      setProjectMaps([]);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id ||!stack) return;

    getData(stack,id);
  }, [stack,id]);

  const project = projectMaps[0];
  return (
    <>
      <Helmet>
        <title>{project?.title_short}</title>
        <meta name="description" content={project?.short_desc} key="desc" />
        <meta
          name="keywords"
          content={`akmadnudin,Project Detail,Akmad Nudin,Full Stack Engineer Indonesia,${project?.stacks?.replace(/;/g, ",") ?? ""}`}
          key="kw"
        />
        ,
      </Helmet>
      <div className="breadcrump-project">
        <p className="hidden">{id}</p>
        <Link to="/">Home</Link>
        <span className="breadcrump-sep">/</span>
        <Link to="/project-list">{stack}</Link>
        <span className="breadcrump-sep">/</span>
        <span id="bc-title">{project?.title_short}</span>
      </div>
      <Sections
        id="projectsDetail"
        className={`default-section ${config.section.default} detail-hero-project mb-0! pb-0.5! h-auto!`}>
        <div className="box-eyebrow-poject">
          <div className="eyebrow-project-left">
            <div className="eyebrow-project-type">
              <span className="project-type-dot prod" id="p-type-dot"></span>
              <span id="p-type">
                {project?.status_category} · {project?.vendor}
              </span>
            </div>
            <h2
              className={`${config.standard.header} mb-0.5! tracking-[-0.03em]! text-[2rem]!`}>
              {project?.title}
            </h2>
            <p
              className={`${config.standard.desc} text-xs! max-w-[600px]! leading-1.7`}>
              {project?.short_desc}
            </p>
          </div>
          <div className="eyebrow-project-status">
            <span className="capitalize">
              {project?.status} in {project?.status_category}
            </span>
          </div>
        </div>
        <div className="preview-wrap">
          <div className="browser-chrome">
            <div className="b-dots">
              <div className="b-dot r"></div>
              <div className="b-dot y"></div>
              <div className="b-dot g"></div>
            </div>
            <div className="browser-bar">
              <p>{project?.demo_url ?? "www.sample-akmadnudin.co.id"}</p>
            </div>
          </div>
          <div className="preview-screens">
            <img
              src={project?.image_url ?? sample}
              className="w-full h-full absolute"
              alt="wdms sample"
            />
          </div>
        </div>
      </Sections>
      <div className="detail-body">
        <div className="detail-main">
          <section>
            <h2>Overview</h2>
            <p dangerouslySetInnerHTML={{ __html: project?.overviews }} />
          </section>
          <section>
            <h2>Problem Being Solved</h2>
            <p dangerouslySetInnerHTML={{ __html: project?.problem_solving }} />
          </section>
          <section>
            <h2>Key Features</h2>
            <ul>
              {project?.descriptions.split(";").map((f, fi) => {
                return <li key={fi}>{f}</li>;
              })}
            </ul>
          </section>
          <section>
            <h2>Challenges & Solutions</h2>
            <div className="cs-grid">
              <div className="cs-card">
                <div className="cs-label c">⚠ Challenge</div>
                <div className="cs-text">{project?.challenge_1}</div>
              </div>
              <div className="cs-card">
                <div className="cs-label s">✓ Solution</div>
                <div className="cs-text">{project?.solution_1}</div>
              </div>
            </div>
            <div className="cs-grid">
              <div className="cs-card">
                <div className="cs-label c">⚠ Challenge</div>
                <div className="cs-text">{project?.challenge_2}</div>
              </div>
              <div className="cs-card">
                <div className="cs-label s">✓ Solution</div>
                <div className="cs-text">{project?.solution_2}</div>
              </div>
            </div>
          </section>
          <section>
            <h2>Technical Implementation</h2>
            <p>{project?.technical_note}</p>
            <div className="code-block">
              <div className="code-bar">
                <div className="code-dots">
                  <div className="cd r"></div>
                  <div className="cd y"></div>
                  <div className="cd g"></div>
                </div>
                <span className="code-fname">
                  {project?.technical_code_title}
                </span>
              </div>
              <div className="code-body">
                <CodeBlock language="python">
                  {` ${project?.technical_code}`}
                </CodeBlock>
              </div>
            </div>
          </section>
          <section>
            <h2>Results</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-val">
                  {project?.impact_incident_count}
                </div>
                <div className="metric-label">Maintained</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">All</div>
                <div className="metric-label">Branches covered</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">Auto</div>
                <div className="metric-label">Monthly realization</div>
              </div>
            </div>
            <p
              style={{ marginTop: "1rem" }}
              dangerouslySetInnerHTML={{ __html: project?.result_note }}
            />
          </section>
        </div>
        <div className="detail-sidebar">
          <div className="s-card">
            <span className="s-card-title">Project Info</span>
            <div id="p-info">
              <div className="info-row">
                <span className="i-label">Client</span>
                <span className="i-val">{project?.vendor}</span>
              </div>
              <div className="info-row">
                <span className="i-label">Year</span>
                <span className="i-val">{project?.period}</span>
              </div>
              <div className="info-row">
                <span className="i-label">Duration</span>
                <span className="i-val">{project?.durations}</span>
              </div>
              <div className="info-row">
                <span className="i-label">Role</span>
                <span className="i-val">{project?.role}</span>
              </div>
              <div className="info-row">
                <span className="i-label">Category</span>
                <span className="i-val">{project?.category_note}</span>
              </div>
              <div className="info-row">
                <span className="i-label">Status</span>
                <span className="i-val">
                  <span className="i-val teal">● {project?.status}</span>
                </span>
              </div>
              {project?.demo_url && (
                <div className="info-row">
                  <span className="i-label">Demo</span>
                  <span className="i-val">
                    <span className="i-val teal">
                      <Link to={project?.demo_url} target="_blank">
                        {" "}
                        {project?.demo_url}{" "}
                      </Link>
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="s-card">
            <span className="s-card-title">Tech Stack</span>
            <div className="card-stack" id="p-stack">
              {project?.stacks.split(";").map((s, ky) => (
                <span
                  key={ky}
                  className={`card-tag ${config.standard.tag} ${/python|rust|flask/i.test(s) ? "rust" : ""}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="s-card">
            <span className="s-card-title">Impact</span>
            <div id="p-impact">
              <div className="info-row">
                <span className="i-label">{project?.impact_branch}</span>
                <span className="i-val teal">
                  {project?.impact_branch_count}
                </span>
              </div>
              <div className="info-row">
                <span className="i-label">{project?.impact_hr}</span>
                <span className="i-val teal">{project?.impact_hr_count}</span>
              </div>
              <div className="info-row">
                <span className="i-label">{project?.impact_incident}</span>
                <span className="i-val teal">
                  {project?.impact_incident_count}
                </span>
              </div>
            </div>
          </div>
          <div className="s-card">
            <span className="s-card-title">Interested in similar work?</span>
            <div className="sidebar-cta">
              <a href="mailto:akmadnudin.inc@gmail.com" className="btn-p">
                ✉ Contact Me
              </a>
              <a href="services.html" className="btn-o">
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="related-section">
          <h2>Other Project</h2>
          <div className="related-grid" id="p-related">
            {projectRandom.map((pr) => {
              return (
                <Link
                  to={`/project-detail/${stack}/${pr.id}`}
                  key={pr.id}
                  className="rc beam beam-rust">
                  <div className="rc-type">
                    {pr?.status_category} · {pr?.vendor}
                  </div>
                  <div className="rc-name">{pr.title_short}</div>
                  <div className="card-stack">
                    {pr.stacks.split(";").map((ps, pi) => (
                      <span
                        key={pi}
                        className={` card-tag ${config.standard.tag} `}>
                        {ps}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
