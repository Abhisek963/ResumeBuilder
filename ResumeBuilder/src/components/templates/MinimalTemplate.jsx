const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-zinc-900 px-12 py-14">

      {/* ================= HEADER ================= */}
      <header className="mb-14">
        <h1 className="text-5xl font-light tracking-tight">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-500">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {data.professional_summary && (
        <section className="mb-14">
          <p className="text-lg leading-relaxed text-zinc-700">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section className="mb-14">
          <h2
            className="text-xs uppercase tracking-[0.25em] font-semibold mb-10"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-10">
            {data.experience.map((exp, index) => (
              <div key={index}>

                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xl font-medium">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <span className="text-sm text-zinc-400">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current
                      ? "Present"
                      : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <p className="mt-4 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section className="mb-14">
          <h2
            className="text-xs uppercase tracking-[0.25em] font-semibold mb-10"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-8">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium">
                  {proj.name}
                </h3>

                {proj.description && (
                  <p className="mt-3 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
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
        <section className="mb-14">
          <h2
            className="text-xs uppercase tracking-[0.25em] font-semibold mb-10"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    {edu.institution}
                  </p>
                </div>

                <span className="text-sm text-zinc-400">
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
            className="text-xs uppercase tracking-[0.25em] font-semibold mb-8"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs px-4 py-1.5 border rounded-full"
                style={{
                  borderColor: accentColor + "60",
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
  );
};

export default MinimalTemplate;