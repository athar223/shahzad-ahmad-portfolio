import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import VideoGallery from "@/components/VideoGallery";
import Reviews from "@/components/Reviews";
import Organizations from "@/components/Organizations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import SectionReveal from "@/components/SectionReveal";
import {
  getProjects, getVideos, getSkills, getReviews,
  getOrganizations, getExpertise, getSiteSettings,
  type SiteSettings, type ExpertiseItem,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects, videos, skills, reviews, organizations;
  let expertise: ExpertiseItem[] | undefined;
  let settings: SiteSettings | undefined;

  try {
    const [p, v, sk, r, o, e, st] = await Promise.all([
      getProjects(), getVideos(), getSkills(), getReviews(),
      getOrganizations(), getExpertise(), getSiteSettings(),
    ]);
    projects = p; videos = v; skills = sk; reviews = r;
    organizations = o; expertise = e; settings = st;
  } catch {
    // API not available — components will use fallback data
  }

  return (
    <>
      <Navbar cvUrl={settings?.cv_file} />
      <main>
        <Hero settings={settings} />

        <SectionDivider from="#FAFAF8" to="#FFFFFF" />
        <SectionReveal>
          <About settings={settings} expertise={expertise} />
        </SectionReveal>

        <SectionDivider from="#FFFFFF" to="#FAFAF8" />
        <SectionReveal>
          <Projects projects={projects} />
        </SectionReveal>

        <SectionDivider from="#FAFAF8" to="#FFFFFF" />
        <SectionReveal>
          <Skills skills={skills} />
        </SectionReveal>

        <SectionDivider from="#FFFFFF" to="#FAFAF8" />
        <SectionReveal>
          <VideoGallery videos={videos} />
        </SectionReveal>

        <SectionDivider from="#FAFAF8" to="#FFFFFF" />
        <SectionReveal>
          <Reviews reviews={reviews} />
        </SectionReveal>

        <SectionDivider from="#FFFFFF" to="#FAFAF8" />
        <SectionReveal>
          <Organizations organizations={organizations} />
        </SectionReveal>

        <SectionDivider from="#FAFAF8" to="#FFFFFF" />
        <SectionReveal>
          <Contact settings={settings} />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
