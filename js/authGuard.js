(function(){
    const user =
        localStorage.getItem("username") ||
        sessionStorage.getItem("username");

    if(!user && !location.pathname.toLowerCase().includes("login")){
        window.location.href = "login.html";
    }
})();
