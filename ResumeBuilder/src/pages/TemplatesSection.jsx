import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookUserIcon, Check, X } from "lucide-react";

const dummyData = {
  personal_info: {
    full_name: "Abhi Singh",
    profession: "Software Engineer",
    email: "abhi@example.com",
    phone: "+91 98765 43210",
    location: "Kolkata, West Bengal",
    linkedin: "linkedin.com/in/abhi-singh",
    website: "abhisek.dev",
  },
  professional_summary:
    "Passionate software engineer with hands-on experience in full-stack web development. Skilled in React, Node.js, and building scalable applications. Quick learner with a strong foundation in data structures and algorithms.",
  experience: [
    {
      position: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      start_date: "2025-06",
      end_date: "2025-12",
      is_current: false,
      description:
        "Built reusable React components and improved page load time by 30%.\nCollaborated with designers to implement pixel-perfect UIs.\nIntegrated REST APIs and managed state with Redux.",
    },
    {
      position: "Web Development Intern",
      company: "StartupXYZ",
      start_date: "2025-01",
      end_date: "2025-05",
      is_current: false,
      description:
        "Developed landing pages and admin dashboards using React and Tailwind.\nWorked on backend APIs using Node.js and MongoDB.",
    },
  ],
  projects: [
    {
      name: "Resume Builder App",
      type: "Full Stack",
      description:
        "Built a full-stack resume builder with AI-powered suggestions, multiple templates, and PDF export. Used React, Node.js, MongoDB and integrated Claude AI.",
    },
    {
      name: "E-Commerce Platform",
      type: "Web App",
      description:
        "Developed a complete e-commerce platform with product listings, cart, payments via Razorpay, and an admin panel.",
    },
  ],
  education: [
    {
      degree: "B.Tech",
      field: "Computer Science",
      institution: "West Bengal University of Technology",
      graduation_date: "2026-05",
      gpa: "8.4",
    },
  ],
  skills: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "Git", "Python", "REST APIs"],
};

const templates = [
  { id: "classic",       name: "Classic",       tag: "Most Popular", tagColor: "#f59e0b", description: "Clean layout with accent top bar and bordered timeline. Perfect for corporate roles.", accentColor: "#2563EB", preview: "classic" },
  { id: "corporate",     name: "Corporate",     tag: "Executive",    tagColor: "#6366f1", description: "Bold dark sidebar with two-column layout. Ideal for senior positions.",               accentColor: "#10b981", preview: "corporate" },
  { id: "minimal-image", name: "Minimal + Photo",tag: "With Photo",  tagColor: "#ec4899", description: "Colored sidebar with profile photo. Great for creative professionals.",               accentColor: "#7c3aed", preview: "minimal-image" },
  { id: "minimal",       name: "Minimal",       tag: "Elegant",      tagColor: "#14b8a6", description: "Ultra-clean typography-first layout. Let your content speak.",                       accentColor: "#0f172a", preview: "minimal" },
  { id: "timeline",      name: "Timeline",      tag: "Modern",       tagColor: "#f43f5e", description: "Vertical timeline that visually narrates your career journey.",                      accentColor: "#dc2626", preview: "timeline" },
];

/* ── Thumbnail skeletons ── */
const ClassicPreview = ({ accent }) => (
  <div style={{ width: 380, height: 280, background: "white", padding: 20, fontFamily: "sans-serif", overflow: "hidden" }}>
    <div style={{ height: 6, background: accent, borderRadius: 2, marginBottom: 16 }} />
    <div style={{ height: 22, width: 180, background: "#1a1a2e", borderRadius: 4, marginBottom: 8 }} />
    <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
      {[0,1,2].map(i => <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:10,height:10,borderRadius:"50%",background:accent }}/><div style={{ height:8,width:80,background:"#e5e7eb",borderRadius:3 }}/></div>)}
    </div>
    {["Summary","Experience","Skills"].map((s,i) => (
      <div key={i} style={{ marginBottom:16 }}>
        <div style={{ height:9,width:100,background:accent,borderRadius:3,marginBottom:8,opacity:0.85 }}/>
        <div style={{ paddingLeft:12,borderLeft:`3px solid ${accent}40` }}>
          {i===2?<div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{[50,65,45,55,40].map((w,j)=><div key={j} style={{ height:18,width:w,border:`1px solid ${accent}60`,borderRadius:99 }}/>)}</div>
          :[90,70,80].map((w,j)=><div key={j} style={{ height:8,width:`${w}%`,background:"#e5e7eb",borderRadius:3,marginBottom:5 }}/>)}
        </div>
      </div>
    ))}
  </div>
);

const CorporatePreview = ({ accent }) => (
  <div style={{ width:380,height:280,background:"white",display:"flex",overflow:"hidden" }}>
    <div style={{ width:110,background:"#18181b",padding:16,flexShrink:0 }}>
      <div style={{ height:18,width:80,background:"white",borderRadius:3,marginBottom:6 }}/>
      <div style={{ height:8,width:60,background:"#71717a",borderRadius:2,marginBottom:14 }}/>
      <div style={{ height:1,background:"#3f3f46",marginBottom:12 }}/>
      {[0,1,2,3].map(i=><div key={i} style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}><div style={{ width:8,height:8,borderRadius:"50%",background:"#52525b" }}/><div style={{ height:7,width:55,background:"#3f3f46",borderRadius:2 }}/></div>)}
      <div style={{ height:1,background:"#3f3f46",margin:"12px 0" }}/>
      {[65,80,55,70,45].map((w,i)=><div key={i} style={{ height:7,width:`${w}%`,background:"#3f3f46",borderRadius:2,marginBottom:5 }}/>)}
    </div>
    <div style={{ flex:1,padding:16 }}>
      {["Profile","Experience","Education"].map((s,i)=>(
        <div key={i} style={{ marginBottom:14 }}>
          <div style={{ height:8,width:70,background:accent,borderRadius:2,marginBottom:8,opacity:0.9 }}/>
          {[85,65,75].map((w,j)=><div key={j} style={{ height:7,width:`${w}%`,background:"#e5e7eb",borderRadius:2,marginBottom:5 }}/>)}
        </div>
      ))}
    </div>
  </div>
);

const MinimalImagePreview = ({ accent }) => (
  <div style={{ width:380,height:280,background:"white",display:"flex",overflow:"hidden" }}>
    <div style={{ width:115,background:accent,padding:16,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center" }}>
      <div style={{ width:54,height:54,borderRadius:"50%",background:"rgba(255,255,255,0.25)",border:"3px solid white",marginBottom:14 }}/>
      {[0,1,2].map(i=><div key={i} style={{ display:"flex",alignItems:"center",gap:5,marginBottom:7,alignSelf:"flex-start" }}><div style={{ width:8,height:8,borderRadius:"50%",background:"rgba(255,255,255,0.4)" }}/><div style={{ height:6,width:55,background:"rgba(255,255,255,0.3)",borderRadius:2 }}/></div>)}
      {[65,50,80,60].map((w,i)=><div key={i} style={{ height:6,width:`${w}%`,background:"rgba(255,255,255,0.3)",borderRadius:2,marginBottom:5,alignSelf:"flex-start" }}/>)}
    </div>
    <div style={{ flex:1,padding:16 }}>
      <div style={{ paddingBottom:10,borderBottom:"1px solid #e5e7eb",marginBottom:12 }}>
        <div style={{ height:20,width:140,background:"#111827",borderRadius:3,marginBottom:5 }}/>
        <div style={{ height:7,width:100,background:accent,borderRadius:2,opacity:0.8 }}/>
      </div>
      {["Summary","Experience","Projects"].map((s,i)=>(
        <div key={i} style={{ marginBottom:12 }}>
          <div style={{ height:7,width:90,background:accent,borderRadius:2,marginBottom:7,opacity:0.85 }}/>
          {[90,75,80].map((w,j)=><div key={j} style={{ height:6,width:`${w}%`,background:"#e5e7eb",borderRadius:2,marginBottom:4 }}/>)}
        </div>
      ))}
    </div>
  </div>
);

const MinimalPreview = ({ accent }) => (
  <div style={{ width:380,height:280,background:"white",padding:24,fontFamily:"sans-serif",overflow:"hidden" }}>
    <div style={{ height:28,width:200,background:"#111827",borderRadius:3,marginBottom:10 }}/>
    <div style={{ display:"flex",gap:20,marginBottom:20 }}>
      {[70,56,63].map((w,i)=><div key={i} style={{ height:7,width:w,background:"#d1d5db",borderRadius:2 }}/>)}
    </div>
    {["Experience","Education","Skills"].map((s,i)=>(
      <div key={i} style={{ marginBottom:16 }}>
        <div style={{ height:7,width:80,background:accent,borderRadius:2,marginBottom:10,opacity:0.85 }}/>
        {i===2?<div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{[50,65,45,55,40].map((w,j)=><div key={j} style={{ height:16,width:w,border:`1px solid ${accent}60`,borderRadius:99 }}/>)}</div>
        :<>{[85,70].map((w,j)=><div key={j} style={{ height:6,width:`${w}%`,background:"#e5e7eb",borderRadius:2,marginBottom:3 }}/>)}</>}
      </div>
    ))}
  </div>
);

const TimelinePreview = ({ accent }) => (
  <div style={{ width:380,height:280,background:"white",padding:20,fontFamily:"sans-serif",overflow:"hidden" }}>
    <div style={{ height:22,width:160,background:accent,borderRadius:3,marginBottom:6 }}/>
    <div style={{ display:"flex",gap:16,marginBottom:16 }}>
      {[56,49,52].map((w,i)=><div key={i} style={{ height:7,width:w,background:"#d1d5db",borderRadius:2 }}/>)}
    </div>
    {["Experience","Projects"].map((s,i)=>(
      <div key={i} style={{ marginBottom:12 }}>
        <div style={{ height:8,width:80,background:accent,borderRadius:2,marginBottom:8,opacity:0.85 }}/>
        <div style={{ borderLeft:`2px solid ${accent}`,paddingLeft:14,position:"relative" }}>
          {[0,1].map(j=>(
            <div key={j} style={{ position:"relative",marginBottom:10 }}>
              <div style={{ position:"absolute",left:-19,top:4,width:10,height:10,borderRadius:"50%",background:"white",border:`2px solid ${accent}` }}/>
              <div style={{ height:9,width:130,background:"#1f2937",borderRadius:2,marginBottom:4 }}/>
              {[85,70].map((w,k)=><div key={k} style={{ height:5,width:`${w}%`,background:"#e5e7eb",borderRadius:2,marginBottom:2 }}/>)}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const PreviewMap = { classic: ClassicPreview, corporate: CorporatePreview, "minimal-image": MinimalImagePreview, minimal: MinimalPreview, timeline: TimelinePreview };

/* ── Full resume previews inside the modal ── */
const formatDate = (d) => { if(!d) return ""; const [y,m]=d.split("-"); return new Date(y,m-1).toLocaleDateString("en-US",{year:"numeric",month:"short"}); };

const ClassicFull = ({ data, accent }) => (
  <div style={{ background:"white", padding:40, fontFamily:"Georgia, serif", maxWidth:700, margin:"0 auto" }}>
    <div style={{ height:6, background:accent, marginBottom:24 }}/>
    <h1 style={{ fontSize:28, fontWeight:700, color:"#111", marginBottom:8 }}>{data.personal_info.full_name}</h1>
    <div style={{ display:"flex", flexWrap:"wrap", gap:"12px 24px", fontSize:12, color:"#555", marginBottom:24 }}>
      {[data.personal_info.email, data.personal_info.phone, data.personal_info.location].map((v,i)=><span key={i}>{v}</span>)}
    </div>
    {[{title:"Professional Summary",content:<p style={{ fontSize:13,color:"#444",lineHeight:1.7 }}>{data.professional_summary}</p>},
      {title:"Experience",content:data.experience.map((e,i)=>(
        <div key={i} style={{ paddingLeft:16,borderLeft:`2px solid ${accent}40`,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between" }}><div><div style={{ fontWeight:600,color:"#111",fontSize:14 }}>{e.position}</div><div style={{ fontSize:12,color:"#666" }}>{e.company}</div></div><span style={{ fontSize:11,color:"#888" }}>{formatDate(e.start_date)} – {e.is_current?"Present":formatDate(e.end_date)}</span></div>
          <p style={{ fontSize:12,color:"#555",marginTop:6,lineHeight:1.6 }}>{e.description.split("\n")[0]}</p>
        </div>))},
      {title:"Skills",content:<div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>{data.skills.map((s,i)=><span key={i} style={{ border:`1px solid ${accent}60`,color:accent,fontSize:11,padding:"3px 10px",borderRadius:99 }}>{s}</span>)}</div>}
    ].map((s,i)=>(
      <div key={i} style={{ marginBottom:24 }}>
        <div style={{ fontSize:10,fontWeight:700,color:accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:10,fontFamily:"sans-serif" }}>{s.title}</div>
        {s.content}
      </div>
    ))}
  </div>
);

const CorporateFull = ({ data, accent }) => (
  <div style={{ background:"white", display:"flex", fontFamily:"sans-serif", maxWidth:700, margin:"0 auto" }}>
    <div style={{ width:200, background:"#18181b", padding:28, flexShrink:0, color:"white" }}>
      <h1 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>{data.personal_info.full_name}</h1>
      <p style={{ fontSize:11, color:"#9ca3af", marginBottom:20, letterSpacing:"0.1em" }}>{data.personal_info.profession}</p>
      <div style={{ height:1, background:"#3f3f46", marginBottom:16 }}/>
      {[data.personal_info.email, data.personal_info.phone, data.personal_info.location].map((v,i)=><p key={i} style={{ fontSize:11,color:"#a1a1aa",marginBottom:8 }}>{v}</p>)}
      <div style={{ height:1, background:"#3f3f46", margin:"16px 0" }}/>
      <p style={{ fontSize:10, color:"#71717a", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10 }}>Skills</p>
      {data.skills.map((s,i)=><p key={i} style={{ fontSize:11,color:"#d4d4d8",marginBottom:6 }}>{s}</p>)}
    </div>
    <div style={{ flex:1, padding:28 }}>
      {[{title:"Profile",content:<p style={{ fontSize:12,color:"#555",lineHeight:1.7 }}>{data.professional_summary}</p>},
        {title:"Experience",content:data.experience.map((e,i)=>(
          <div key={i} style={{ marginBottom:16 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}><div><div style={{ fontWeight:600,fontSize:14,color:"#111" }}>{e.position}</div><div style={{ fontSize:12,color:"#666" }}>{e.company}</div></div><span style={{ fontSize:11,color:"#888" }}>{formatDate(e.start_date)} – {e.is_current?"Present":formatDate(e.end_date)}</span></div>
            <p style={{ fontSize:12,color:"#555",lineHeight:1.6 }}>{e.description.split("\n")[0]}</p>
            <div style={{ height:1,background:"#f3f4f6",marginTop:12 }}/>
          </div>))},
        {title:"Education",content:data.education.map((e,i)=>(
          <div key={i}><div style={{ fontWeight:600,fontSize:13,color:"#111" }}>{e.degree} in {e.field}</div><div style={{ fontSize:12,color:"#666" }}>{e.institution}</div></div>))}
      ].map((s,i)=>(
        <div key={i} style={{ marginBottom:20 }}>
          <div style={{ fontSize:10,fontWeight:700,color:accent,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10 }}>{s.title}</div>
          {s.content}
        </div>
      ))}
    </div>
  </div>
);

const MinimalImageFull = ({ data, accent }) => (
  <div style={{ background:"white", display:"flex", fontFamily:"sans-serif", maxWidth:700, margin:"0 auto" }}>
    <div style={{ width:190, background:accent, padding:24, flexShrink:0, color:"white", display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"3px solid white",marginBottom:16 }}/>
      <p style={{ fontSize:11,opacity:0.7,letterSpacing:"0.1em",marginBottom:16,textAlign:"center" }}>CONTACT</p>
      {[data.personal_info.phone, data.personal_info.email, data.personal_info.location].map((v,i)=><p key={i} style={{ fontSize:10,opacity:0.8,marginBottom:6,textAlign:"center",wordBreak:"break-all" }}>{v}</p>)}
      <div style={{ height:1,background:"rgba(255,255,255,0.2)",width:"100%",margin:"16px 0" }}/>
      <p style={{ fontSize:11,opacity:0.7,letterSpacing:"0.1em",marginBottom:12 }}>SKILLS</p>
      {data.skills.map((s,i)=><p key={i} style={{ fontSize:10,opacity:0.75,marginBottom:5 }}>• {s}</p>)}
    </div>
    <div style={{ flex:1,padding:24 }}>
      <div style={{ borderBottom:"2px solid #e5e7eb",paddingBottom:16,marginBottom:20 }}>
        <h1 style={{ fontSize:24,fontWeight:700,color:"#111",marginBottom:4 }}>{data.personal_info.full_name}</h1>
        <p style={{ fontSize:12,color:accent,letterSpacing:"0.1em",textTransform:"uppercase" }}>{data.personal_info.profession}</p>
      </div>
      {[{title:"Summary",content:<p style={{ fontSize:12,color:"#555",lineHeight:1.7 }}>{data.professional_summary}</p>},
        {title:"Experience",content:data.experience.map((e,i)=>(
          <div key={i} style={{ marginBottom:14 }}>
            <div style={{ fontWeight:600,fontSize:13,color:"#111" }}>{e.position}</div>
            <div style={{ fontSize:11,color:"#888",marginBottom:4 }}>{e.company} · {formatDate(e.start_date)}</div>
            <p style={{ fontSize:11,color:"#555",lineHeight:1.5 }}>{e.description.split("\n")[0]}</p>
          </div>))}
      ].map((s,i)=>(
        <div key={i} style={{ marginBottom:18 }}>
          <div style={{ fontSize:10,fontWeight:700,color:accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8 }}>{s.title}</div>
          {s.content}
        </div>
      ))}
    </div>
  </div>
);

const MinimalFull = ({ data, accent }) => (
  <div style={{ background:"white", padding:"40px 48px", fontFamily:"'Georgia', serif", maxWidth:700, margin:"0 auto" }}>
    <h1 style={{ fontSize:36, fontWeight:300, color:"#111", marginBottom:10, letterSpacing:"-0.02em" }}>{data.personal_info.full_name}</h1>
    <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 24px", fontSize:12, color:"#9ca3af", marginBottom:32 }}>
      {[data.personal_info.email, data.personal_info.phone, data.personal_info.location].map((v,i)=><span key={i}>{v}</span>)}
    </div>
    <p style={{ fontSize:14, color:"#555", lineHeight:1.8, marginBottom:32 }}>{data.professional_summary}</p>
    {[{title:"Experience",content:data.experience.map((e,i)=>(
        <div key={i} style={{ marginBottom:20 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4 }}>
            <div><span style={{ fontSize:16,fontWeight:500,color:"#111" }}>{e.position}</span><span style={{ fontSize:12,color:"#9ca3af",marginLeft:12 }}>{e.company}</span></div>
            <span style={{ fontSize:12,color:"#9ca3af" }}>{formatDate(e.start_date)} — {formatDate(e.end_date)}</span>
          </div>
          <p style={{ fontSize:12,color:"#555",lineHeight:1.6 }}>{e.description.split("\n")[0]}</p>
        </div>))},
      {title:"Skills",content:<div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>{data.skills.map((s,i)=><span key={i} style={{ border:`1px solid ${accent}50`,color:accent,fontSize:11,padding:"4px 12px",borderRadius:99 }}>{s}</span>)}</div>}
    ].map((s,i)=>(
      <div key={i} style={{ marginBottom:28 }}>
        <div style={{ fontSize:10,letterSpacing:"0.25em",fontWeight:600,color:accent,textTransform:"uppercase",marginBottom:12,fontFamily:"sans-serif" }}>{s.title}</div>
        {s.content}
      </div>
    ))}
  </div>
);

const TimelineFull = ({ data, accent }) => (
  <div style={{ background:"white", padding:36, fontFamily:"sans-serif", maxWidth:700, margin:"0 auto" }}>
    <h1 style={{ fontSize:28,fontWeight:700,color:accent,marginBottom:4 }}>{data.personal_info.full_name}</h1>
    <p style={{ fontSize:11,color:"#9ca3af",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:10 }}>{data.personal_info.profession}</p>
    <div style={{ display:"flex",flexWrap:"wrap",gap:"4px 20px",fontSize:12,color:"#666",marginBottom:28 }}>
      {[data.personal_info.email, data.personal_info.phone, data.personal_info.location].map((v,i)=><span key={i}>{v}</span>)}
    </div>
    <p style={{ fontSize:13,color:"#555",lineHeight:1.7,marginBottom:28 }}>{data.professional_summary}</p>
    {[{title:"Experience",items:data.experience},{title:"Projects",items:data.projects}].map((section,si)=>(
      <div key={si} style={{ marginBottom:28 }}>
        <div style={{ fontSize:10,fontWeight:700,color:accent,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:16 }}>{section.title}</div>
        <div style={{ borderLeft:`2px solid ${accent}`,paddingLeft:20,position:"relative" }}>
          {section.items.map((item,i)=>(
            <div key={i} style={{ position:"relative",marginBottom:18 }}>
              <div style={{ position:"absolute",left:-25,top:4,width:10,height:10,borderRadius:"50%",background:"white",border:`2px solid ${accent}` }}/>
              <div style={{ fontWeight:600,fontSize:14,color:"#111",marginBottom:2 }}>{item.position||item.name}</div>
              <div style={{ fontSize:11,color:"#888",marginBottom:6 }}>{item.company||item.type} {item.start_date&&`· ${formatDate(item.start_date)}`}</div>
              <p style={{ fontSize:12,color:"#555",lineHeight:1.5 }}>{(item.description||"").split("\n")[0]}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
    <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
      {data.skills.map((s,i)=><span key={i} style={{ border:`1px solid ${accent}`,color:accent,fontSize:11,padding:"3px 12px",borderRadius:99 }}>{s}</span>)}
    </div>
  </div>
);

const FullPreviewMap = { classic: ClassicFull, corporate: CorporateFull, "minimal-image": MinimalImageFull, minimal: MinimalFull, timeline: TimelineFull };

/* ── Main Component ── */
const TemplatesSection = () => {
  const [selected, setSelected] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const activeTemplate = templates.find(t => t.id === previewTemplate);
  const FullPreview = previewTemplate ? FullPreviewMap[previewTemplate] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .tpl-card { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease; }
        .tpl-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,0,0,0.12); }
        .tpl-overlay { opacity: 0; transition: opacity 0.2s ease; }
        .tpl-card:hover .tpl-overlay { opacity: 1; }
        .use-btn { transform: translateY(6px); transition: transform 0.2s ease; }
        .tpl-card:hover .use-btn { transform: translateY(0); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }
        @keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .modal-in { animation: modalIn 0.25s ease forwards; }
      `}</style>

      <section id="templates" className="py-24 px-6 bg-gray-200" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-black bg-gradient-to-b from-[#874ff8] to-[#380B60] border border-zinc-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 font-medium">
              <BookUserIcon className="size-4 stroke-zinc-900"/>
              <span className="w-1.5 h-1.5 rounded-full" />
              Resume Templates
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
              Pick your perfect
              <span className="block text-zinc-400 font-light">template.</span>
            </h2>
            <p className="mt-4 text-zinc-500 text-base max-w-md mx-auto leading-relaxed">
              Five professionally designed layouts — each crafted to impress recruiters and pass ATS systems.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {templates.map((t, i) => {
              const Preview = PreviewMap[t.preview];
              const isSelected = selected === t.id;
              return (
                <div key={t.id} className="tpl-card fade-up relative bg-white border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer"
                  style={{ animationDelay:`${i*80}ms`, boxShadow: isSelected ? `0 0 0 2px ${t.accentColor}, 0 12px 32px rgba(0,0,0,0.08)` : undefined }}
                  onClick={() => setSelected(isSelected ? null : t.id)}>

                  <div className="absolute top-3 left-3 z-10 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow" style={{ backgroundColor: t.tagColor }}>{t.tag}</div>
                  {isSelected && <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center shadow" style={{ backgroundColor: t.accentColor }}><Check size={12} className="text-white"/></div>}

                  {/* Thumbnail */}
                  <div className="relative overflow-hidden bg-zinc-50 border-b border-zinc-100" style={{ height: 190 }}>
                    <div style={{ transform:"scale(0.5)", transformOrigin:"top left", width:380, height:280 }}>
                      <Preview accent={t.accentColor} />
                    </div>

                    {/* Hover overlay — Preview button */}
                    <div className="tpl-overlay absolute inset-0 bg-black/25 flex items-center justify-center">
                      <button
                        className="use-btn flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-5 py-2.5 rounded-full shadow-xl hover:bg-zinc-50 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setPreviewTemplate(t.id); }}
                      >
                        Preview Template <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accentColor }}/>
                      <h3 className="font-semibold text-zinc-900 text-sm">{t.name}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{t.description}</p>
                  </div>
                  <div className="h-[3px]" style={{ background:`linear-gradient(90deg, ${t.accentColor}, ${t.accentColor}40)` }}/>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="tpl-card fade-up bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center p-8 gap-3" style={{ animationDelay:`${templates.length*80}ms` }}>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-1">
                <ArrowRight size={22} className="text-white"/>
              </div>
              <h3 className="text-white font-semibold text-base">Start Building Now</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Pick any template and customize it with your details in minutes.</p>
              <Link to="/app" className="mt-2 inline-flex items-center gap-2 bg-white text-zinc-900 text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-100 transition-colors">
                Get Started Free <ArrowRight size={12}/>
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-400 mt-10">
            ✓ ATS-friendly &nbsp;·&nbsp; ✓ PDF export &nbsp;·&nbsp; ✓ Instant download
          </p>
        </div>
      </section>

      {/* ── Full Preview Modal ── */}
      {previewTemplate && activeTemplate && FullPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}
          onClick={() => setPreviewTemplate(null)}>
          <div className="modal-in relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeTemplate.accentColor }}/>
                <span className="font-semibold text-zinc-800 text-sm">{activeTemplate.name} Template</span>
                <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: activeTemplate.tagColor }}>{activeTemplate.tag}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/app"
                  className="flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  style={{ background: activeTemplate.accentColor }}>
                  Use This Template <ArrowRight size={11}/>
                </Link>
                <button onClick={() => setPreviewTemplate(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors">
                  <X size={16} className="text-zinc-500"/>
                </button>
              </div>
            </div>

            {/* Resume preview */}
            <div className="overflow-y-auto" style={{ maxHeight:"calc(90vh - 65px)", background:"#f9fafb" }}>
              <div className="p-6">
                <FullPreview data={dummyData} accent={activeTemplate.accentColor} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplatesSection;