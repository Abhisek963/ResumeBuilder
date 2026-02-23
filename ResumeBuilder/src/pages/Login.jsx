import React from "react";
import { Lock, Mail, User2 } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem('token', data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .login-root * { font-family: 'Poppins', sans-serif; }

        .login-bg {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(135,79,248,0.25) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(56,11,96,0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f0d1a 0%, #1a0f2e 50%, #0d0d1a 100%);
          position: relative;
          overflow: hidden;
        }

        /* Animated floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: floatOrb 8s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 {
          width: 350px; height: 350px;
          background: rgba(135,79,248,0.15);
          top: -80px; left: -80px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 280px; height: 280px;
          background: rgba(99,102,241,0.12);
          bottom: -60px; right: -60px;
          animation-delay: -3s;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: rgba(236,72,153,0.08);
          top: 40%; left: 60%;
          animation-delay: -5s;
        }

        /* Grid overlay */
        .login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(135,79,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(135,79,248,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        .login-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .login-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .login-input::placeholder { color: rgba(255,255,255,0.3); }
        .login-input:focus {
          border-color: rgba(135,79,248,0.6);
          background: rgba(135,79,248,0.08);
          box-shadow: 0 0 0 3px rgba(135,79,248,0.15);
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #874ff8, #5b21b6);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 8px 24px rgba(135,79,248,0.35);
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(135,79,248,0.45); }
        .submit-btn:active { transform: scale(0.98); }

        .logo-badge {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #874ff8, #380B60);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 8px 20px rgba(135,79,248,0.4);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <div className="login-root login-bg flex items-center justify-center px-4">
        {/* Background effects */}
        <div className="login-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Card */}
        <div className="login-card fade-up relative w-full max-w-md rounded-3xl p-10 z-10">

          {/* Logo badge */}
          <div className="logo-badge">
            <img src="/public/logo.png" alt="logo" className="h-7 w-auto" onError={e => { e.target.style.display='none' }} />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {state === "login"
                ? "Login to continue building your resume"
                : "Sign up to start building resumes"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            {state !== "login" && (
              <div className="relative">
                <User2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input type="text" name="name" placeholder="Full Name"
                  value={formData.name} onChange={handleChange} required
                  className="login-input" />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <input type="email" name="email" placeholder="Email Address"
                value={formData.email} onChange={handleChange} required
                className="login-input" />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <input type="password" name="password" placeholder="Password"
                value={formData.password} onChange={handleChange} required
                className="login-input" />
            </div>

            {/* Forgot */}
            {state === "login" && (
              <div className="text-right">
                <button type="button" className="text-xs transition-colors"
                  style={{ color: 'rgba(135,79,248,0.8)' }}
                  onMouseOver={e => e.target.style.color='#874ff8'}
                  onMouseOut={e => e.target.style.color='rgba(135,79,248,0.8)'}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="submit-btn">
              {state === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Toggle */}
          <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {state === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setState(prev => prev === "login" ? "register" : "login")}
              className="ml-1.5 font-medium transition-colors"
              style={{ color: '#874ff8' }}
              onMouseOver={e => e.target.style.color='#a78bfa'}
              onMouseOut={e => e.target.style.color='#874ff8'}>
              {state === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;