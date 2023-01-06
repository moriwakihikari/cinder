package controller

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

type LoginStructure struct {
	Name string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
  }
  
  var identityKey = "id"
  
  func helloHandler(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	c.JSON(200, gin.H{
	  "userID":   claims[identityKey],
	  "userName": user.(*User).Name,
	  "text":     "Hello World.",
	})
  }
  
  // User demo
  type User struct {
	ID  string
	Name string
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
