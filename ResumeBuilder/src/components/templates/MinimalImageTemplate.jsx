import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-lg">
      <div className="grid grid-cols-3">
        {/* LEFT SIDEBAR */}
        <aside
          className="col-span-1 p-8 text-white"
          style={{ backgroundColor: accentColor }}
        >
          {/* Profile Image */}
          {data.personal_info?.image && (
            <div className="mb-8 flex justify-center">
              <img
                src={
                  typeof data.personal_info.image === "string"
                    ? data.personal_info.image
                    : URL.createObjectURL(data.personal_info.image)
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest mb-4 font-semibold opacity-80">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span className="break-all">{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-widest mb-4 font-semibold opacity-80">
                Skills
              </h2>
              <div className="space-y-2 text-sm">
                {data.skills.map((skill, index) => (
                  <div key={index}>• {skill}</div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="col-span-2 p-10">
          {/* Name + Title */}
          <div className="mb-10 border-b pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p
              className="mt-2 text-sm uppercase tracking-widest font-medium"
              style={{ color: accentColor }}
            >
              {data.personal_info?.profession || "Profession"}
            </p>
          </div>

          {/* Summary */}
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

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-sm uppercase tracking-widest font-semibold mb-6"
                style={{ color: accentColor }}
              >
                Experience
              </h2>

              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div key={index}>
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
                      <ul className="mt-3 list-disc list-inside text-sm text-zinc-700 space-y-1">
                        {exp.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section>
              <h2
                className="text-sm uppercase tracking-widest font-semibold mb-6"
                style={{ color: accentColor }}
              >
                Projects
              </h2>

              <div className="space-y-8">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-zinc-900">
                      {project.name}
                    </h3>
                    {project.type && (
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: accentColor }}
                      >
                        {project.type}
                      </p>
                    )}
                    {project.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
                        {project.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
