import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "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";

app.post("/ask-ai", async (req, res) => {
    const { message, spec } = req.body;

    const prompt = `
คุณคือผู้เชี่ยวชาญด้านคอมพิวเตอร์
สเปคผู้ใช้:
CPU Score: ${spec?.cpuScore || "ไม่ทราบ"}
GPU Score: ${spec?.gpuScore || "ไม่ทราบ"}
RAM: ${spec?.ram || "ไม่ทราบ"} GB

คำถามผู้ใช้:
${message}

ตอบเป็นภาษาไทย แบบเข้าใจง่าย
`;

    try{
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${OPENAI_KEY}`
                },
                body:JSON.stringify({
                    model:"gpt-4o-mini",
                    messages:[{ role:"user", content: prompt }]
                })
            }
        );

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    }catch(e){
        res.status(500).json({ reply:"AI เกิดข้อผิดพลาด" });
    }
});

app.listen(3000, ()=>{
    console.log("AI Server running at http://localhost:3000");
});
