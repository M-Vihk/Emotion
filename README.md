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

## Execução

Após a compilação, você pode rodar o projeto com:

```bash
node dist/view/Tela\ Usuário/fakeBD.js
```

Ou, se tiver um ponto de entrada principal diferente, adapte o caminho conforme a necessidade.

## Banco de Dados

O projeto inclui um script SQL localizado em:

```
bancodedados/index.sql
```

Certifique-se de executar esse script em seu SGBD (ex: PostgreSQL) para criar as tabelas necessárias.

## Estrutura do Projeto

- `controller/` – Controladores da aplicação
- `model/` – Modelos de dados
- `dist/view/` – Views compiladas
- `bancodedados/` – Scripts SQL
- `node_modules/` – Dependências

## Scripts úteis

- `npx tsc` – Compila os arquivos TypeScript
- `npm start` – (se configurado no `package.json`)

## Observações

- Certifique-se de configurar corretamente a conexão com o banco de dados no código.
- O projeto ainda pode estar em desenvolvimento, então revise os caminhos e arquivos principais.

## Licença

Este projeto é livre para fins educacionais.
