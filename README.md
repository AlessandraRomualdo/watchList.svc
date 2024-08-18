
# WatchList

O repositório WhatchList é uma API em Nest.js e typeOrm, para gerenciar uma aplicação de listas de filmes e séries.



## Funcionalidades

- Adicioner e remover filmes e series
- Criar listas e remover
- Criar cadastro
- Gerenciamento de usuarios e rotas


## Estrutura do banco de dados

![DB]()

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_HOST`=127.0.0.1

`DB_PORT`=5432

`DB_USERNAME`=root

`DB_PASSWORD`=root

`DB_NAME`=db_watchList

`DB_ADMIN_EMAIL`=admin@root.com

`SALT`=$2b$10$pRHpayh70V4beOnhVqtWQ.

`JWT_SECRET`=2158346296
## Rodando localmente

| Para rodar o projeto você precisa ter o Dock instalado na sua máquina

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

