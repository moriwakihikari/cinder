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
	BirthplaceID int  	 `json:"birthplace_id"`
	Birthplace   string  `json:"birthplace"`
	ResidenceID  int  	 `json:"residence_id"`
	Residence    string  `json:"residence"`
}

func GetMyPage(mail string) (mypage MyPage, err error) {
	fmt.Println(mail)

	cmd := `select u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, u.birthplace_id, birthplace.name, u.residence_id, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id 
			where u.mail = ?`

	mypage = MyPage{}
	err = Db.QueryRow(cmd, mail).Scan(
		&mypage.Name,
		&mypage.NickName,
		&mypage.Introduction,
		&mypage.Mail,
		&mypage.Sex,
		&mypage.Age,
		&mypage.BirthplaceID,
		&mypage.Birthplace,
		&mypage.ResidenceID,
		&mypage.Residence,
	)
	fmt.Println(mypage, mail, err)
	return mypage, err
}