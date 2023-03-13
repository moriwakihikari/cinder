package model

import (
	"database/sql"
	"fmt"
	"log"
)

type MyPage struct {
	ID           int     `json:"id"`
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

/**
* ログインユーザーの情報を返却する
*
* @param string ログインユーザーのメールアドレス
* @return array ログインユーザーの情報, err
*/
func GetMyPage(mail string) (mypage MyPage, err error) {
	cmd := `select u.id, u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, u.birthplace_id, birthplace.name, u.residence_id, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id 
			where u.mail = ?`

	mypage = MyPage{}
	err = Db.QueryRow(cmd, mail).Scan(
		&mypage.ID,
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
	fmt.Println(mypage)

	return mypage, err
}

/**
* 都道府県マスタを返却する
* 
* @return array 都道府県マスタ, err
*/
func GetMypagePrefectures() (prefectures []Prefectures, err error) {
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