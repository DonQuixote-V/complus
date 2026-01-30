const chatBox = document.getElementById("chatBox");

// โหลดประวัติแชท
let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
history.forEach(m => addMsg(m.text, m.sender, false));

// โหลดสเปค
function getSpec(){
    const raw = localStorage.getItem("specData");
    if(!raw) return null;
    return JSON.parse(raw);
}

// ส่งข้อความ
async function sendMsg(){
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if(text === "") return;

    addMsg(text,"user");
    input.value = "";

    // แสดง typing
    let typing = document.createElement("div");
    typing.className = "msg ai";
    typing.innerText = "AI กำลังพิมพ์...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    try{
        const res = await fetch("http://localhost:3000/ask-ai", {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({
                message:text,
                spec:getSpec()
            })
        });

        const data = await res.json();
        chatBox.removeChild(typing);
        typeAI(data.reply);

    }catch(e){
        chatBox.removeChild(typing);
        addMsg("AI ตอบไม่ได้","ai");
    }
}

// เพิ่มข้อความธรรมดา
function addMsg(text,sender,save=true){
    let div=document.createElement("div");
    div.className="msg "+sender;
    div.innerText=text;
    chatBox.appendChild(div);
    chatBox.scrollTop=chatBox.scrollHeight;

    if(save){
        history.push({text,sender});
        localStorage.setItem("chatHistory",JSON.stringify(history));
    }
}

// พิมพ์ทีละตัว (AI)
function typeAI(text){
    let div=document.createElement("div");
    div.className="msg ai";
    chatBox.appendChild(div);

    let i=0;
    let interval=setInterval(()=>{
        div.innerText+=text.charAt(i);
        i++;
        chatBox.scrollTop=chatBox.scrollHeight;
        if(i>=text.length){
            clearInterval(interval);
            history.push({text, sender:"ai"});
            localStorage.setItem("chatHistory",JSON.stringify(history));
        }
    },25);
}

// ล้างแชท
function clearChat(){
    localStorage.removeItem("chatHistory");
    location.reload();
}
