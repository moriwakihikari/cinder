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

/**
* ログインユーザーの情報を返す
*/
func GetMypage(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	user, _ := c.Get(identityKey)
	data, _  := model.GetMyPage(user.(*User).Email)
	fmt.Println(data)
	c.JSON(http.StatusOK, data)
}

/**
* 都道府県マスタを返す
*/
func GetMypagePrefectures(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	data, _  := model.GetMypagePrefectures()
	fmt.Println(data)
	c.JSON(http.StatusOK, data)
}

/**
* ログインユーザーを更新する
*/
func PostMypageEdit(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	var data MessageStructure
	c.BindJSON(&data)
	fmt.Println(data.Name)
	c.JSON(200, gin.H{
		"message": data.Name,
	})
}
