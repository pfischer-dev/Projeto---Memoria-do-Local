const controle = document.querySelector(".controle-comparacao");
const imgAntiga = document.querySelector(".imagem-antiga");
const divisor = document.querySelector(".divisor");

function atualizarComparacao() {
    const valor = Number(controle.value);
    controle.addEventListener("input", () => {
        console.log("INPUT:", controle.value);
    });
    imgAntiga.style.clipPath = `inset(0 ${100 - valor}% 0 0)`;
    divisor.style.left = `${valor}%`;
}

controle.addEventListener("input", atualizarComparacao);
atualizarComparacao();
