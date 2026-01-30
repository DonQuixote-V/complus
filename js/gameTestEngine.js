// ===============================
// Game Test Engine (Heuristic)
// ===============================

// ความกินสเปคของแต่ละเกม (ยิ่งสูงยิ่งหนัก)
const GAME_LOAD = {
    gtav: 75,
    valorant: 40,
    pubg: 85,
    cyberpunk: 120,
    rdr2: 110
};

function testGame(){

    const game = document.getElementById("game").value;
    const graphic = document.getElementById("graphic").value;
    const resolution = parseInt(document.getElementById("resolution").value);

    let cpu, gpu, ram;

    // 🔥 ดึงสเปคจาก Analyze ก่อน
    const spec = getSpec();

    if(spec){
        cpu = spec.cpuScore;
        gpu = spec.gpuScore;
        ram = spec.ram;
    }else{
        // fallback: ให้กรอกเอง
        cpu = parseInt(document.getElementById("cpu").value);
        gpu = parseInt(document.getElementById("gpu").value);
        ram = parseInt(document.getElementById("ram").value);
    }

    const box = document.getElementById("gameResult");

    if(!game || !cpu || !gpu || !ram){
        box.innerHTML = "⚠ กรุณาเลือกเกม และกรอก/วิเคราะห์สเปคก่อน";
        return;
    }

    // ---- คำนวณ FPS ----
    const GAME_LOAD = {
        gtav: 75,
        valorant: 40,
        pubg: 85,
        cyberpunk: 120,
        rdr2: 110
    };

    let presetMul =
        graphic === "low" ? 0.7 :
        graphic === "medium" ? 0.9 :
        graphic === "high" ? 1.1 : 1.3;

    let resMul =
        resolution === 1440 ? 0.75 :
        resolution === 2160 ? 0.5 : 1;

    let ramMul = ram >= 16 ? 1 : ram >= 8 ? 0.85 : 0.65;

    let fps = Math.round(
        ((cpu * 0.45 + gpu * 0.55) / GAME_LOAD[game]) * 60
        * presetMul * resMul * ramMul
    );

    fps = Math.max(10, Math.min(fps, 240));

    let feel =
        fps >= 120 ? "🔥 โคตรลื่น" :
        fps >= 60 ? "✅ ลื่นดี" :
        fps >= 30 ? "🙂 พอเล่นได้" :
        "⚠️ หน่วงมาก";

    box.innerHTML = `
        <h2>ผลการทดสอบเกม</h2>
        เกม: <b>${game.toUpperCase()}</b><br>
        กราฟิก: ${graphic.toUpperCase()}<br>
        ความละเอียด: ${resolution}p<br><br>
        FPS โดยประมาณ: <b>${fps}</b><br>
        ความรู้สึก: <b>${feel}</b>
    `;
}

document.addEventListener("DOMContentLoaded", () => {

    // ดึงสเปคจาก Analyze
    const spec = getSpec();
    if(!spec) return;

    // ใส่ค่าเริ่มต้น (ยังแก้ไขได้)
    const cpuInput = document.getElementById("cpu");
    const gpuInput = document.getElementById("gpu");
    const ramInput = document.getElementById("ram");

    if(cpuInput && !cpuInput.value){
        cpuInput.value = spec.cpuScore;
    }

    if(gpuInput && !gpuInput.value){
        gpuInput.value = spec.gpuScore;
    }

    if(ramInput && !ramInput.value){
        ramInput.value = spec.ram;
    }
});

