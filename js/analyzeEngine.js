const GAME_DATA = {
    valorant: { name: "Valorant", demand: 50 },
    gta5:     { name: "GTA V",     demand: 90 },
    cyberpunk:{ name: "Cyberpunk 2077", demand: 140 }
};

function analyzeALL() {
    const cpu = parseInt(document.getElementById("cpu").value);
    const gpu = parseInt(document.getElementById("gpu").value);
    const ram = parseInt(document.getElementById("ram").value);
    const storage = parseInt(document.getElementById("storage").value);
    const resolution = parseInt(document.getElementById("resolution").value);
    const gameKey = document.getElementById("game").value;

    let result = document.getElementById("result");

    if (!cpu || !gpu || !ram || !storage) {
        result.innerHTML = "⚠ กรุณากรอกข้อมูลให้ครบทุกช่อง";
        return;
    }

    // ---------------- CPU Rating ----------------
    let cpuText = "";
    if (cpu >= 55) cpuText = "ดีมาก ✔";
    else if (cpu >= 40) cpuText = "ระดับกลาง ✔";
    else cpuText = "ค่อนข้างต่ำ ✘";

    // ---------------- GPU Rating ----------------
    let gpuText = "";
    if (gpu >= 65) gpuText = "ดีมาก ✔";
    else if (gpu >= 40) gpuText = "พอใช้ได้ ✔";
    else gpuText = "ต่ำ ✘";

    // ---------------- RAM Rating ----------------
    let ramScore = 0;
    let ramText = "";
    if (ram >= 32) { ramScore = 30; ramText = "ยอดเยี่ยม ✔"; }
    else if (ram >= 16) { ramScore = 20; ramText = "ดี ✔"; }
    else if (ram >= 8) { ramScore = 10; ramText = "พอใช้ ✔"; }
    else { ramScore = 0; ramText = "ต่ำมาก ✘"; }

    // ---------------- Storage Rating ----------------
    let storageText = (storage >= 25) ? "SSD ✔" : "HDD ✘";

    // ---------------- TOTAL SCORE ----------------
    let totalScore = cpu + gpu + ramScore + storage;

    let level = "";
    if (totalScore >= 150) level = "🔥 แรงมาก เล่นได้ทุกเกม";
    else if (totalScore >= 110) level = "⚙️ ระดับกลาง เล่นดีหลายเกม";
    else if (totalScore >= 70)  level = "🙂 พอเล่นได้";
    else level = "⚠️ ต่ำมาก ควรอัปเกรด";

    // ---------------- FPS Calculation ----------------
    let fpsText = "";
    if (gameKey) {
        const game = GAME_DATA[gameKey];
        let multiplier = 1; // 1080p

        if (resolution === 1440) multiplier = 0.75;
        else if (resolution === 2160) multiplier = 0.50;

        let fps = Math.round((totalScore / game.demand) * 60 * multiplier);

        if (fps < 10) fps = 10;
        if (fps > 240) fps = 240;

        let fpsComment = "";
        if (fps >= 120) fpsComment = "โคตรลื่น!";
        else if (fps >= 60) fpsComment = "ลื่นดี";
        else if (fps >= 30) fpsComment = "พอใช้ได้";
        else fpsComment = "หน่วงมาก";

        fpsText = `
            <br><br>
            🎮 เกม: ${game.name}<br>
            FPS โดยประมาณ: <b>${fps} FPS</b><br>
            💡 ผล: ${fpsComment}
        `;
    } else {
        fpsText = "<br>⚠ ไม่ได้เลือกเกม จึงไม่สามารถคำนวณ FPS ได้";
    }

    // ---------------- HTML Output ----------------
    result.innerHTML = `
        <div style="color:white;">
        <h3>ผลการวิเคราะห์</h3>
        CPU: ${cpuText}<br>
        GPU: ${gpuText}<br>
        RAM: ${ramText}<br>
        Storage: ${storageText}<br><br>
        คะแนนรวม: <b>${totalScore}</b><br>
        ผลประเมินโดยรวม: <b>${level}</b><br>
        ${fpsText}
        </div>
    `;
}

// ====== ???????????????? AI ======
localStorage.setItem("specData", JSON.stringify({
    cpu: cpuText,
    gpu: gpuText,
    ram: ramText,
    storage: storageText,
    score: total,
    level: level
	localStorage.setItem(
 "analyzeCount",
 (parseInt(localStorage.getItem("analyzeCount")||0)+1)
);

}));


