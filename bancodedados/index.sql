-- Banco de dados II - Projeto Final
-- Projeto: Emotion
-- Descrição: Sistema para rastreamento de emoções e pensamentos diários dos usuários.
-- Wanderson Vasconcelos
-- Deyvison Samuel Gomes do Nascimento, Maria Vitória da Silva Araújo, Maria Yasmin Oliveira Mélo, Rauan dos Santos Bandeira
-- Data: 13/08/2025

\connect postgres

DROP DATABASE IF EXISTS emotion;
CREATE DATABASE emotion; 

\c emotion; 

-- Tabela de usuários que armazenará dados básicos e credenciais
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    data_nascimento DATE,
    genero VARCHAR(20)
);

-- Tabela para registrar as emoções diárias dos usuários
CREATE TABLE emocoes (
    id_emocao SERIAL PRIMARY KEY,
    id_usuario SERIAL,
    data_registro DATE,
    alegria INT,
    tristeza INT,
    raiva INT,
    medo INT,
    ansiedade INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela para armazenar os pensamentos diários dos usuários
CREATE TABLE diario (
    id_diario SERIAL PRIMARY KEY,
    id_usuario SERIAL,
    data DATE NOT NULL,
    pensamentos TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela para armazenar relatos com médias das emoções em períodos específicos
CREATE TABLE relatos (
    id_relato SERIAL PRIMARY KEY,
    id_usuario SERIAL,
    data_criacao DATE NOT NULL,
    media_alegria FLOAT,
    media_tristeza FLOAT,
    media_raiva FLOAT,
    media_medo FLOAT,
    media_ansiedade FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela para sugestões de atividades e práticas para lidar com emoções
CREATE TABLE sugestoes (
    id_sugestao SERIAL PRIMARY KEY,
    sugestoes_alegria TEXT,
    sugestoes_tristeza TEXT,
    sugestoes_raiva TEXT,
    sugestoes_medo TEXT,
    sugestoes_ansiedade TEXT
);

-- Inserindo dados na tabela usuarios
INSERT INTO usuarios (nome, email, senha_hash, data_nascimento, genero) VALUES
('Ana Silva', 'ana@email.com', 'hash123', '1990-05-12', 'Feminino'),
('Carlos Souza', 'carlos@email.com', 'hash456', '1985-08-23', 'Masculino'),
('Maria Oliveira', 'maria@email.com', 'hash789', '1993-11-30', 'Feminino'),
('João Santos', 'joao@email.com', 'hash101', '2000-01-15', 'Masculino'),
('Paula Mendes', 'paula@email.com', 'hash202', '1988-07-09', 'Feminino'),
('Ricardo Lima', 'ricardo@email.com', 'hash303', '1995-09-21', 'Masculino'),
('Fernanda Costa', 'fernanda@email.com', 'hash404', '1992-04-18', 'Feminino');

-- Inserindo dados na tabela emocoes
INSERT INTO emocoes (id_usuario, data_registro, alegria, tristeza, raiva, medo, ansiedade) VALUES
(1, '2025-08-01', 4, 1, 0, 1, 2),
(2, '2025-08-01', 3, 2, 1, 0, 1),
(3, '2025-08-01', 2, 4, 3, 2, 5),
(4, '2025-08-02', 5, 0, 0, 0, 1),
(5, '2025-08-02', 1, 5, 4, 3, 5),
(6, '2025-08-02', 3, 2, 2, 2, 2),
(7, '2025-08-02', 4, 1, 0, 1, 1),
(1, '2025-08-03', 5, 0, 0, 0, 0);

-- Inserindo dados na tabela diario
INSERT INTO diario (id_usuario, data, pensamentos) VALUES
(1, '2025-08-01', 'Dia tranquilo e produtivo.'),
(2, '2025-08-01', 'Me senti cansado, mas feliz com o progresso no trabalho.'),
(3, '2025-08-01', 'Dia difícil, muitas preocupações.'),
(4, '2025-08-02', 'Passeio agradável com amigos.'),
(5, '2025-08-02', 'Discussão em casa me deixou chateada.'),
(6, '2025-08-02', 'Dia comum, sem grandes emoções.'),
(7, '2025-08-02', 'Aprendi algo novo e foi empolgante.'),
(1, '2025-08-03', 'Excelente dia, tudo deu certo.');

-- Inserindo dados na tabela relatos
INSERT INTO relatos (id_usuario, data_criacao, media_alegria, media_tristeza, media_raiva, media_medo, media_ansiedade) VALUES
(1, '2025-08-03', 4.5, 0.5, 0.0, 0.5, 1.0),
(2, '2025-08-03', 3.0, 2.0, 1.0, 0.0, 1.0),
(3, '2025-08-03', 2.0, 4.0, 3.0, 2.0, 5.0),
(4, '2025-08-03', 5.0, 0.0, 0.0, 0.0, 1.0),
(5, '2025-08-03', 1.0, 5.0, 4.0, 3.0, 5.0);

-- Inserindo dados na tabela sugestoes
INSERT INTO sugestoes (sugestoes_alegria, sugestoes_tristeza, sugestoes_raiva, sugestoes_medo, sugestoes_ansiedade) VALUES
('Praticar gratidão diariamente.', 'Conversar com um amigo de confiança.', 'Respirar fundo e contar até 10.', 'Enfrentar o medo gradualmente.', 'Praticar meditação.'),
('Ouvir música favorita.', 'Escrever sobre seus sentimentos.', 'Sair para caminhar.', 'Buscar informações confiáveis.', 'Fazer exercícios físicos.'),
('Sair com amigos.', 'Assistir um filme leve.', 'Tirar um tempo sozinho.', 'Falar sobre o medo.', 'Evitar cafeína.'),
('Fazer voluntariado.', 'Praticar um hobby.', 'Tentar compreender a causa.', 'Praticar respiração profunda.', 'Estabelecer rotina de sono.'),
('Celebrar pequenas conquistas.', 'Buscar apoio profissional.', 'Praticar esportes.', 'Lembrar de experiências positivas.', 'Reduzir tempo nas redes sociais.');

-- 1. Listar todos os usuários
SELECT * FROM usuarios;

-- 2. Mostrar nome e email de todos os usuários ordenados por nome
SELECT nome, email FROM usuarios ORDER BY nome;

-- 3. Mostrar emoções registradas no dia 2025-08-02
SELECT * FROM emocoes WHERE data_registro = '2025-08-02';

-- 4. Mostrar a média de alegria de todos os registros
SELECT AVG(alegria) AS media_alegria FROM emocoes;

-- 5. Buscar pensamentos do usuário "Ana Silva"
SELECT pensamentos FROM diario
JOIN usuarios ON diario.id_usuario = usuarios.id_usuario
WHERE usuarios.nome = 'Ana Silva';

-- 6. Mostrar os relatos com maior média de ansiedade
SELECT * FROM relatos ORDER BY media_ansiedade DESC;

-- 7. Listar sugestões para lidar com tristeza
SELECT sugestoes_tristeza FROM sugestoes;

-- 8. Contar quantos usuários são do gênero feminino
SELECT COUNT(*) AS qtd_feminino FROM usuarios WHERE genero = 'Feminino';

-- 9. Mostrar registros de emoções do usuário com email "carlos@email.com"
SELECT e.* FROM emocoes e
JOIN usuarios u ON e.id_usuario = u.id_usuario
WHERE u.email = 'carlos@email.com';

-- 10. Mostrar média de emoções agrupadas por usuário
SELECT u.nome,
       AVG(alegria) AS media_alegria,
       AVG(tristeza) AS media_tristeza,
       AVG(raiva) AS media_raiva,
       AVG(medo) AS media_medo,
       AVG(ansiedade) AS media_ansiedade
FROM emocoes e
JOIN usuarios u ON e.id_usuario = u.id_usuario
GROUP BY u.nome
ORDER BY media_alegria DESC;
