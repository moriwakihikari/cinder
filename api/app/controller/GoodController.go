package controller

import (
	"cinder/entities"
	"cinder/model"
	"fmt"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func PostGood(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	var post_good entities.PostGood
	err := c.ShouldBindJSON(&post_good)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	model.PostGood(post_good)
}
