import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const TimelineTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 p-10 leading-relaxed">

      {/* ================= HEADER ================= */}
      <header className="mb-12">
        <h1
          className="text-4xl font-bold mb-3 tracking-wide"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <p className="text-gray-600 mb-4 uppercase tracking-wider text-sm">
          {data.personal_info?.profession || "Your Profession"}
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Linkedin className="size-4" />
              <span>{data.personal_info.linkedin}</span>
            </div>
          )}

          {data.personal_info?.website && (
            <div className="flex items-center gap-2 break-all">
              <Globe className="size-4" />
              <span>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {data.professional_summary && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase tracking-widest font-semibold mb-6"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>

          <p className="text-gray-700 whitespace-pre-line">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase tracking-widest font-semibold mb-8"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div
            className="relative border-l-2 pl-10 space-y-12"
            style={{ borderColor: accentColor }}
          >
            {data.experience.map((exp, index) => (
              <div key={index} className="relative">

                {/* Timeline Dot */}
                <span
                  className="absolute -left-[20px] top-2 w-3 h-3  rounded-full bg-white border-2"
                  style={{ borderColor: accentColor }}
                />

                <div className="flex justify-between items-start gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {exp.company}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <p className="mt-4 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase tracking-widest font-semibold mb-8"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div
            className="relative border-l-2 pl-10 space-y-8"
            style={{ borderColor: accentColor }}
          >
            {data.projects.map((proj, index) => (
              <div key={index} className="relative">

                <span
                  className="absolute -left-[20px] top-2 w-3 h-3 rounded-full bg-white border-2"
                  style={{ borderColor: accentColor }}
                />

                <h3 className="text-md font-semibold text-gray-900">
                  {proj.name}
                </h3>

                {proj.type && (
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: accentColor }}
                  >
                    {proj.type}
                  </p>
                )}

                {proj.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education && data.education.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase tracking-widest font-semibold mb-8"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>

                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-sm uppercase tracking-widest font-semibold mb-6"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1 text-sm rounded-full border"
                style={{ borderColor: accentColor, color: accentColor }}
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

export default TimelineTemplate;
