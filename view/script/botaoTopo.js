// Criar o botão dinamicamente
const btnTopo = document.createElement("button");
btnTopo.id = "btnTopo";
btnTopo.title = "Voltar ao início";
btnTopo.textContent = "⬆";
document.body.appendChild(btnTopo);

// Mostrar/esconder o botão quando rolar
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 200) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
});

// Ação de voltar ao topo
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
