// ===============================
// Heuristic Spec Analyzer Engine
// ===============================

// ---------- CPU Estimation ----------
function estimateCPU(text){
    if(!text) return 20;
    text = text.toLowerCase();

    let score = 30;

    // Intel
    if(text.includes("i3")) score = 45;
    if(text.includes("i5")) score = 65;
    if(text.includes("i7")) score = 80;
    if(text.includes("i9")) score = 95;

    // AMD
    if(text.includes("ryzen 3")) score = 55;
    if(text.includes("ryzen 5")) score = 70;
    if(text.includes("ryzen 7")) score = 85;
    if(text.includes("ryzen 9")) score = 95;

    // Generation / year guess (à¹€à¸Šà¹ˆà¸™ 12400 / 5600)
    const num = text.match(/\d{4,5}/);
    if(num){
        const g = parseInt(num[0].substring(0,2));
        score += Math.min(g, 15);
    }

    if(text.includes("à¹€à¸à¹ˆà¸²")) score -= 10;
    if(text.includes("à¹ƒà¸«à¸¡à¹ˆ")) score += 5;

    return Math.max(20, Math.min(score, 100));
}

// ---------- GPU Estimation ----------
function estimateGPU(text){
    if(!text) return 20;
    text = text.toLowerCase();

    let score = 30;

    if(text.includes("à¸­à¸­à¸™à¸šà¸­à¸£à¹Œà¸”") || text.includes("onboard"))
        return 20;

    if(text.includes("gtx")) score = 55;
    if(text.includes("rtx")) score = 80;
    if(text.includes("rx")) score = 75;

    const num = text.match(/\d{3,4}/);
    if(num){
        score += Math.min(parseInt(num[0]) / 100, 20);
    }

    if(text.includes("ti")) score += 5;
    if(text.includes("super")) score += 5;

    return Math.max(20, Math.min(score, 100));
}

// ---------- RAM ----------
function ramScore(ram){
    if(ram >= 32) return { score: 100, text: "à¸¢à¸­à¸”à¹€à¸¢à¸µà¹ˆà¸¢à¸¡ âœ”" };
    if(ram >= 16) return { score: 80, text: "à¸”à¸µ âœ”" };
    if(ram >= 8)  return { score: 50, text: "à¸žà¸­à¹ƒà¸Šà¹‰ âœ”" };
    return { score: 25, text: "à¸•à¹ˆà¸³ âœ˜" };
}

// ---------- Storage ----------
function storageScore(val){
    return val >= 25
        ? { score: 100, text: "SSD âœ”" }
        : { score: 40, text: "HDD âœ˜" };
}

// ---------- Bottleneck ----------
function checkBottleneck(cpu, gpu){
    const ratio = cpu / gpu;
    if(ratio < 0.65) return "âš ï¸ à¸„à¸­à¸‚à¸§à¸”à¸—à¸µà¹ˆ CPU";
    if(ratio > 1.6)  return "âš ï¸ à¸„à¸­à¸‚à¸§à¸”à¸—à¸µà¹ˆ GPU";
    return "âœ… CPU à¹à¸¥à¸° GPU à¸ªà¸¡à¸”à¸¸à¸¥à¸”à¸µ";
}

// ---------- FPS Estimation ----------
function estimateFPS(cpu, gpu, resolution){
    let base = cpu * 0.4 + gpu * 0.6;

    if(resolution === 1440) base *= 0.75;
    if(resolution === 2160) base *= 0.5;

    return Math.max(20, Math.min(Math.round(base * 1.2), 240));
}

// ---------- Upgrade Suggestion ----------
function recommendUpgrade(cpu, gpu, ram){
    if(ram < 16) return "ðŸ’¡ à¹€à¸žà¸´à¹ˆà¸¡ RAM à¹€à¸›à¹‡à¸™ 16GB à¸„à¸¸à¹‰à¸¡à¸—à¸µà¹ˆà¸ªà¸¸à¸”";
    if(cpu < gpu - 15) return "ðŸ’¡ CPU à¸­à¹ˆà¸­à¸™à¸à¸§à¹ˆà¸² GPU à¹à¸™à¸°à¸™à¸³à¸­à¸±à¸›à¹€à¸à¸£à¸” CPU";
    if(gpu < cpu - 15) return "ðŸ’¡ GPU à¸­à¹ˆà¸­à¸™à¸à¸§à¹ˆà¸² CPU à¹à¸™à¸°à¸™à¸³à¸­à¸±à¸›à¹€à¸à¸£à¸” GPU";
    return "ðŸ’¡ à¸ªà¹€à¸›à¸„à¸ªà¸¡à¸”à¸¸à¸¥à¸”à¸µ à¸­à¸±à¸›à¹€à¸à¸£à¸”à¹„à¸”à¹‰à¸•à¸²à¸¡à¸‡à¸š";
}

// ===============================
// MAIN ANALYZE FUNCTION
// ===============================
function analyzeALL(){

    const cpuInput = document.getElementById("cpuInput").value;
    const gpuInput = document.getElementById("gpuInput").value;
    const ramVal   = parseInt(document.getElementById("ram").value);
    const storageVal = parseInt(document.getElementById("storage").value);
    const resolution = parseInt(document.getElementById("resolution").value);

    const result = document.getElementById("result");

    if(!cpuInput || !gpuInput || !ramVal){
        result.innerHTML = "âš  à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¹ƒà¸«à¹‰à¸„à¸£à¸š";
        return;
    }

    const cpu = estimateCPU(cpuInput);
    const gpu = estimateGPU(gpuInput);
    const ram = ramScore(ramVal);
    const storage = storageScore(storageVal);

    const totalScore = Math.round(
        cpu * 0.35 +
        gpu * 0.40 +
        ram.score * 0.15 +
        storage.score * 0.10
    );

    const level =
        totalScore >= 85 ? "ðŸ”¥ à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¹à¸£à¸‡à¸¡à¸²à¸" :
        totalScore >= 65 ? "âš™ï¸ à¸£à¸°à¸”à¸±à¸šà¸à¸¥à¸²à¸‡ à¹ƒà¸Šà¹‰à¸‡à¸²à¸™à¹„à¸”à¹‰à¸”à¸µ" :
        totalScore >= 45 ? "ðŸ™‚ à¸žà¸­à¹ƒà¸Šà¹‰à¸‡à¸²à¸™à¹„à¸”à¹‰" :
        "âš ï¸ à¸„à¸§à¸£à¸­à¸±à¸›à¹€à¸à¸£à¸”";

    const bottleneck = checkBottleneck(cpu, gpu);
    const fps = estimateFPS(cpu, gpu, resolution);
    const upgrade = recommendUpgrade(cpu, gpu, ramVal);
	
	// ===== บันทึกสเปคกลาง =====
const specData = {
    cpuText: cpuInput,
    gpuText: gpuInput,
    cpuScore: cpu,
    gpuScore: gpu,
    ram: ramVal,
    storage: storage.text,
    totalScore: totalScore,
    level: level,
    savedAt: new Date().toLocaleString("th-TH")
};

localStorage.setItem("specData", JSON.stringify(specData));


    // ---------- OUTPUT ----------
    result.innerHTML = `
        <h3>à¸œà¸¥à¸à¸²à¸£à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œà¸ªà¹€à¸›à¸„</h3>
        CPU: ${cpuInput} (${cpu}/100)<br>
        GPU: ${gpuInput} (${gpu}/100)<br>
        RAM: ${ramVal} GB (${ram.text})<br>
        Storage: ${storage.text}<br><br>

        à¸„à¸°à¹à¸™à¸™à¸£à¸§à¸¡: <b>${totalScore}/100</b><br>
        à¸ªà¸£à¸¸à¸›à¸£à¸°à¸”à¸±à¸šà¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡: <b>${level}</b><br><br>

        ${bottleneck}<br>
        ðŸŽ® FPS à¹‚à¸”à¸¢à¸›à¸£à¸°à¸¡à¸²à¸“: <b>${fps}</b><br>
        ${upgrade}
    `;

    // ---------- SAVE FOR PROFILE / AI ----------
    localStorage.setItem("specData", JSON.stringify({
        cpu: cpuInput,
        gpu: gpuInput,
        ram: ramVal + " GB",
        storage: storage.text,
        score: totalScore,
        level: level
    }));

    // ---------- ANALYZE COUNT ----------
    localStorage.setItem(
        "analyzeCount",
        (parseInt(localStorage.getItem("analyzeCount") || 0) + 1)
    );
}
