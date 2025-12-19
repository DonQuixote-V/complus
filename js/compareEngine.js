function calcScore(cpu, gpu, ram, storage) {
    let score = cpu + gpu + storage;

    if (ram >= 32) score += 30;
    else if (ram >= 16) score += 20;
    else if (ram >= 8) score += 10;
    else score += 0;

    return score;
}

function compareSpec() {
    let cpuA = parseInt(document.getElementById("cpuA").value);
    let gpuA = parseInt(document.getElementById("gpuA").value);
    let ramA = parseInt(document.getElementById("ramA").value);
    let storageA = parseInt(document.getElementById("storageA").value);

    let cpuB = parseInt(document.getElementById("cpuB").value);
    let gpuB = parseInt(document.getElementById("gpuB").value);
    let ramB = parseInt(document.getElementById("ramB").value);
    let storageB = parseInt(document.getElementById("storageB").value);

    let result = document.getElementById("compareResult");

    if (!cpuA || !gpuA || !ramA || !cpuB || !gpuB || !ramB) {
        result.innerHTML = "⚠ กรุณากรอกข้อมูลให้ครบทั้งสองเครื่อง";
        return;
    }

    let scoreA = calcScore(cpuA, gpuA, ramA, storageA);
    let scoreB = calcScore(cpuB, gpuB, ramB, storageB);

    let detail = "";

    // CPU مقارنة
    if (cpuA > cpuB) detail += "<p>📌 CPU: เครื่อง A แรงกว่า</p>";
    else if (cpuB > cpuA) detail += "<p>📌 CPU: เครื่อง B แรงกว่า</p>";
    else detail += "<p>📌 CPU: สเปกระดับเท่ากัน</p>";

    // GPU مقارنة
    if (gpuA > gpuB) detail += "<p>🖥️ GPU: เครื่อง A แรงกว่า</p>";
    else if (gpuB > gpuA) detail += "<p>🖥️ GPU: เครื่อง B แรงกว่า</p>";
    else detail += "<p>🖥️ GPU: สเปกระดับเท่ากัน</p>";

    // RAM مقارنة
    if (ramA > ramB) detail += "<p>📦 RAM: เครื่อง A มี RAM มากกว่า</p>";
    else if (ramB > ramA) detail += "<p>📦 RAM: เครื่อง B มี RAM มากกว่า</p>";
    else detail += "<p>📦 RAM: RAM เท่ากัน</p>";

    // Storage مقارنة
    if (storageA > storageB) detail += "<p>💾 Storage: เครื่อง A เร็วกว่า (SSD เยอะกว่า)</p>";
    else if (storageB > storageA) detail += "<p>💾 Storage: เครื่อง B เร็วกว่า (SSD เยอะกว่า)</p>";
    else detail += "<p>💾 Storage: ความเร็วเท่ากัน</p>";

    // สรุปคะแนนรวม
    detail += `<hr>`;
    detail += `<p>📊 คะแนนรวม:</p>`;
    detail += `<p>เครื่อง A: <b>${scoreA}</b></p>`;
    detail += `<p>เครื่อง B: <b>${scoreB}</b></p>`;

    // สรุปเครื่องไหนดีกว่า
    if (scoreA > scoreB) detail += `<p class="win">🏆 สรุป: เครื่อง A เหนือกว่าโดยรวม</p>`;
    else if (scoreB > scoreA) detail += `<p class="win">🏆 สรุป: เครื่อง B เหนือกว่าโดยรวม</p>`;
    else detail += `<p class="win">⚖️ ผลออกมาเสมอกัน</p>`;

    result.innerHTML = detail;
}
