package model

import (
	"cinder/entities"
	"fmt"
	"log"
)

/**
* 異性の全ユーザーを返却する
*
* @param string ログインユーザーのメールアドレス
* @return array 異性の全ユーザー
 */
func GetUsers(mail string) (users []entities.User, err error) {
	// ログインユーザーの性別を取得
	sex := `select u.sex from users as u where u.mail = ?`
	opposite_sex := 0
	err = Db.QueryRow(sex, mail).Scan(&opposite_sex)
	if err != nil {
		log.Fatalln(err)
	}

	// ログインユーザーと性別が違う全ユーザーを取得
	cmd := `select u.id, u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, birthplace.name, residence.name 
			from users as u
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id
			where u.sex != ?`
	rows, err := Db.Query(cmd, opposite_sex)
	if err != nil {
		log.Fatalln(err)
	}
	for rows.Next() {
		var user entities.User
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

/*
* 特定のユーザーを返却する（ユーザー詳細画面）
*
* @param int ログインユーザーのid
* @return array 特定のユーザー
*/
func GetUser(id int) (user entities.User, err error) {
	cmd := `select u.id, u.name, u.nickname, u.introduction, u.mail, u.sex, u.age, birthplace.name, residence.name 
			from users as u 
			join prefectures as birthplace on u.birthplace_id = birthplace.id 
			join prefectures as residence on u.residence_id = residence.id 
			where u.id = ?`

	user = entities.User{}
	err = Db.QueryRow(cmd, id).Scan(
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
	fmt.Println(user, id, err)
	return user, err
}