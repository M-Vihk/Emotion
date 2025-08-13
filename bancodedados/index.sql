-- Banco de dados II - Projeto Final
-- Projeto: Emotion
-- Descrição: Sistema para rastreamento de emoções e pensamentos diários dos usuários.
-- Wanderson Vasconcelos
-- Deyvison Samuel Gomes do Nascimento, Maria Vitória da Silva Araújo, Maria Yasmin Oliveira Mélo, Rauan dos Santos Bandeira
-- Data: 13/08/2025

\connect postgres

DROP DATABASE IF EXISTS EMOTION;
CREATE DATABASE EMOTION; 

\c EMOTION; 

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

-- Inserção de usuários exemplo
INSERT INTO usuarios (nome, email, senha_hash, data_nascimento, genero) VALUES
('Ana Silva', 'ana.silva@email.com', 'hash1', '1990-05-10', 'Feminino'),
('Carlos Souza', 'carlos.souza@email.com', 'hash2', '1985-11-20', 'Masculino'),
('Beatriz Lima', 'beatriz.lima@email.com', 'hash3', '1992-03-15', 'Feminino'),
('Daniel Oliveira', 'daniel.oliveira@email.com', 'hash4', '1988-08-22', 'Masculino'),
('Fernanda Costa', 'fernanda.costa@email.com', 'hash5', '1995-12-05', 'Feminino');

-- Inserção de registros diários de emoções
INSERT INTO emocoes (id_usuario, data_registro, alegria, tristeza, raiva, medo, ansiedade) VALUES
(1, '2025-08-01', 4, 1, 2, 1, 3),
(2, '2025-08-01', 3, 2, 1, 2, 4),
(3, '2025-08-02', 5, 0, 0, 1, 1),
(4, '2025-08-03', 2, 3, 4, 2, 2),
(5, '2025-08-04', 4, 1, 1, 1, 3);

-- Inserção de pensamentos diários
INSERT INTO diario (id_usuario, data, pensamentos) VALUES
(1, '2025-08-01', 'Hoje foi um dia excelente, me senti muito feliz.'),
(2, '2025-08-01', 'Um pouco cansado, mas consegui resolver problemas no trabalho.'),
(3, '2025-08-02', 'Momento de reflexão e crescimento pessoal.'),
(4, '2025-08-03', 'Tive alguns conflitos, mas estou tentando melhorar.'),
(5, '2025-08-04', 'Dia tranquilo e cheio de esperança.');

-- Inserção de relatos com médias semanais/mensais das emoções
INSERT INTO relatos (id_usuario, data_criacao, media_alegria, media_tristeza, media_raiva, media_medo, media_ansiedade) VALUES
(1, '2025-08-07', 3.8, 1.0, 1.5, 1.0, 2.0),
(2, '2025-08-07', 3.0, 2.1, 1.2, 1.5, 3.5),
(3, '2025-08-07', 4.9, 0.1, 0.0, 1.2, 1.1),
(4, '2025-08-07', 2.1, 2.5, 3.8, 2.0, 2.0),
(5, '2025-08-07', 3.9, 1.2, 1.0, 1.0, 2.8);

-- Consulta: retorna todos os usuários cadastrados
SELECT * FROM usuarios;

-- Consulta: retorna todas as emoções do usuário com id 1, ordenadas pela data mais recente
SELECT * FROM emocoes WHERE id_usuario = 1 ORDER BY data_registro DESC;

-- Consulta: retorna todos os diários do usuário com id 2, ordenados da data mais recente
SELECT * FROM diario WHERE id_usuario = 2 ORDER BY data DESC;

-- Consulta: conta o total de entradas no diário por usuário
SELECT id_usuario, COUNT(*) AS total_diarios FROM diario GROUP BY id_usuario;

-- Consulta: retorna o relato mais recente por usuário
SELECT DISTINCT ON (id_usuario) * FROM relatos ORDER BY id_usuario, data_criacao DESC;

-- Consulta: calcula a média geral da emoção 'alegria' em todos os registros
SELECT AVG(alegria) AS media_alegria FROM emocoes;

-- Consulta: junta diário e emoções para mostrar dados completos do dia 2025-08-01 do usuário 1
SELECT d.data, d.pensamentos, e.alegria, e.tristeza, e.raiva, e.medo, e.ansiedade
FROM diario d
JOIN emocoes e ON d.id_usuario = e.id_usuario AND d.data = e.data_registro
WHERE d.id_usuario = 1 AND d.data = '2025-08-01';

-- Consulta: mostra usuários com média de ansiedade acima de 3
SELECT u.nome, r.media_ansiedade FROM usuarios u
JOIN relatos r ON u.id_usuario = r.id_usuario
WHERE r.media_ansiedade > 3;

-- Consulta: usuário com maior número de diários registrados
SELECT id_usuario, COUNT(*) AS total_diarios FROM diario
GROUP BY id_usuario
ORDER BY total_diarios DESC
LIMIT 1;

-- Consulta: soma das emoções por usuário no mês de agosto de 2025
SELECT id_usuario,
       SUM(alegria) AS soma_alegria,
       SUM(tristeza) AS soma_tristeza,
       SUM(raiva) AS soma_raiva,
       SUM(medo) AS soma_medo,
       SUM(ansiedade) AS soma_ansiedade
FROM emocoes
WHERE data_registro BETWEEN '2025-08-01' AND '2025-08-31'
GROUP BY id_usuario;
