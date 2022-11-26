package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUserAll(c *gin.Context) {
	data := gin.H{"message": "ユーザー一覧"}
	c.JSON(http.StatusOK, data)
}

func GetUserOne(c *gin.Context) {
	data := gin.H{"message": "ユーザー詳細"}
	c.JSON(http.StatusOK, data)
}
