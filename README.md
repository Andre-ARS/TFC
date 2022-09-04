# Projeto Trybe Futebol Clube (TFC)

# Contexto

Este projeto trata-se da criação de uma API de um CRUD de um campeonato de futebol, em que o usuário é capaz de criar uma nova partida, editar uma partida, finalizar uma partida e ver a classificação das equipes com base nos resultados das partidas. Foi utilizado o Sequelizer com TypeScript para manipular as informações, criar entidades e popula-las, a partir dos endpoints da API. Feita com base na arquitetura MSC (models, services, controllers), utilizando os principios SOLID e POO. Foi utilizado também o Swagger Ui para criar uma documentação. Esse projeto foi feito no módulo de back-end do curso da Trybe, em um ambiente node, nele o front-end já estava pronto, minha tarefa foi fazer a criação do back-end e integração com o front, além de implementar testes de integração.

## Tecnologias usadas

Back-end:

> Desenvolvido usando: Docker, TypeScript, Node.js, Express.js, MySQL, Sequelizer, Swagger.io;

Testes:

> Implementados com: mocha, chai e sinon

## Testando Localmente

> Clone o Repositório

```bash
git clone git@github.com:Andre-ARS/TFC.git
```

> Dentro do diretório do projeto, instale as dependencias

```bash
npm install
```

> Na raiz do projeto suba as imagens do docker

```bash
docker-compose up -d
```

> Depois rode o container

```bash
docker exec -it app_backend sh 
```

> Popule o Banco

```bash
npm run db:reset
```

> Abra a aplicação no seu navegador em [localhost:3000](http://localhost:3000)

Url base da api rodando no Heroku [https://tfc-ars-api.herokuapp.com/](https://tfc-ars-api.herokuapp.com/)

Teste a aplicação completa com deploy no Vercel: [TFC](http://tfc-ars.vercel.app)

Visite a documentação no swagger [aqui](https://app.swaggerhub.com/apis/ANDRE360ARS/trybe-futebol_clube_tfc/1.0.0)
