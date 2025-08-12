import { supabase } from "./supabaseClient.js";

export class SupabaseService {
  static async salvarNoBanco(
    nome: string,
    email: string,
    senha: string,
    dataNasc: string,
    genero: string
  ): Promise<void> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (error) {
        throw new Error("Erro ao cadastrar usuário: " + error.message);
      }

      const { error: insertError } = await supabase.from("usuarios").insert([
        {
          id: data.user?.id,
          nome: nome,
          nascimento: dataNasc,
          genero: genero,
        },
      ]);

      if (insertError) {
        throw new Error("Erro ao salvar dados extra do usuario: " + insertError.message);
      }

      console.log("Usuário cadastrado com sucesso!", data.user);
    } catch (error: any) {
      throw new Error(error.message || "Erro inesperado ao criar usuário.");
    }
  }


  static async fazerLogin(email: string, senha: string): Promise<any> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        throw new Error("Email ou senha inválidos.");
      }

      return data.user;
    } catch (err: any) {
      throw new Error(err.message || 'Erro inesperado ao fazer login.');
    }
  }


  static async salvarEmocoes(
    alegria: number,
    tristeza: number,
    ansiedade: number,
    raiva: number,
    medo: number
  ): Promise<void> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Usuário não autenticado.");
      }

      // Insere na tabela de emoções
      const { error } = await supabase.from("emocoes").insert([
        {
          id_usuario: user.id,
          alegria: alegria,
          tristeza: tristeza,
          ansiedade: ansiedade,
          raiva: raiva,
          medo: medo,
          data_registro: new Date().toISOString().split("T")[0] // formato YYYY-MM-DD
        }
      ]);
      console.log( user.id);

      if (error) {
        throw new Error("Erro ao salvar notas emocionais: " + error.message);
      }

      console.log("Notas emocionais salvas com sucesso!");
    } catch (err: any) {
      throw new Error(err.message || "Erro inesperado ao salvar notas emocionais.");
    }
  }

}
