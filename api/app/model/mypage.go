package model

import (
	"database/sql"
	"fmt"
	"log"
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

type Prefectures struct {
	ID           int     `json:"id"`
	Name         string  `json:"name"`
}


func GetMyPage(mail string) (mypage MyPage, err error) {
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
	return mypage, err
}

func GetMypagePrefectures(mail string) (prefectures []Prefectures, err error) {

	prefecture_cmd := `select id, name from prefectures`
	rows, err := Db.Query(prefecture_cmd)
	if err != nil {
		log.Fatalln(err)
	}

	for rows.Next() {
		var prefecture Prefectures
		err = rows.Scan(
			&prefecture.ID,
			&prefecture.Name,
			)
		if err != nil {
			log.Fatalln(err)
		}
		prefectures = append(prefectures, prefecture)
	}
	rows.Close()

	fmt.Println(prefectures, err)
	return prefectures, err
}