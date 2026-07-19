// Minimal White — Clean, minimalist portfolio template

export interface PortfolioContent {
  name: string;
  headline: string;
  about: string;
  avatar?: string;
  location?: string;
  email?: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    period: string;
  }[];
  projects: {
    title: string;
    description: string;
    tech: string[];
    url?: string;
  }[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const container = "mx-auto max-w-4xl px-4 sm:px-6";
const section = "py-16 sm:py-24";
const gradientText = "bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent";

export function MinimalWhiteTemplate({ content }: { content: PortfolioContent }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header / Hero */}
      <header className={`${section} ${container} text-center`}>
        {content.avatar && (
          <img
            src={content.avatar}
            alt={content.name}
            className="mx-auto mb-6 h-24 w-24 rounded-full border-2 border-zinc-200 object-cover"
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {content.name}
        </h1>
        <p className="mt-4 text-xl text-zinc-500">
          {content.headline}
        </p>
        {content.location && (
          <p className="mt-2 text-sm text-zinc-400">{content.location}</p>
        )}
        <div className="mt-8 flex items-center justify-center gap-4">
          {content.email && (
            <a
              href={`mailto:${content.email}`}
              className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Get in touch
            </a>
          )}
          {content.socialLinks?.linkedin && (
            <a
              href={content.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-200 px-6 py-2 text-sm font-medium transition-colors hover:bg-zinc-50"
            >
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* About */}
      <section className="bg-zinc-50">
        <div className={`${section} ${container}`}>
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            About <span className={gradientText}>Me</span>
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600">
            {content.about}
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className={`${section} ${container}`}>
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          Skills &amp;{" "}
          <span className={gradientText}>Technologies</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          {content.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="bg-zinc-50">
        <div className={`${section} ${container}`}>
          <h2 className="mb-12 text-2xl font-bold tracking-tight sm:text-3xl">
            Professional{" "}
            <span className={gradientText}>Experience</span>
          </h2>
          <div className="space-y-10">
            {content.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-zinc-200 pl-6">
                <div className="mb-1 text-sm text-zinc-400">{exp.period}</div>
                <h3 className="text-lg font-semibold">
                  {exp.role} ·{" "}
                  <span className="text-zinc-500">{exp.company}</span>
                </h3>
                <p className="mt-2 text-zinc-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className={`${section} ${container}`}>
        <h2 className="mb-12 text-2xl font-bold tracking-tight sm:text-3xl">
          Featured{" "}
          <span className={gradientText}>Projects</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {content.projects.map((project, i) => (
            <div
              key={i}
              className="group rounded-xl border border-zinc-200 p-6 transition-all hover:border-zinc-400 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-zinc-900 underline underline-offset-2"
                >
                  View project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-zinc-50">
        <div className={`${section} ${container}`}>
          <h2 className="mb-12 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className={gradientText}>Education</span>
          </h2>
          <div className="space-y-8">
            {content.education.map((edu, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-zinc-500">{edu.school}</p>
                </div>
                <span className="text-sm text-zinc-400">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className={`${container} py-8 text-center`}>
          <p className="text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} {content.name}. Built with{" "}
            <a
              href="https://portfolioverse.ai"
              className="font-medium text-zinc-900 underline underline-offset-2"
            >
              PortfolioVerse
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
