document.addEventListener("DOMContentLoaded", () => {

    // ชื่อผู้ใช้
    let name = localStorage.getItem("username") || "Guest";
    document.getElementById("username").innerText = name;

    // สเปคเครื่อง
    let spec = JSON.parse(localStorage.getItem("specData"));
    let specBox = document.getElementById("mySpec");

    if(spec){
        specBox.innerHTML = `
        CPU: ${spec.cpu}<br>
        GPU: ${spec.gpu}<br>
        RAM: ${spec.ram}<br>
        Storage: ${spec.storage}<br>
        คะแนนรวม: ${spec.score}<br>
        สรุป: ${spec.level}
        `;
    }else{
        specBox.innerHTML = "ยังไม่ได้วิเคราะห์สเปค";
    }

    // สถิติ
    document.getElementById("analyzeCount").innerText =
        localStorage.getItem("analyzeCount") || 0;

    document.getElementById("gameCount").innerText =
        localStorage.getItem("gameCount") || 0;

    document.getElementById("compareCount").innerText =
        localStorage.getItem("compareCount") || 0;
});

// เปลี่ยนชื่อ
function changeName(){
    let name = prompt("ใส่ชื่อผู้ใช้ใหม่:");
    if(name){
        localStorage.setItem("username", name);
        location.reload();
    }
}

// ล้างข้อมูล
function clearProfile(){
    if(confirm("ต้องการล้างข้อมูลทั้งหมดหรือไม่?")){
        localStorage.clear();
        location.reload();
    }
}
