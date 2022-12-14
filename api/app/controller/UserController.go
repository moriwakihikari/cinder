package controller

import (
	"cinder/model"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetUserAll(c *gin.Context) {
	data, _  := model.GetUsers()
	fmt.Println(http.StatusOK, data)
	c.JSON(http.StatusOK, data)
}

func GetUserOne(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data, _ := model.GetUser(id)
	c.JSON(http.StatusOK, data)
}
