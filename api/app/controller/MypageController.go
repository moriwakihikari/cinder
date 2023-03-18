package controller

import (
	"cinder/entities"
	"cinder/model"

	"fmt"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

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
	data, _  := model.GetMyPagePrefectures()
	fmt.Println(data)
	c.JSON(http.StatusOK, data)
}

/**
* ログインユーザーを更新する
*/
func PostMypageEdit(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	var my_page entities.PostMyPageEdit
	err := c.ShouldBindJSON(&my_page)
	if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	data, _ := model.UpdateMyPage(my_page)
	fmt.Println(my_page)
	c.JSON(http.StatusOK, data)
}
