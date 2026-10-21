import { features } from "../content";
import { SectionHead } from "../components/bits";
import { ProjectGrid } from "../components/ProjectGrid";

export function ProjectsPage() {
  return (
    <section className="section page-top">
      <SectionHead
        as="h1"
        num="~/projects"
        title="projects"
        intro="robots, hardware, websites, and a few things i made just because. click one for the details."
      />
      <ProjectGrid items={features} />
    </section>
  );
}
