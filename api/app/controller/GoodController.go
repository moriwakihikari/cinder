package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GoodUser(c *gin.Context) {
	data := gin.H{"message": "いいねしてくれたユーザー一覧"}
	c.JSON(http.StatusOK, data)
}