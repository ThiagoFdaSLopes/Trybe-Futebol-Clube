#  Trybe Futebol Clube

O TFC é um site informativo sobre partidas e classificações de futebol! soccer

No time de desenvolvimento do TFC, o meu squad ficou responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, foi desenvolvido um back-end dockerizado utilizando modelagem de dados através do Sequelize. No desenvolvimento foi respeitado regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O seu back-end possui regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

## Estrutura do projeto

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

# Rodando o Projeto(Docker)
Acesse a pasta ```app``` Rode o serviço node com o comando ```npm run compose:up```.

Esse serviço ira inicializar os container ```app_backend```, ```app_frontend```, e container do banco de dados mysql.
Ao subir os 3 containers as aplicacoes ja estaram rodando em suas respectivas portas.

Para consumir o frontend acesse em seu navegador: ```http://localhost:3000```

:warning: Atenção :warning: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

:warning: Atenção :warning: O git dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

:warning: Atenção :warning: Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

:warning: Atenção :warning: Caso você esteja usando macOS e ao executar o docker-compose up -d se depare com o seguinte erro:

```bash
The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services.db: 'platform'
Unsupported config option for services.node: 'platform'
```
Foram encontradas 2 possíveis soluções para este problema:
* Você pode adicionar manualmente a option platform: linux/amd64 no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos.
* Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha export DOCKER_DEFAULT_PLATFORM=linux/amd64, essa é uma solução global. As soluções foram com base nesta fonte.

## Stacks utilizada
Front-End: React, Axios.
Back-end: Javascript, Typescript, Node.js, POO, SOLID, Docker, Sequelize,
Testes: Mocha, chai, sinon, jest.

### Em Construção



