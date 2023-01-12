package controller

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var Db *sql.DB


func GetRouter() *gin.Engine {
	//ginでは最初にgin.Default()関数で*Engineというインスタンスを生成します。
	//*EngineにはEndpoint、Middleware、その他Webページ用のTemplateやそこで使われるfuncMapなど様々なものを登録しておくことができます。

	r := gin.Default()
  // r.Use(cors.Default())
	//ここからCorsの設定
  r.Use(cors.New(cors.Config{
    // アクセスを許可したいアクセス元
    AllowOrigins: []string{
        // "http://next:3000",
        "http://localhost:3000",
    },
    // アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
    AllowMethods: []string{
        "POST",
        "GET",
        "OPTIONS",
    },
    // 許可したいHTTPリクエストヘッダ
    AllowHeaders: []string{
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Headers",
        "Content-Type",
        "Content-Length",
        "Accept-Encoding",
        "Authorization",
    },
    // cookieなどの情報を必要とするかどうか
    AllowCredentials: true,
    // preflightリクエストの結果をキャッシュする時間
    MaxAge: 24 * time.Hour,
  }))



  // the jwt middleware
  authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
    Realm:       "test zone",
    Key:         []byte("secret key"),
    Timeout:     time.Hour,
    MaxRefresh:  time.Hour,
    IdentityKey: identityKey,
    PayloadFunc: func(data interface{}) jwt.MapClaims {
      if v, ok := data.(*User); ok {
        return jwt.MapClaims{
          identityKey: v.Name,
        }
      }
      return jwt.MapClaims{}
    },
    IdentityHandler: func(c *gin.Context) interface{} {
      claims := jwt.ExtractClaims(c)
      return &User{
        Name: claims[identityKey].(string),
      }
    },
    Authenticator: func(c *gin.Context) (interface{}, error) {
      var loginVals LoginStructure
      if err := c.ShouldBind(&loginVals); err != nil {
        return "", jwt.ErrMissingLoginValues
      }
    userID := loginVals.Mail
    password := loginVals.Password
	fmt.Println(userID)
	fmt.Println(password)

	cmd := `select id, name from users where mail = ? and password = ?`
	
	var user User

	err := Db.QueryRow(cmd, userID, password).Scan(
	&user.ID,
	&user.Name,
	)
	fmt.Println(user)
	fmt.Println(err)

	// fmt.Println(err)
	if err == nil {
		return &User{
			Name:  userID,
			ID:  userID,
		  },
		  nil
	}

      return nil, jwt.ErrFailedAuthentication
    },
    Authorizator: func(data interface{}, c *gin.Context) bool {
      if v, ok := data.(*User); ok && v.Name == "" {
        return true
      }

      return false
    },
    Unauthorized: func(c *gin.Context, code int, message string) {
      c.JSON(code, gin.H{
        "code":    code,
        "message": message,
      })
    },
    // TokenLookup is a string in the form of "<source>:<name>" that is used
    // to extract token from the request.
    // Optional. Default value "header:Authorization".
    // Possible values:
    // - "header:<name>"
    // - "query:<name>"
    // - "cookie:<name>"
    // - "param:<name>"
    TokenLookup: "header: Authorization, query: token, cookie: jwt",
    // TokenLookup: "query:token",
    // TokenLookup: "cookie:token",

    // TokenHeadName is a string in the header. Default value is "Bearer"
    TokenHeadName: "Bearer",

    // TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
    TimeFunc: time.Now,
  })

  if err != nil {
    log.Fatal("JWT Error:" + err.Error())
  }

  // When you use jwt.New(), the function is already automatically called for checking,
  // which means you don't need to call it again.
  errInit := authMiddleware.MiddlewareInit()

  if errInit != nil {
    log.Fatal("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
  }

  r.POST("/login", authMiddleware.LoginHandler)

  r.NoRoute(authMiddleware.MiddlewareFunc(), func(c *gin.Context) {
    claims := jwt.ExtractClaims(c)
    log.Printf("NoRoute claims: %#v\n", claims)
    c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
  })

  auth := r.Group("/auth")
  // Refresh time can be longer than token timeout
  auth.GET("/refresh_token", authMiddleware.RefreshHandler)
  auth.Use(authMiddleware.MiddlewareFunc())
  {
    auth.GET("/hello", helloHandler)
  }

	// r.POST("/login", Login)
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