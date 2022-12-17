package controller

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func GetRouter() *gin.Engine {
	//ginでは最初にgin.Default()関数で*Engineというインスタンスを生成します。
	//*EngineにはEndpoint、Middleware、その他Webページ用のTemplateやそこで使われるfuncMapなど様々なものを登録しておくことができます。

	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/login", Login)
	r.POST("/register", Register)
	r.GET("/users", GetUserAll)
	r.GET("/user/:id", GetUserOne)
	r.GET("/good", GoodUser)
	// r.GET("/messages", GetMessageAll)
	r.POST("/messages", GetMessageAll)
	r.GET("/messages/:id", GetMessageOne)
	r.POST("/message/:id", CreateMessagePost)
	r.GET("/my_page", GetMypage)
	r.GET("/my_page/edit", GetMypageEdit)
	r.POST("/my_page/edit", PostMypageEdit)
	r.POST("/footprints", PostMypageEdit)
	return r
}