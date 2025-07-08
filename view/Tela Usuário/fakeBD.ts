// Banco de dados fake simulando um usuário logado
export interface Usuario {
  nome: string;
  email: string;
  nascimento: string;
  sexo: string;
  biografia: string;
}

export let usuarioFake: Usuario = {
  nome: "Vitória",
  email: "vitoria@email.com",
  nascimento: "1995-08-12",
  sexo: "Feminino",
  biografia:
    "Desenvolvedora Front-End com ênfase em acessibilidade e usabilidade. Apaixonada por design centrado no usuário e interfaces responsivas. 5 anos de experiência em tecnologia.",
};

// Função simulada para editar o usuário
export function atualizarUsuario(dados: Usuario): void {
  usuarioFake = { ...dados };
  console.log("Usuário atualizado:", usuarioFake);
}
