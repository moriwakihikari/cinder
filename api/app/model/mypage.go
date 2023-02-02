package model

import (
	"database/sql"
	"fmt"
)

type MyPage struct {
	Name         string  `json:"name"`
	NickName     string  `json:"nickname"`
	Image        string  `json:"image"`
	Introduction sql.NullString  `json:"introduction"`
	Mail         string  `json:"mail"`
	Sex          int     `json:"sex"`
	Age          int     `json:"age"`
	Birthplace   string  `json:"birthplace"`
	Residence    string  `json:"residence"`
}

func GetMyPage(mail string) (user User, err error) {
	fmt.Println(mail)

	cmd := `select u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, birthplace.name, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id 
			where u.mail = ?`

	user = User{}
	err = Db.QueryRow(cmd, mail).Scan(
		&user.Name,
		&user.NickName,
		&user.Introduction,
		&user.Mail,
		&user.Sex,
		&user.Age,
		&user.Birthplace,
		&user.Residence,
	)
	fmt.Println(user, mail, err)
	return user, err
}