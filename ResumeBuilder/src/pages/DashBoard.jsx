import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon, UploadCloud, LoaderCircleIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import { toast } from 'react-hot-toast';
import pdfToText from 'react-pdftotext';
import { all } from 'axios';

const DashBoard = () => {

  const { user, token } = useSelector((state) => state.auth)

  const colors = [
    "#3A86FF", "#8338EC", "#FF006E", "#FB5607",
    "#FFBE0B", "#06D6A0", "#118AB2", "#EF476F",
    "#8AC926", "#6A4C93"
  ]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResumes, setShowCreateResumes] = useState(false)
  const [showUploadResumes, setShowUploadResumes] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResume, setEditResume] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } });
      setAllResumes(data.resumes);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle("")
      setShowCreateResumes(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle("")
      setResume(null)
      setShowUploadResumes(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  const editTitle = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.put(`/api/resumes/update/`, { resumeId: editResume, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResume ? { ...resume, title } : resume))
      setTitle("")
      setEditResume('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this resume?")
      if (confirmDelete) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (token) loadAllResumes();
  }, [token]);

  const ModalWrapper = ({ onClose, onSubmit, children }) => (
    <form onSubmit={onSubmit} onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,13,26,0.75)', backdropFilter: 'blur(6px)' }}>
      <div onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl p-7 shadow-2xl"
        style={{ background: 'white', border: '1px solid #e5e7eb' }}>
        {children}
      </div>
    </form>
  );

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-zinc-400 mb-4";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .dash-root { font-family: 'Poppins', sans-serif; }
        .resume-card { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
        .resume-card:hover { transform: translateY(-5px); }
        .action-btns { opacity: 0; transition: opacity 0.2s; }
        .resume-card:hover .action-btns { opacity: 1; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
      `}</style>

      <div className="dash-root min-h-screen bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="mb-8 fade-up">
            <p className="text-2xl font-semibold text-zinc-800 sm:hidden">
              Welcome, <span className="text-indigo-600">{user?.name}</span>
            </p>
            <h1 className="hidden sm:block text-3xl font-bold text-zinc-800 mb-1">
              My Resumes
            </h1>
            <p className="hidden sm:block text-sm text-zinc-400">Create, upload and manage your resumes</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8 fade-up" style={{ animationDelay: '60ms' }}>
            <button
              onClick={() => setShowCreateResumes(true)}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
            >
              <PlusIcon className="size-4 group-hover:rotate-90 transition-transform duration-300" />
              Create Resume
            </button>

            <button
              onClick={() => setShowUploadResumes(true)}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
            >
              <UploadCloudIcon className="size-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
              Upload Resume
            </button>
          </div>

          <div className="h-px bg-zinc-200 mb-8" />

          {/* Resume Grid */}
          {allResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center fade-up">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                <FilePenLineIcon className="size-7 text-indigo-400" />
              </div>
              <p className="text-zinc-500 text-sm">No resumes yet. Create your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allResumes.map((resume, index) => {
                const color = colors[index % colors.length];
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className="resume-card fade-up relative flex flex-col items-center justify-center rounded-2xl p-4 h-44 border text-left cursor-pointer group"
                    style={{
                      background: `linear-gradient(145deg, ${color}12, ${color}30)`,
                      borderColor: color + '35',
                      animationDelay: `${index * 60}ms`
                    }}
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: color + '20' }}>
                      <FilePenLineIcon className="size-5" style={{ color }} />
                    </div>

                    {/* Title */}
                    <p className="text-xs font-semibold text-center leading-snug px-1 line-clamp-2" style={{ color }}>
                      {resume.title}
                    </p>

                    {/* Date */}
                    <p className="absolute bottom-2.5 text-[9px] font-medium" style={{ color: color + 'bb' }}>
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>

                    {/* Action buttons */}
                    <div
                      onClick={e => e.stopPropagation()}
                      className="action-btns absolute top-2 right-2 flex items-center gap-0.5 rounded-lg overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}
                    >
                      <button
                        onClick={() => { setEditResume(resume._id); setTitle(resume.title) }}
                        className="p-1.5 hover:bg-white transition-colors rounded-l-lg"
                        title="Rename"
                      >
                        <PencilIcon className="size-3 text-zinc-600" />
                      </button>
                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="p-1.5 hover:bg-red-50 transition-colors rounded-r-lg"
                        title="Delete"
                      >
                        <TrashIcon className="size-3 text-red-500" />
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Create Resume Modal ── */}
        {showCreateResumes && (
          <ModalWrapper onClose={() => setShowCreateResumes(false)} onSubmit={createResume}>
            <button type="button" onClick={() => { setShowCreateResumes(false); setTitle("") }}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-zinc-100 transition-colors">
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <PlusIcon className="size-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">Create New Resume</h2>
            <p className="text-xs text-zinc-400 mb-5">Give your resume a title to get started</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="e.g. Software Engineer Resume"
              className={inputClass}
              required
            />
            <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              Create Resume
            </button>
          </ModalWrapper>
        )}

        {/* ── Upload Resume Modal ── */}
        {showUploadResumes && (
          <ModalWrapper onClose={() => setShowUploadResumes(false)} onSubmit={uploadResume}>
            <button type="button" onClick={() => { setShowUploadResumes(false); setTitle("") }}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-zinc-100 transition-colors">
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
              <UploadCloud className="size-5 text-violet-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">Upload Resume</h2>
            <p className="text-xs text-zinc-400 mb-5">We'll parse your PDF and prefill the builder</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="e.g. My Uploaded Resume"
              className={inputClass}
              required
            />
            <label htmlFor="resume-upload" className="block cursor-pointer mb-4">
              <div className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 transition-colors ${resume ? 'border-violet-400 bg-violet-50' : 'border-zinc-200 hover:border-violet-300 hover:bg-violet-50/50'}`}>
                {resume ? (
                  <>
                    <UploadCloud className="size-8 text-violet-500" />
                    <p className="text-xs font-medium text-violet-600">{resume.name}</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="size-8 text-zinc-300" />
                    <p className="text-xs text-zinc-400">Click to upload your PDF resume</p>
                    <p className="text-[10px] text-zinc-300">PDF, DOC, DOCX supported</p>
                  </>
                )}
              </div>
            </label>
            <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" hidden onChange={(e) => setResume(e.target.files[0])} />
            <button disabled={loading}
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              {loading && <LoaderCircleIcon className="animate-spin size-4" />}
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </ModalWrapper>
        )}

        {/* ── Edit Title Modal ── */}
        {editResume && (
          <ModalWrapper onClose={() => setEditResume('')} onSubmit={editTitle}>
            <button type="button" onClick={() => { setEditResume(''); setTitle("") }}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-zinc-100 transition-colors">
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-4">
              <PencilIcon className="size-5 text-zinc-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">Rename Resume</h2>
            <p className="text-xs text-zinc-400 mb-5">Update the title of your resume</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter new title"
              className={inputClass}
              required
            />
            <button className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              Update Title
            </button>
          </ModalWrapper>
        )}
      </div>
    </>
  )
}

export default DashBoard