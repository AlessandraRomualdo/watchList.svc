
# WatchList

O repositório WatchList é uma API em Nest.js e typeOrm, para gerenciar uma aplicação de listas de filmes e séries utilizando o  banco de dados postgress.
O repositório tem muitos comentarios sobre metodos e uso de métodos e classes em geral, pois é um repositório para estudo.



## Funcionalidades

- Adicionar e remover filmes e series
- Criar listas e remover
- Criar cadastro
- Gerenciamento de usuarios e rotas
- Gerenciamento de Administador
- Login de usuário


## Estrutura do banco de dados

![DB](https://github.com/AlessandraRomualdo/watchList.svc/blob/main/5b32089e-9b59-4706-a65c-5a62c17486c5.png)

## Variáveis de Ambiente

| Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu arquivo .env

`DB_HOST`=127.0.0.1

`DB_PORT`=5432

`DB_USERNAME`=root

`DB_PASSWORD`=root

`DB_NAME`=db_watchList

`DB_ADMIN_EMAIL`=admin@root.com

`SALT`=$2b$10$pRHpayh70V4beOnhVqtWQ.

`JWT_SECRET`=2158346296

## Rodando localmente

| Para rodar o projeto você precisa ter o Docker instalado na sua máquina

Clone o projeto SSH

```bash
  git clone git@github.com:AlessandraRomualdo/watchList.svc.git
```

Entre no diretório do projeto

```bash
  cd watchList
```

Instale as dependências

```bash
  npm i
```

Suba o container

```
    docker-componse up -d
```

Rode as migrations

```
npm rum typeorm migration:run
```

Inicie o servidor

```bash
  npm run start:dev
```

## Logar no pgadmin

Voce pode usar os dados do arquivo .env
Acesse http://localhost:8081/ para logar no pgadmin ou se prevefir use outro cliente de banco de dados 

![DB](https://github.com/AlessandraRomualdo/watchList.svc/blob/main/logar-pgadmin.gif?raw=true)

## Documentação da API

Você pode acompanhar a documentação com o swagger, quando a aplicação estiver executando em:
http://localhost:3001/api#/

## Usuário de Administrador

`email:`  admin@email.com

`senha:`  Abc123*