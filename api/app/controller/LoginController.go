package controller

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

type LoginStructure struct {
	Mail string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
  }

// User demo
type User struct {
	ID  string
	Email string
}

var identityKey = "id"
  
// func helloHandler(c *gin.Context) {
// 	claims := jwt.ExtractClaims(c)
// 	user, _ := c.Get(identityKey)
// 	fmt.Println(user)
// 	c.JSON(200, gin.H{
// 		"userID":   claims[identityKey],
// 		"mail": user.(*User).Name,
// 		"text":     "Hello World.",
// 	})
// }

func init() {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	db_name := os.Getenv("MYSQL_DATABASE")
	var path string = fmt.Sprintf("%s:%s@tcp(db:3306)/%s?charset=utf8&parseTime=true", user, pw, db_name)
	var err error
	if Db, err = sql.Open("mysql", path); err != nil {
		log.Fatal("Db open error:", err.Error())
	}
	// checkConnect(100)
	fmt.Println("db connected!!")
}


func Login(c *gin.Context) {
	var data LoginStructure
	c.BindJSON(&data)
	fmt.Println(data.Mail)
	c.JSON(200, gin.H{
		"message": data.Mail,
	})
}

func Register(c *gin.Context) {
	var data LoginStructure
	c.BindJSON(&data)
	fmt.Println(data.Mail)
	c.JSON(200, gin.H{
		"message": data.Mail,
	})
}
