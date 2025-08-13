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
        throw new Error(
          "Erro ao salvar dados extra do usuario: " + insertError.message
        );
      }

      console.log("Usuário cadastrado com sucesso!", data.user);
    } catch (error: any) {
      throw new Error(error.message || "Erro inesperado ao criar usuário.");
    }
  }

  static async getUsuarioAutenticado() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    return user;
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
      throw new Error(err.message || "Erro inesperado ao fazer login.");
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
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Usuário não autenticado.");
      }

      const registroHoje = await this.verificarRegistroHoje(user.id);
      if (registroHoje) {
        throw new Error("Você já registrou suas emoções hoje.");
      }

      const { error } = await supabase.from("emocoes").insert([
        {
          id_usuario: user.id,
          data_registro: new Date().toISOString().split("T")[0],
          alegria: alegria,
          tristeza: tristeza,
          ansiedade: ansiedade,
          raiva: raiva,
          medo: medo,
        },
      ]);

      if (error) {
        throw new Error("Erro ao salvar notas emocionais: " + error.message);
      }

      console.log("Notas emocionais salvas com sucesso!");
    } catch (err: any) {
      throw new Error(
        err.message || "Erro inesperado ao salvar notas emocionais."
      );
    }
  }

  static async verificarRegistroHoje(userId: string): Promise<boolean> {
    const hoje = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("emocoes")
      .select("id")
      .eq("id_usuario", userId)
      .eq("data_registro", hoje);

    if (error) {
      throw new Error("Erro ao verificar registros: " + error.message);
    }

    return data && data.length > 0;
  }

  static async buscarDadosUsuario(userId: string) {
    const { data: dadosUsuario, error: errorUsuario } = await supabase
      .from("usuarios")
      .select("nome, nascimento, genero")
      .eq("id", userId)
      .single();

    if (errorUsuario) {
      throw new Error(
        "Erro ao buscar dados do usuário: " + errorUsuario.message
      );
    }

    const {
      data: { user },
      error: errorAuth,
    } = await supabase.auth.getUser();

    if (errorAuth || !user) {
      throw new Error("Erro ao obter email do usuário autenticado.");
    }

    return {
      nome: dadosUsuario.nome,
      nascimento: dadosUsuario.nascimento,
      genero: dadosUsuario.genero,
      email: user.email,
    };
  }

  static async getUsuarioAtual() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) throw new Error("Usuário não autenticado.");
    return user;
  }

  static async sair(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error("Erro ao sair: " + error.message);
      }
      console.log("Usuário desconectado com sucesso!");
    } catch (err: any) {
      throw new Error(err.message || "Erro inesperado ao sair.");
    }
  }

  static async salvarDiario(
    titulo: string,
    data: string,
    pensamentos: string
  ): Promise<void> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Usuário não autenticado.");
      }

      const { error } = await supabase.from("diario").insert([
        {
          id_usuario: user.id,
          titulo: titulo,
          data: data,
          pensamentos: pensamentos,
        },
      ]);

      if (error) {
        throw new Error("Erro ao salvar o diário: " + error.message);
      }

      console.log("Entrada do diário salva com sucesso!");
    } catch (err: any) {
      throw new Error(err.message || "Erro inesperado ao salvar o diário.");
    }
  }

  static async listarDiarios(): Promise<any[]> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Usuário não autenticado.");
      }

      const { data, error } = await supabase
        .from("diario")
        .select("*")
        .eq("id_usuario", user.id)
        .order("data", { ascending: false });

      if (error) {
        throw new Error("Erro ao buscar o diário: " + error.message);
      }

      return data || [];
    } catch (err: any) {
      throw new Error(err.message || "Erro inesperado ao listar o diário.");
    }
  }

  static async salvarRelatorio(userId: string, medias: any) {
    const { error } = await supabase.from("relatorios").insert([
      {
        id_usuario: userId,
        data_criacao: new Date().toISOString(),
        media_alegria: medias.alegria,
        media_tristeza: medias.tristeza,
        media_medo: medias.medo,
        media_ansiedade: medias.ansiedade,
        media_raiva: medias.raiva,
      },
    ]);

    if (error) throw new Error("Erro ao salvar relatório: " + error.message);
  }

  static async getUltimosRegistrosEmocionais(
    userId: string,
    limite: number = 7
  ) {
    const { data, error } = await supabase
      .from("emocoes")
      .select("alegria, tristeza, medo, ansiedade, raiva")
      .eq("id_usuario", userId)
      .order("data_registro", { ascending: false })
      .limit(limite);

    if (error)
      throw new Error("Erro ao buscar registros emocionais: " + error.message);
    return data || [];
  }

  static async getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
  }

  static async excluirDiario(id: string) {
  const { error } = await supabase.from('diario').delete().eq('id', id);
  if (error) throw error;
  }

  static async excluirTodosDiarios(id_usuario: string) {
  const { error } = await supabase.from('diario').delete().eq('id_usuario', id_usuario);
  if (error) throw error;
  }

}