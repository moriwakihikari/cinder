package controller

import (
	"cinder/model"
	"fmt"
	"net/http"
	"strconv"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

/**
* ログインユーザーと異性の他ユーザーを返却する
 */
func GetUserAll(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	user, _ := c.Get(identityKey)
	data, _  := model.GetUsers(user.(*User).Email)
	fmt.Println(http.StatusOK, data)
	c.JSON(http.StatusOK, data)
}

/**
* ユーザー詳細
*/
func GetUserOne(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	user, _ := c.Get(identityKey)
	fmt.Println(user)
	id, _ := strconv.Atoi(c.Param("id"))
	data, _ := model.GetUser(id)
	c.JSON(http.StatusOK, data)
}
