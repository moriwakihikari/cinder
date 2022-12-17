package main

import (
	//cinderはgo.modファイルのpackage名
	server "cinder/controller"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	//5行目で読み込んだcontrollerの中のpackage名serverのGetRouter関数を呼び出している。
	router := server.GetRouter()
	router.Run()

	// connectOnly()
}

//main.goで接続確認。実際は下記のコードをファイル分けしAPIを叩かれる度に走らせる
// func connectOnly() {
// 	// データベースのハンドルを取得する
// 	user := os.Getenv("MYSQL_USER")
// 	pw := os.Getenv("MYSQL_PASSWORD")
// 	db_name := os.Getenv("MYSQL_DATABASE")
// 	var path string = fmt.Sprintf("%s:%s@tcp(db:3306)/%s?charset=utf8&parseTime=true", user, pw, db_name)
// 	var err error
// 	if Db, err = sql.Open("mysql", path); err != nil {
// 		log.Fatal("Db open error:", err.Error())
// 	}

// 	fmt.Println("db connected!!")
// }