FROM golang:1.19.3-alpine3.16
RUN apk update && apk add git
RUN go install github.com/cosmtrek/air@v1.29.0
RUN mkdir /go/src/app
WORKDIR /go/src/app
# CMD ["go","run","main.go"]
ADD ./app /go/src/app

RUN go get -u github.com/go-sql-driver/mysql
RUN go get -u github.com/gin-gonic/gin

CMD ["air", "-c", ".air.toml"]