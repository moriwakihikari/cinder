package model

import (
	"cinder/entities"
	"fmt"
	"log"
)

/**
* ログインユーザーの情報を返却する
*
* @param string ログインユーザーのメールアドレス
* @return array ログインユーザーの情報, err
 */
func GetMyPage(mail string) (mypage entities.GetMyPageDetail, err error) {
	cmd := `select u.id, u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, u.birthplace_id, birthplace.name, u.residence_id, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id 
			where u.mail = ?`

	mypage = entities.GetMyPageDetail{}
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
func GetMyPagePrefectures() (prefectures []entities.Prefectures, err error) {
	prefecture_cmd := `select id, name from prefectures`
	rows, err := Db.Query(prefecture_cmd)
	if err != nil {
		log.Fatalln(err)
	}

	for rows.Next() {
		var prefecture entities.Prefectures
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

func UpdateMyPage(c entities.PostMyPageEdit) (id int ,err error) {
	cmd := `UPDATE users set name = ?, nickname = ?, image = ?, introduction = ?, mail = ?, age = ?, birthplace_id = ?, residence_id = ?
			WHERE id = ?`
	upd, err := Db.Prepare(cmd)
	if err != nil {
        log.Fatal(err)
    }
    res, err := upd.Exec(c.Name, c.NickName, c.Image, c.Introduction.String, c.Mail, c.Age, c.BirthplaceID, c.ResidenceID, c.ID)
	if err != nil {
        panic(err.Error())
    }
	affected, err := res.RowsAffected()
    if err != nil {
        panic(err.Error())
    }
	fmt.Printf("%d rows affected\n", affected)
	return c.ID, err
}