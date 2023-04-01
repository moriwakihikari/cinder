package controller

import (
	"cinder/entities"
	"cinder/model"
	"fmt"
	"net/http"
	"strconv"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func PostGood(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	var post_good entities.Good
	err := c.ShouldBindJSON(&post_good)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	model.PostGood(post_good)
}

func GetGoodCheck(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	from_user_id, _ := strconv.Atoi(c.Param("from_user_id"))
	to_user_id, _ := strconv.Atoi(c.Param("to_user_id"))
	isAlreadyGoodCheck, err := model.AlreadyGoodCheck(from_user_id, to_user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, isAlreadyGoodCheck)
}
