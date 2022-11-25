package main

import (
	//cinderはgo.modファイルのpackage名
	server "cinder/controller"
)

func main() {
	//5行目で読み込んだcontrollerの中のpackage名serverのGetRouter関数を呼び出している。
	router := server.GetRouter()
	router.Run()
}