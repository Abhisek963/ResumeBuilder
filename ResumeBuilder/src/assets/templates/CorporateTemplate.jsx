const CorporateTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800 grid grid-cols-3">
      {/* Sidebar */}
      <aside
        className="col-span-1 p-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-2xl font-bold mb-2">
          {data.personal_info?.full_name}
        </h1>
        <p className="text-sm opacity-90 mb-6">
          {data.personal_info?.profession}
        </p>

        <div className="space-y-3 text-sm">
          {data.personal_info?.email && <p>{data.personal_info.email}</p>}
          {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
          {data.personal_info?.location && <p>{data.personal_info.location}</p>}
        </div>

        {data.skills?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm uppercase tracking-widest mb-3">Skills</h2>
            <div className="space-y-2 text-sm">
              {data.skills.map((skill, i) => (
                <div key={i}>• {skill}</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="col-span-2 p-8">
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 border-b pb-1">
              Profile
            </h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 border-b pb-1">
              Experience
            </h2>

            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: accentColor }}>
                  {exp.company}
                </p>
                <p className="text-sm whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 border-b pb-1">
              Education
            </h2>

            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default CorporateTemplate;
