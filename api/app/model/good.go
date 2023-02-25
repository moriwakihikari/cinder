package model

import (
	"cinder/domain/model"
	"database/sql"
	"log"
)

type Good struct {
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

func GetGoods() (users []model.User, err error) {
	// cmd := `select id, name, nickname, mail, sex from users`
	cmd := `select u.id, u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, birthplace.name, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id`

	rows, err := Db.Query(cmd)
	if err != nil {
		log.Fatalln(err)
	}
	for rows.Next() {
		var user model.User
		err = rows.Scan(
			&user.ID,
			&user.Name,
			&user.NickName,
			&user.Introduction,
			&user.Mail,
			&user.Sex,
			&user.Age,
			&user.Birthplace,
			&user.Residence,
			)
		if err != nil {
			log.Fatalln(err)
		}
		users = append(users, user)
	}
	rows.Close()

	return users, err
}

