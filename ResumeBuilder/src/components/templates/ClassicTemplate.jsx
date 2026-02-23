import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-zinc-800 shadow-xl rounded-lg overflow-hidden">

      {/* Accent Top Bar */}
      <div className="h-2" style={{ backgroundColor: accentColor }}></div>

      <div className="p-10">

        {/* ================= HEADER ================= */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            {data.personal_info?.full_name || "Your Name"}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: accentColor }} />
                {data.personal_info.email}
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: accentColor }} />
                {data.personal_info.phone}
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: accentColor }} />
                {data.personal_info.location}
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin size={14} style={{ color: accentColor }} />
                {data.personal_info.linkedin}
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2 break-all">
                <Globe size={14} style={{ color: accentColor }} />
                {data.personal_info.website}
              </div>
            )}
          </div>
        </header>

        {/* ================= SUMMARY ================= */}
        {data.professional_summary && (
          <section className="mb-10">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-4"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>

            <p className="text-sm leading-relaxed text-zinc-700">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {data.experience?.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-6"
              style={{ color: accentColor }}
            >
              Professional Experience
            </h2>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2" style={{ borderColor: accentColor + "40" }}>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-zinc-900">
                        {exp.position}
                      </h3>
                      <p className="text-sm font-medium text-zinc-600">
                        {exp.company}
                      </p>
                    </div>

                    <span className="text-xs text-zinc-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  {exp.description && (
                    <div className="mt-3 text-sm text-zinc-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= PROJECTS ================= */}
        {data.projects?.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-6"
              style={{ color: accentColor }}
            >
              Projects
            </h2>

            <div className="space-y-6">
              {data.projects.map((proj, index) => (
                <div key={index} className="pl-6 border-l-2" style={{ borderColor: accentColor + "40" }}>
                  <h3 className="font-semibold text-zinc-900">
                    {proj.name}
                  </h3>

                  {proj.description && (
                    <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= EDUCATION ================= */}
        {data.education?.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-6"
              style={{ color: accentColor }}
            >
              Education
            </h2>

            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-zinc-500 mt-1">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-zinc-500">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SKILLS ================= */}
        {data.skills?.length > 0 && (
          <section>
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-6"
              style={{ color: accentColor }}
            >
              Core Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 rounded-full border"
                  style={{
                    borderColor: accentColor + "50",
                    color: accentColor,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ClassicTemplate;