package controller

import (
	"cinder/model"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MessageStructure struct {
	Name string
}

func GetMessageAll(c* gin.Context) {
	id, _ := strconv.Atoi(c.PostForm("id"))
	// TODO: request[id]が渡ってこない。
	// modelでid=1を仮で入れている 
	fmt.Println("id:", id)
	data, _ := model.GetMessages(id)
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
