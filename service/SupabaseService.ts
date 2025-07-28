import { supabase } from "./supabaseClient.js";

export class SupabaseService{

    static async salvarNoBanco(nome : string, email : string, senha: string, dataNasc: string, genero: string): Promise<void> {
      try {
        console.log("Cadastrando com:", { email, senha });
        const {data, error} = await supabase.auth.signUp({
          email: email,
          password: senha,
        });
    
        if (error) {
          mostrarErro("Erro ao cadastrar usuário: " + error.message);
          return;
        }
        
        const {error: insertError} = await supabase.from('Usuarios').insert([
          {
            id: data.user?.id,
            nome: nome,
            dataDeNascimento: dataNasc,
            genero: genero,
          },
        ])
    
        if(insertError){
          mostrarErro("Erro ao salvar dados extra do usuario: " + insertError.message);
          return;
        }   
    
        console.log("Usuário cadastrado com sucesso!", data.user);
    
      }catch(error: any){
        mostrarErro(error.message || 'Erro inesperado ao criar usuário.');
      }
    
    }
}