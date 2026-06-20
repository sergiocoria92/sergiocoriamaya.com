const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const user = document
        .getElementById("user")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    if(
        user === "pruebacoria" &&
        password === "123abc"
    ){

        localStorage.setItem(
            "erpLogged",
            "true"
        );

        window.location.href =
        "pages/home.html";

    } else {

        alert(
            "Incorrect username or password."
        );

    }

});