document.getElementById("theme-toggle").onclick = function() {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        this.innerText = "Thème Sombre";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        this.innerText = "Thème Clair";
    }
};
