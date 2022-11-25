package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MessageStructure struct {
	Name string
}

func GetMessageAll(c* gin.Context) {
	data := gin.H{"message": "メッセージ一覧"}
	c.JSON(http.StatusOK, data)
}

func GetMessageOne(c* gin.Context) {
	data := gin.H{"message": "メッセージ詳細"}
	c.JSON(http.StatusOK, data)
}

func CreateMessagePost(c* gin.Context) {
	var data MessageStructure
	c.BindJSON(&data)
	fmt.Println(data.Name)
	c.JSON(200, gin.H{
		"message": data.Name,
	})
}
