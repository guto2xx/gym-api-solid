# Gympass style app Node.Js
![Badge Linguagem](https://img.shields.io/badge/Linguagem-Nodejs-green) ![Badge ORM](https://img.shields.io/badge/ORM-Prisma-blue) ![Badge Framework](https://img.shields.io/badge/Framework-Fastify-critical) ![Badge Framework](https://img.shields.io/badge/Test-Vitest-yellow) ![Badge Framework](https://img.shields.io/badge/Arquitetura-SOLID-purple) 

Projeto com algumas funcionálidades baseadas em um app estilo gympass.

# :hammer: Funcionalidades do projeto

- `User/Auth`:
    - `Cadastro de usuário`: Os usuários podem se cadastrar.
    - `Autenticação`: Os usuários podem fazer login e gerar seu token de autenticação.
    - `Ver seu Perfil`: Caso autenticados, os usuários podem ver seu perfil.
- `Gyms`:
    - `Cadastro de academias`: Os usuários administradores podem cadastrar academias.
    - `Busca de academias`: Os usuários podem cadastrar procurar por academias pelo nome ou as mais próximas.
- `Check-In`:
    - `Criação de check-in`: Os usuários podem cadastrar criar um check-in.
    - `Validação de check-in`: Os usuários administradores podem validar um check-in.
    - `Histórico de Métricas`: Os usuários podem ver seu histórico de check-ins e também a quantidade de check-ins feitos.

### RFs (Requisitos funcionais)
- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se autenticar;
- [X] Deve ser possivel obter o perfil de um usuário logado;
- [X] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possivel o usuário obter seu histórico de chek-ins;
- [X] Deve ser possivel o usuário buscar academias próximas (até 10km);
- [X] Deve ser possivel o usuário buscar academias pelo nome;
- [X] Deve ser possivel o usuário realizar check-in em uma academia;
- [X] Deve ser possivel validar o check-in de um usuário;
- [X] Deve ser possivel cadastrar uma academia;

### RNs (Regras de negócio)
- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuáro não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)
- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisar estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);



# Autores

| [<img src="https://avatars.githubusercontent.com/u/105612744?v=4" width=115><br><sub>Guto Gomes Macedo</sub>](https://github.com/guto2xx) 
| :---: |