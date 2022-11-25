package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"net/http"
)

func GetRouter() *gin.Engine {
	//ginでは最初にgin.Default()関数で*Engineというインスタンスを生成します。
	//*EngineにはEndpoint、Middleware、その他Webページ用のTemplateやそこで使われるfuncMapなど様々なものを登録しておくことができます。

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/login", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "login画面",
		})
	})
	// r.POST("/login", controller.CreatePost)

	r.GET("/register", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "新規登録画面",
		})
	})
	// r.POST("/register", controller.CreatePost)

	r.GET("/users", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "ユーザー一覧",
		})
	})

	r.GET("/user/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "ユーザー詳細画面",
		})
	})

	r.GET("/good", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "いいねもらった一覧",
		})
	})
	// r.POST("/good", controller.CreatePost)

	r.GET("/messages", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "メッセージ一覧画面",
		})
	})

	r.GET("/message/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "メッセージ詳細画面",
		})
	})
	// r.POST("/message/:id", controller.CreatePost)

	r.GET("/my_page", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "my_page画面",
		})
	})

	r.GET("/my_page/edit", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "my_page編集画面",
		})
	})
	// r.POST("/my_page/edit", controller.CreatePost)

	r.GET("/footprints", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "足跡画面",
		})
	})



	// r.GET("/show/:id", controller.ShowOnePost)
	// r.GET("/create", controller.ShowCreatePost)
	// r.POST("/create", controller.CreatePost)
	// r.GET("/edit/:id", controller.ShowEditPost)
	// r.POST("/edit", controller.EditPost)
	// r.GET("/delete/:id", controller.ShowCheckDeletePost)
	// r.POST("/delete", controller.DeletePost)
	// r.GET("/ping", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": "pong",
	// 	})
	// })

	return r
}