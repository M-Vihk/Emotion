document.addEventListener("DOMContentLoaded", () => {
      // Simulação de chamada ao backend (troque por fetch real no seu projeto)
      const usuario = {
        nome: "Maria Vitória Silva Araújo",
        email: "maria@example.com",
        foto: "/assets/avatar-default.png"
      };

      document.getElementById("nome-usuario").textContent = usuario.nome;
      document.getElementById("email-usuario").textContent = usuario.email;
      document.getElementById("foto-perfil").src = usuario.foto;
    });

function habilitarEdicao() {
  const campos = document.querySelectorAll('input, select, textarea');
  campos.forEach(el => el.disabled = false);

  const btnEditar = document.querySelector('.btn-editar');
  btnEditar.textContent = "Editando...";
  btnEditar.style.opacity = 0.6;
  btnEditar.disabled = true;
}