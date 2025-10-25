# Sistema de Cadastro e Autenticação de Clientes

## Descrição do Projeto
Este projeto é um sistema backend para cadastro e autenticação de clientes, construído usando Node.js e Express. Ele utiliza **bcrypt** para garantir a segurança das senhas armazenadas, transformando-as em hashes, e **JWT (JSON Web Tokens)** para autenticação stateless, permitindo que os usuários acessem rotas protegidas através de tokens gerados na hora do login.

O sistema oferece funcionalidades essenciais para um mecanismo seguro de autenticação, incluindo:
- Cadastro seguro de usuários com hash de senha;
- Login com validação da senha e geração de token JWT;
- Proteção de rotas privadas usando middleware de autenticação;
- Suporte a sessões sem estado, facilitando a escalabilidade.

Este projeto é ideal para quem deseja aprender conceitos fundamentais de segurança em aplicações web, incluindo hashing e autenticação baseada em tokens.

## Tecnologias usadas
- Node.js 
- Express.js
- MySQL (ou outro banco relacional)
- bcrypt
- jsonwebtoken
- Middleware Express para parsing JSON

## Como usar

### Pré-requisitos
- Node.js instalado
- MySQL rodando localmente ou remotamente
- Postman ou similar para testar API (opcional)

### Instalação e execução
1. Clone o repositório:
