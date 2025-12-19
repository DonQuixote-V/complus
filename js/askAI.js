const chatBox = document.getElementById("chatBox");

// โหลดประวัติแชท
let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
history.forEach(m => addMsg(m.text, m.sender, false));

// โหลดสเปคจาก Analyze
let spec = JSON.parse(localStorage.getItem("specData"));

function sendMsg(){
    let input = document.getElementById("userInput");
    let text = input.value.trim();
    if(!text) return;

    addMsg(text,"user",true);
    input.value="";

    let reply = generateReply(text);

    typeAI(reply);
}

// เพิ่มข้อความ
function addMsg(text,sender,save=true){
    let div = document.createElement("div");
    div.className = "msg "+sender;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    if(save){
        history.push({text, sender});
        localStorage.setItem("chatHistory", JSON.stringify(history));
    }
}

// พิมพ์ทีละตัว
function typeAI(text){
    let div = document.createElement("div");
    div.className = "msg ai";
    chatBox.appendChild(div);

    let i=0;
    let interval = setInterval(()=>{
        div.innerText += text.charAt(i);
        i++;
        chatBox.scrollTop = chatBox.scrollHeight;
        if(i >= text.length){
            clearInterval(interval);
            history.push({text, sender:"ai"});
            localStorage.setItem("chatHistory", JSON.stringify(history));
        }
    },30);
}

// AI Logic
function generateReply(q){
    q = q.toLowerCase();

    if(q.includes("สเปค") && spec){
        return `จากสเปคของคุณ:
CPU: ${spec.cpu}
GPU: ${spec.gpu}
RAM: ${spec.ram}
Storage: ${spec.storage}
คะแนนรวม: ${spec.score}
สรุป: ${spec.level}`;
    }

    if(q.includes("อัปเกรด") && spec){
        if(spec.score < 100)
            return "แนะนำให้อัปเกรด GPU ก่อน จะเห็นผลชัดที่สุด";
        return "สเปคคุณค่อนข้างดีแล้ว อัปเกรดได้ตามงบ";
    }

    if(q.includes("fps"))
        return "FPS ขึ้นกับ GPU และความละเอียดหน้าจอเป็นหลัก";

    if(q.includes("ล้างแชท")){
        localStorage.removeItem("chatHistory");
        location.reload();
    }

    return "ถามเรื่องสเปค เกม หรือการอัปเกรดได้นะ";
}
