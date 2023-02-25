package model

import "database/sql"

type User struct {
	ID           int     `json:"id" binding:"required"`
	Name         string  `json:"name"`
	NickName     string  `json:"nickname"`
	Image        string  `json:"image"`
	Introduction sql.NullString  `json:"introduction"`
	Mail         string  `json:"mail"`
	Password     string 
	Sex          int     `json:"sex"`
	Age          int     `json:"age"`
	Birthplace   string  `json:"birthplace"`
	Residence    string  `json:"residence"`
}