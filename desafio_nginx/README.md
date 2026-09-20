# Nginx como Proxy Reverso com Node.js

Aplicacao desenvolvida para o desafio Full Cycle. O Nginx recebe as requisicoes na porta `8080` e encaminha o trafego para uma aplicacao Node.js. A aplicacao Node.js persiste os nomes em um banco MySQL e devolve uma pagina HTML com os registros cadastrados.

## Tecnologias

- Node.js 18
- Express
- MySQL 8
- Nginx
- Docker e Docker Compose

## Funcionamento

O fluxo da requisicao e:

```text
Navegador -> Nginx:8080 -> Node.js:3000 -> MySQL:3306
```

Sempre que a rota `/` e acessada:

1. A tabela `people` e criada automaticamente, caso ainda nao exista.
2. Um novo registro com nome no formato `NAME-<UUID>` e inserido.
3. Todos os nomes cadastrados sao consultados.
4. A aplicacao retorna uma pagina contendo o titulo `Full Cycle Rocks!` e a lista de nomes.

## Pre-requisitos

- Docker Desktop instalado e em execucao.
- Docker Compose disponivel pelo comando `docker compose`.

Nao e necessario executar `npm install` ou criar a tabela manualmente. Essas etapas sao realizadas pelo Docker e pela aplicacao.

## Como executar

A partir desta pasta (`desafio_nginx`), execute:

```bash
docker compose up -d --build
```

Acesse no navegador:

```text
http://localhost:8080
```

Ou teste pelo terminal:

```bash
curl http://localhost:8080
```

## Comandos uteis

Verificar o status dos containers:

```bash
docker compose ps
```

Ver os logs dos servicos:

```bash
docker compose logs -f
```

Parar os containers:

```bash
docker compose down
```

Para remover tambem os dados persistidos do MySQL, utilize somente se desejar reiniciar o banco:

```bash
docker compose down
rm -rf data/mysql/*
```

## Estrutura do projeto

```text
desafio_nginx/
├── docker-compose.yml        # Orquestracao dos containers
├── node/
│   ├── index.js              # Aplicacao Node.js
│   ├── Dockerfile            # Imagem da aplicacao
│   ├── package.json          # Dependencias do projeto
│   └── .dockerignore         # Arquivos ignorados no build
├── nginx/
│   └── nginx.conf            # Configuracao do proxy reverso
├── data/mysql/               # Dados persistidos do MySQL
└── README.md                 # Instrucoes do projeto
```

O volume `./node:/usr/src/app` mapeia o codigo da aplicacao para o container durante o desenvolvimento. O volume adicional de `node_modules` evita que as dependencias instaladas durante o build sejam ocultadas pelo bind mount.
