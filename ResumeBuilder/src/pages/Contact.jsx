import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, BookUserIcon } from "lucide-react";


const ACCESS_KEY = "0189b1df-52ed-4315-b507-2de33e705294";
// ─────────────────────────────────────────────────────────────────

const Contact = () => {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New message from ${form.name} — ResumeBuilder`,
          name:    form.name,
          email:   form.email,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon: Mail,   label: "Email Us", value: "noname20040224@gmail.com", sub: "We reply within 24 hours" },
    { icon: MapPin, label: "Location", value: "West Bengal, India",        sub: "India" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .contact-root * { font-family: 'Poppins', sans-serif; }

        .contact-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 13.5px;
          color: #111827;
          background: white;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .contact-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .contact-input::placeholder { color: #9ca3af; }

        .send-btn {
          width: 100%;
          padding: 13px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 14px rgba(79,70,229,0.35);
        }
        .send-btn:hover:not(:disabled) {
          background: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(79,70,229,0.4);
        }
        .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          transition: background 0.2s;
        }
        .info-card:hover { background: rgba(255,255,255,0.1); }

        .icon-wrap {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        .spinner     { animation: spin 0.8s linear infinite; }
        .success-pop { animation: fadeUp 0.4s ease forwards; }

        .left-panel {
          background: linear-gradient(145deg, #1e1b4b, #312e81, #1e1b4b);
          position: relative;
          overflow: hidden;
        }
        .left-panel::before {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(99,102,241,0.15);
          top: -80px; right: -80px;
        }
        .left-panel::after {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(99,102,241,0.1);
          bottom: -50px; left: -50px;
        }
      `}</style>

      <section id="contact" className="contact-root py-24 px-6 bg-gray-200">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-black bg-gradient-to-b from-[#874ff8] to-[#380B60] border border-zinc-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 font-medium">
              <BookUserIcon className="size-4 stroke-zinc-900" />
              <span className="w-1.5 h-1.5" />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              We'd love to
              <span className="block text-zinc-400 font-light">hear from you.</span>
            </h2>
            <p className="mt-4 text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
              Have a question or feedback? Drop us a message and our team will get back to you shortly.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-5">

            {/* LEFT — Info Panel */}
            <div className="left-panel md:col-span-2 p-10 text-white relative z-10">
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p className="text-indigo-300 text-sm mb-10 leading-relaxed">
                Fill out the form and we'll be in touch as soon as possible.
              </p>

              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value, sub }, i) => (
                  <div key={i} className="info-card">
                    <div className="icon-wrap">
                      <Icon size={18} className="text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs font-medium mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                      <p className="text-indigo-400 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-1.5 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                ))}
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="md:col-span-3 bg-white p-10">
              {submitted ? (
                <div className="success-pop h-full flex flex-col items-center justify-center text-center gap-4 py-10">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Message Sent!</h3>
                  <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-2 text-indigo-600 text-sm font-medium hover:underline"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      className="contact-input"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      className="contact-input"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      className="contact-input"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      style={{ resize: "none" }}
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs text-center bg-red-50 border border-red-100 rounded-lg py-2 px-3">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="send-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>

                  <p className="text-center text-xs text-zinc-400">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;