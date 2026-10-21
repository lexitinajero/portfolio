import { SectionHead } from "../components/bits";
import { Reveal } from "../components/Reveal";
import { Scrapbook } from "../components/Scrapbook";

export function MomentsPage() {
  return (
    <section className="section page-top">
      <SectionHead as="h1" num="~/moments" title="moments" intro="life outside the lab." />
      <Reveal>
        <Scrapbook />
      </Reveal>
    </section>
  );
}
