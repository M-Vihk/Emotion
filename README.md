# Emotion

Projeto desenvolvido em Node.js com TypeScript, estruturado no padrão MVC (Model-View-Controller), voltado para o gerenciamento de usuários e integração com banco de dados.

## Pré-requisitos

Antes de começar, verifique se você tem os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- Um gerenciador de banco de dados que suporte SQL (ex:PostgreSQL)

## Instalação

1. Clone este repositório ou extraia o conteúdo do `.zip`:
   ```bash
   unzip Emotion-main.zip
   cd Emotion-main
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile os arquivos TypeScript para JavaScript:
   ```bash
   npx tsc
   ```

4. Configure o banco de dados:
   ```bash
   bancodedados/index.sql
   ```

## Execução

Após a compilação, você pode rodar o projeto com:

```bash
npm run start
```

Em seguida, abra no navegador:

```bash
http://localhost:1234/
```

## Funcionalidades Detalhadas

A aplicação Emotion foi desenvolvida para facilitar o registro e acompanhamento de emoções, fornecendo recursos práticos para autocontrole emocional.  
A seguir, uma lista detalhada de cada funcionalidade:

1. Gestão de Usuários
- `Cadastro` – Criação de conta com nome, e-mail e senha.
- `Login` – Autenticação segura para acessar a conta.
- `Sessão persistente` – Mantém o usuário logado até que ele opte por sair.
- `Edição de perfil` – Possibilidade de atualizar informações pessoais.

2. Diário Digital de Emoções
- `Registro diário ou semanal` das emoções sentidas.
- `Seleção de estado emocional` por categorias (feliz, triste, ansioso, calmo, etc.).
- `Adição de anotações` para contextualizar o sentimento.
- `Histórico completo` para visualização de registros anteriores.

3. Sugestões Personalizadas
- O sistema analisa o estado emocional registrado.
- Gera dicas e ações recomendadas para melhorar ou manter o bem-estar.
- Sugestões adaptadas para cada categoria de emoção.

4. Relatórios e Análises
- Exibição gráfica da evolução emocional ao longo do tempo.
- Comparação de estados emocionais por período.
- Destaque para padrões recorrentes.

5. Segurança e Privacidade
- Senhas criptografadas no banco de dados.
- Acesso restrito apenas ao usuário autenticado.
- Controle de sessão para evitar acessos não autorizados.

6. Interface Web
- Layout responsivo adaptado para desktop e dispositivos móveis.
- Navegação intuitiva com páginas separadas para **Página Inicial**, **Diário Digital** e **Perfil**.
- Sistema construído para fácil manutenção e escalabilidade.

7. Integração com Banco de Dados
- Script SQL pronto para criar todas as tabelas necessárias.
- Estrutura compatível com PostgreSQL (ou outro SGBD relacional).
- Operações de inserção, leitura e atualização de registros.

## Banco de Dados

O projeto inclui um script SQL localizado em:

```
bancodedados/index.sql
```

Certifique-se de executar esse script em seu SGBD (ex: PostgreSQL) para criar as tabelas necessárias.

## Estrutura do Projeto
`Emotion`
- `controller/` – Controladores da aplicação
- `model/` – Modelos de dados
- `dist/view/` – Views compiladas
- `bancodedados/` – Scripts SQL
- `node_modules/` – Dependências
- `package.json/` - Configurações do projeto e scripts npm
- `tsconfig.json/` - Configuração do TypeScript
- `README.md/` - Documentação do projeto

## Tecnologias Utilizadas

- `Node.js`
- `TypeScript`
- `PostgreSQL`
- `Parcel`

## Scripts úteis

- `npx tsc` – Compila os arquivos TypeScript
- `npm start` – (se configurado no `package.json`)

## Observações

- Certifique-se de configurar corretamente a conexão com o banco de dados no código.
- O projeto ainda pode estar em desenvolvimento, então revise os caminhos e arquivos principais.

## Licença

Este projeto é livre para fins educacionais.
