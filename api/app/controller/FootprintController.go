package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFootprintAll(c*gin.Context) {
	data := gin.H{"message": "足跡一覧"}
	c.JSON(http.StatusOK, data)
}