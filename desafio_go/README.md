# Desafios Docker
    1: Gerar uma imagem docker que ao executar apresente o texto "Full Cycle Rocks!!", e ela deve ter menos de 2MB. Deve-se subir o repositório no github e a imagem publicada no Docker Hub.

    Estrutura do Projeto
    ├── Dockerfile       # Configuração da imagem
    ├── main.go          # Código fonte da aplicação em Go
    ├── go.mod           # Gerenciador de dependências (se necessário)
    └── README.md        # Instruções e link da imagem

    Link do projeto no github: https://github.com/devairjr/fullcycle
    
    Para executar a aplicação a partir do projeto github, execute os comandos a seguir em um terminal na pasta do projeto:
        1: docker build -t desafio_go .
        2: docker run --rm desafio_go


    Para executar a aplicação baixando a imagem direto do Docker Hub, executar os comandos a seguir em um terminal/prompt
        1: docker pull devairjr/desafio_go:latest
        2: docker run --rm devairjr/desafio_go:latest
        3 Opcional para mapear a porta da aplicação: docker run --rm -p 8080:8080 devairjr/desafio_go:latest

    Link do projeto no Docker Hub: https://hub.docker.com/r/devairjr/desafio_go