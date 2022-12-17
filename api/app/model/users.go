package model

import (
	"log"
)

type User struct {
	ID           int     `json:"id" binding:"required"`
	Name         string  `json:"name"`
	NickName     string  `json:"nickname"`
	Image        string  `json:"image"`
	Introduction string  `json:"Introduction"`
	Mail         string  `json:"mail"`
	Password     string 
	Sex          int     `json:"sex"`
}

func GetUsers() (users []User, err error) {
	cmd := `select id, name, nickname, mail, sex from users`
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
	cmd := `select id, name, nickname, mail, sex from users where id = ?`
	user = User{}

	err = Db.QueryRow(cmd, id).Scan(
		&user.ID,
		&user.Name,
		&user.NickName,
		&user.Mail,
		&user.Sex,
	)
	return user, err
}