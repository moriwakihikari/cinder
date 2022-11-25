package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MypageStructure struct {
	Name string
}

func GetMypage(c *gin.Context) {
	data := gin.H{"message": "マイページ"}
	c.JSON(http.StatusOK, data)
}

func GetMypageEdit(c *gin.Context) {
	data := gin.H{"message": "マイページ編集"}
	c.JSON(http.StatusOK, data)
}

func PostMypageEdit(c *gin.Context) {
	var data MessageStructure
	c.BindJSON(&data)
	fmt.Println(data.Name)
	c.JSON(200, gin.H{
		"message": data.Name,
	})
}
