import { type } from "os";
import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";




// controller for creating user resume
// POST: /api/resumes/create


export const createResume = async (req, res) => {
    try {
        const userId = req.userID;
        const {title} = req.body;

        // create a new resume 
            const newResume = await Resume.create({userId, title});
        // return success message with resume
        return res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// controller for deleting user resume
// DELETE: /api/resumes/delete


export const deleteResume = async (req, res) => {
    try {
        const userId = req.userID;
        const {resumeId} = req.params;

        // delete the resume
        const deletedResume = await Resume.findOneAndDelete({ _id: resumeId, userId });

        if (!deletedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // return success message with deleted resume
        return res.status(200).json({ message: "Resume deleted successfully", resume: deletedResume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// get user resume by id
// GET: /api/resumes/get


export const getResumeById = async (req, res) => {
    try {
        const userId = req.userID;
        const {resumeId} = req.params;

        // find the resume by id and userId
        const resume = await Resume.findOne({ _id: resumeId, userId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // return the resume
        resume.__v = undefined; // Exclude __v from the response
        resume.createdAt = undefined; // Exclude createdAt from the response
        resume.updatedAt = undefined; // Exclude updatedAt from the response
        return res.status(200).json({ message: "Resume retrieved successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// get resume by id public
// GET: /api/resumes/public/:resumeId

export const getResumeByIdPublic = async (req, res) => {
    try {
        const {resumeId} = req.params;

        // find the resume by id
        const resume = await Resume.findOne({public: true, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ message: "Resume retrieved successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// controller for updating user resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
    try {
        const userId = req.userID;
        const {resumeId, resumeData, removeBackground} = req.body;
        const image = req.file;
        
        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData);
        }else{
            resumeDataCopy = structuredClone(resumeData);
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imageKit.files.upload({
            file: imageBufferData,
            fileName: 'resume.png',
            folder:'user-resumes',
            transformation :{
                pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
            }
});

            resumeDataCopy.personal_info.image = response.url;
            

        }


        const resume = await Resume.findOneAndUpdate({
            _id: resumeId,
            userId
        }, resumeDataCopy, {new: true});

        return res.status(200).json({ message: "Resume updated successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
