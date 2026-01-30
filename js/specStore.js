function saveSpec(data){
    data.savedAt = new Date().toLocaleString("th-TH");
    localStorage.setItem("specData", JSON.stringify(data));
}

function getSpec(){
    const raw = localStorage.getItem("specData");
    return raw ? JSON.parse(raw) : null;
}

function clearSpecData(){
    if(confirm("ลบข้อมูลสเปคที่บันทึกไว้?")){
        localStorage.removeItem("specData");
        location.reload();
    }
}
