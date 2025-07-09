import { Usuario } from "../../model/Usuarios.js"; // certifique-se que o nome está certo!

const form = document.querySelector("#form-login") as HTMLFormElement;
const mensagem = document.querySelector("#mensagem") as HTMLDivElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const nome = (document.querySelector("#nome") as HTMLInputElement).value.trim();
  const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
  const senha = (document.querySelector("#senha") as HTMLInputElement).value;
  const confirmarSenha = (document.querySelector("#confirmar-senha") as HTMLInputElement).value;
  const dataNasc = (document.querySelector("#data-nascimento") as HTMLInputElement).value;
  const genero = (document.querySelector("#genero") as HTMLSelectElement).value;

  if (senha !== confirmarSenha) {
    mostrarErro("As senhas não coincidem.");
    return;
  }

  if (!nome || !dataNasc || !genero) {
    mostrarErro("Preencha todos os campos.");
    return;
  }

  const id = crypto.randomUUID();

  try {
    const usuario = new Usuario(id, nome, dataNasc, genero);

    // 🔽 Aqui você salva no localStorage
    const usuarioParaSalvar = {
      id,
      nome,
      email,
      senha,
      dataDeNascimento: dataNasc,
      genero,
    };

    localStorage.setItem("usuarioCadastrado", JSON.stringify(usuarioParaSalvar));

    console.log("Usuário salvo com sucesso:", usuarioParaSalvar);

    // Redirecionar para a página inicial
    window.location.href = "/view/html/PaginaInicial.html";
  } catch (erro: any) {
    mostrarErro(erro.message || "Erro ao criar usuário.");
  }
});

function mostrarErro(msg: string): void {
  mensagem.textContent = msg;
  mensagem.style.display = "block";
  mensagem.style.color = "red";
}
