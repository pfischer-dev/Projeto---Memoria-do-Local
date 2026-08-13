const form = document.getElementById("formLoading");
const botao = document.querySelector(".botaoSubmit");

form.addEventListener("submit", ()=> {
    botao.value = `Loading...`
})

/* menu burger */

const menu_burguer = document.querySelector(".menu_burger");
const navBar = document.querySelector(".navbar");

menu_burguer.addEventListener("click", function() {
    navBar.classList.toggle("active")
})