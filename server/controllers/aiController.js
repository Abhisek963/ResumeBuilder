import Resume from "../models/Resume.js";
import  ai  from "../configs/ai.js";


// Controller for enhancing a resumes professional summary using AI
// POST: /api/ai/enhance-pro-summary

export const enhanceProSummary = async (req, res) => {
    try {
        const {userContent} = req.body;

        if (!userContent) {
            return res.status(400).json({ error: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
        {   role: "system",
            content: `
You are a professional resume editor.

Rewrite the user's professional summary to be:
- 3 to 4 sentences
- Clear and concise
- Impact-driven
- ATS-friendly
- No explanations
- No headings
- No multiple options
- No extra commentary

Return ONLY the improved summary text.
`
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        
        const enhancedSummary = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedSummary });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// controller for enhancing a resumes job description using AI
// POST: /api/ai/enhance-job-description

export const enhanceJobDescription = async (req, res) => {
    try {
        const {userContent} = req.body;

        if (!userContent) {
            return res.status(400).json({ error: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
        {   role: "system",
            content: "You are a helpful assistant that enhances job descriptions for resumes. The user will provide a job description, and you will improve it by making it more concise, impactful, and tailored for job applications. It should be 1-2 sentences long. Focus on highlighting key responsibilities, achievements, and skills relevant to the user's career goals. Make sure to maintain a professional tone and avoid any unnecessary fluff. Your response should be clear, engaging, and optimized for applicant tracking systems (ATS)." 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        
        const enhancedSummary = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedSummary });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



// controller for uploading a resume to the database
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {

        const {resumeText,title} = req.body;
        const userId = req.userID;

        if (!resumeText) {
            return res.status(400).json({ error: "Resume text is required" });
        }

        const systemPrompt = "You are a helpful Ai assistant that extracts key information from resumes. The user will provide the text of their resume, and you will extract the information"

        const userPromt =`extract the following information from the resume:${resumeText} Provide me the data in the following JSON format with no additional text before or after : 
    {
        professional_summary : {
        type: String,
        default: ""
    },
    skills : [{
        type: String
    }],
    personal_info : {
        image :{type: String, default: ""},
        full_name : {type: String, default: ""},
        profession : {type: String, default: ""},
        email : {type: String, default: ""},
        phone : {type: String, default: ""},
        location : {type: String, default: ""},
        linkedin : {type: String, default: ""},
        website : {type: String, default: ""},
    },
    experience : [
        {
            company :{type: String},
            position : {type: String},
            start_date : {type: String},
            end_date : {type: String},
            description : {type: String},
            is_current : {type: Boolean},
        }
    ],
    projects: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        }
    ],
    education : [{
        institution : {type: String},
        degree : {type: String},
        field: {type: String},
        graduation_date : {type: String},
        gpa : {type: String},
    }]    
    }`

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
        {   role: "system",
            content: systemPrompt 
        },
        {
            role: "user",
            content: userPromt,
        },
    ],
    response_format: {
        type: "json_object",
    }
        })
        
        const extractedData = response.choices[0].message.content.trim();
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({
            userId,...parsedData,title
        })
        res.status(201).json({ resume: newResume });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}