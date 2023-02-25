package controller

import (
	"cinder/model"
	"fmt"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

type MypageStructure struct {
	Name string
}

func GetMypage(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	user, _ := c.Get(identityKey)
	data, _  := model.GetMyPage(user.(*User).Email)
	fmt.Println(http.StatusOK, data)
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
