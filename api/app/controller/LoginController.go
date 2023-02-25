package controller

import (
	"cinder/model"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	jwt "github.com/appleboy/gin-jwt/v2"
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

func helloHandler(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println(claims)
	// fmt.Printf("%v\n", c)
	user, _ := c.Get(identityKey)
	data, _  := model.GetMyPage(user.(*User).Email)
	fmt.Println(http.StatusOK, data)
	c.JSON(http.StatusOK, data)
}


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
