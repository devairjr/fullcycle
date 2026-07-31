FROM golang:1.26.5-alpine as builder
WORKDIR /usr/src/app

COPY . .
RUN go mod download && go mod verify && go build -ldflags="-s -w" -o /usr/local/bin/app ./...

FROM scratch
COPY --from=builder /usr/local/bin/app /usr/local/bin/app

CMD ["/usr/local/bin/app"]