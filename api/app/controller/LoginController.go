package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type LoginStructure struct {
	Name string
}

func Login(c *gin.Context) {
	var data LoginStructure
	c.BindJSON(&data)
	fmt.Println(data.Name)
	c.JSON(200, gin.H{
		"message": data.Name,
	})
}

func Register(c *gin.Context) {
	var data LoginStructure
	c.BindJSON(&data)
	fmt.Println(data.Name)
	c.JSON(200, gin.H{
		"message": data.Name,
	})
}
