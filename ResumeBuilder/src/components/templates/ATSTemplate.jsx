import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ATSTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 px-10 py-8 leading-relaxed" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* ================= HEADER ================= */}
      <header className="mb-4">
        <div className="flex justify-between items-start">
          {/* Left: Name + links */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-1 text-sm mb-0.5" style={{ color: accentColor }}>
                <Linkedin className="size-3.5" />
                <span>{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-1 text-sm" style={{ color: accentColor }}>
                <Globe className="size-3.5" />
                <span>{data.personal_info.website}</span>
              </div>
            )}
          </div>

          {/* Right: Email + Phone */}
          <div className="text-sm text-gray-700 text-right space-y-1 mt-1">
            {data.personal_info?.email && (
              <div className="flex items-center justify-end gap-1.5">
                <span>Email: {data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center justify-end gap-1.5">
                <span>Mobile: {data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{data.personal_info.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <hr className="border-gray-400 mb-5" />

      {/* ================= EDUCATION ================= */}
      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-center uppercase tracking-widest text-gray-900 mb-3">
            Education
          </h2>
          <hr className="border-gray-300 mb-3" />

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{edu.institution}</p>
                  <p className="text-sm text-gray-700">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                    {edu.gpa ? `; GPA: ${edu.gpa}` : ""}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-700 shrink-0 ml-4">
                  <p className="font-semibold">{edu.location || ""}</p>
                  <p>{formatDate(edu.start_date)} {edu.start_date && "- "}{formatDate(edu.graduation_date)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <hr className="border-gray-300 mb-5" />

      {/* ================= SKILLS ================= */}
      {data.skills?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-center uppercase tracking-widest text-gray-900 mb-3">
            Skills Summary
          </h2>
          <hr className="border-gray-300 mb-3" />

          {data.skill_categories ? (
            <div className="space-y-1.5 text-sm">
              {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-bold text-gray-900 w-28 shrink-0">• {cat}:</span>
                  <span className="text-gray-700">{Array.isArray(skills) ? skills.join(", ") : skills}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1.5 text-sm">
              <div className="flex gap-2">
                <span className="font-bold text-gray-900 w-28 shrink-0">• Skills:</span>
                <span className="text-gray-700">{data.skills.join(", ")}</span>
              </div>
            </div>
          )}
        </section>
      )}

      <hr className="border-gray-300 mb-5" />

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-center uppercase tracking-widest text-gray-900 mb-3">
            Work Experience
          </h2>
          <hr className="border-gray-300 mb-3" />

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold text-gray-900 text-sm">
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span className="text-sm text-gray-700"> | {exp.company}</span>
                    )}
                    {exp.link && (
                      <span className="text-sm ml-1" style={{ color: accentColor }}> | <a href={exp.link} style={{ color: accentColor }}>LINK</a></span>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 shrink-0 ml-4">
                    {formatDate(exp.start_date)}{exp.start_date && " - "}{exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <ul className="mt-1 space-y-1">
                    {exp.description.split("\n").filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="shrink-0 mt-0.5">○</span>
                        <span>{line.replace(/^[-•○]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <hr className="border-gray-300 mb-5" />

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-center uppercase tracking-widest text-gray-900 mb-3">
            Projects
          </h2>
          <hr className="border-gray-300 mb-3" />

          <div className="space-y-4">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{proj.name}</span>
                    {proj.link && (
                      <span className="text-sm ml-1" style={{ color: accentColor }}>| <a href={proj.link} style={{ color: accentColor }}>LINK</a></span>
                    )}
                  </div>
                  {(proj.start_date || proj.end_date) && (
                    <span className="text-sm text-gray-700 shrink-0 ml-4">
                      {formatDate(proj.start_date)}{proj.start_date && proj.end_date && " - "}{formatDate(proj.end_date)}
                    </span>
                  )}
                </div>

                {proj.description && (
                  <ul className="mt-1 space-y-1">
                    {proj.description.split("\n").filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="shrink-0 mt-0.5">○</span>
                        <span>{line.replace(/^[-•○]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROFESSIONAL SUMMARY ================= */}
      {data.professional_summary && (
        <>
          <hr className="border-gray-300 mb-5" />
          <section className="mb-5">
            <h2 className="text-sm font-bold text-center uppercase tracking-widest text-gray-900 mb-3">
              Professional Summary
            </h2>
            <hr className="border-gray-300 mb-3" />
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {data.professional_summary}
            </p>
          </section>
        </>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {data.certifications?.length > 0 && (
        <>
          <hr className="border-gray-300 mb-5" />
          <section className="mb-5">
            <h2 className="text-sm font-bold text-center uppercase tracking-widest text-gray-900 mb-3">
              Certificates
            </h2>
            <hr className="border-gray-300 mb-3" />

            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{cert.name}</span>
                      {cert.issuer && <span className="text-sm text-gray-700"> ({cert.issuer})</span>}
                      {cert.link && (
                        <span className="text-sm ml-1" style={{ color: accentColor }}>| <a href={cert.link} style={{ color: accentColor }}>CERTIFICATE</a></span>
                      )}
                    </div>
                    {cert.date && (
                      <span className="text-sm text-gray-700 shrink-0 ml-4">{formatDate(cert.date)}</span>
                    )}
                  </div>
                  {cert.description && (
                    <ul className="mt-1 space-y-1">
                      {cert.description.split("\n").filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm text-gray-700 flex gap-2">
                          <span className="shrink-0 mt-0.5">○</span>
                          <span>{line.replace(/^[-•○]\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};

export default ATSTemplate;