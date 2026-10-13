import ProjectList from '@components/ui/ProjectList';
import ProjectDetail from '@components/ui/ProjectDetail';
type ProjectBaseProps = {
  endpoint?: 'base' | 'detail';
};

function ProjectBase({ endpoint = 'base' }: ProjectBaseProps) {
  return endpoint === 'base' ? <ProjectList /> : <ProjectDetail />;
}
export default ProjectBase;