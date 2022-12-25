package model

import (
	"fmt"
	"log"
)

type User struct {
	ID           int     `json:"id" binding:"required"`
	Name         string  `json:"name"`
	NickName     string  `json:"nickname"`
	Image        string  `json:"image"`
	Introduction string  `json:"introduction"`
	Mail         string  `json:"mail"`
	Password     string 
	Sex          int     `json:"sex"`
	Birthplace   string  `json:"birthplace"`
	Residence    string  `json:"residence"`

}

func GetUsers() (users []User, err error) {
	// cmd := `select id, name, nickname, mail, sex from users`
	cmd := `select u.id, u.name, u.nickname, u.mail, u.sex, birthplace.name, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id`

	rows, err := Db.Query(cmd)
	if err != nil {
		log.Fatalln(err)
	}
	for rows.Next() {
		var user User
		err = rows.Scan(
			&user.ID,
			&user.Name,
			&user.NickName,
			&user.Mail,
			&user.Sex,
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

func GetUser(id int) (user User, err error) {
	cmd := `select u.id, u.name, u.nickname, u.mail, u.sex, birthplace.name, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id 
			where u.id = ?`

	user = User{}
	err = Db.QueryRow(cmd, id).Scan(
		&user.ID,
		&user.Name,
		&user.NickName,
		&user.Mail,
		&user.Sex,
		&user.Birthplace,
		&user.Residence,
	)
	fmt.Println(user, id, err)
	return user, err
}