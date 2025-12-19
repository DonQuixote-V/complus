const GAME_DEMAND = {
    gtav:      { name: "GTA V", demand: 90 },
    valorant:  { name: "Valorant", demand: 40 },
    pubg:      { name: "PUBG", demand: 100 },
    cyberpunk: { name: "Cyberpunk 2077", demand: 150 },
    rdr2:      { name: "RDR2", demand: 145 }
};

const GRAPHIC_MULT = {
    low: 1.2,
    medium: 1.0,
    high: 0.8,
    ultra: 0.6
};

function testGame(){
    let gameKey = document.getElementById("game").value;
    let graphic = document.getElementById("graphic").value;

    let cpu = parseInt(document.getElementById("cpu").value);
    let gpu = parseInt(document.getElementById("gpu").value);
    let ram = parseInt(document.getElementById("ram").value);
    let res = parseInt(document.getElementById("resolution").value);

    let box = document.getElementById("gameResult");

    if(!gameKey || !cpu || !gpu || !ram){
        box.innerHTML = "⚠ กรุณากรอกข้อมูลให้ครบ";
        return;
    }

    let base = cpu + gpu;

    // RAM bonus
    if(ram >= 32) base += 25;
    else if(ram >= 16) base += 15;
    else if(ram >= 8) base += 5;
    else base -= 10;

    // Resolution multiplier
    let r = (res === 1080 ? 1 : res === 1440 ? 0.75 : 0.5);

    // FPS คำนวณจริง
    let fps = Math.round((base / GAME_DEMAND[gameKey].demand) * 60 * GRAPHIC_MULT[graphic] * r);

    if(fps < 5) fps = 5;
    if(fps > 240) fps = 240;

    let comment =
        fps >= 120 ? "🔥 ลื่นระดับ eSport" :
        fps >= 60  ? "✔ ลื่นดี" :
        fps >= 30  ? "🙂 พอเล่นได้" :
                     "⚠ หน่วงมาก";

    box.innerHTML = `
        <h2>ผลวิเคราะห์เกม</h2>
        เกม: <b>${GAME_DEMAND[gameKey].name}</b><br>
        กราฟิก: <b>${graphic.toUpperCase()}</b><br><br>
        FPS โดยประมาณ: <b style="color:#FFD700">${fps} FPS</b><br><br>
        💡 สรุปผล: ${comment}
    `;
	
	localStorage.setItem(
 "gameCount",
 (parseInt(localStorage.getItem("gameCount")||0)+1)
);

}
