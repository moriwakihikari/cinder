package entities

import "database/sql"

type GetMyPageDetail struct {
	ID           int            `json:"id"`
	Name         string         `json:"name"`
	NickName     string         `json:"nickname"`
	Image        string         `json:"image"`
	Introduction sql.NullString `json:"introduction"`
	Mail         string         `json:"mail"`
	Sex          int            `json:"sex"`
	Age          int            `json:"age"`
	BirthplaceID int            `json:"birthplace_id"`
	Birthplace   string         `json:"birthplace"`
	ResidenceID  int            `json:"residence_id"`
	Residence    string         `json:"residence"`
}

type PostMyPageEdit struct {
	ID           int            `json:"id" binding:"required"`
	Name         string         `json:"name"`
	NickName     string         `json:"nickname"`
	Image        string         `json:"image"`
	Introduction sql.NullString `json:"introduction"`
	Mail         string         `json:"mail"`
	Age          int            `json:"age"`
	BirthplaceID int            `json:"birthplace_id"`
	ResidenceID  int            `json:"residence_id"`
}
