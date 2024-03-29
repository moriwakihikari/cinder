package model

import (
	"cinder/entities"
	"database/sql"
	"log"
)

type Good struct {
	ID           int            `json:"id" binding:"required"`
	Name         string         `json:"name"`
	NickName     string         `json:"nickname"`
	Image        string         `json:"image"`
	Introduction sql.NullString `json:"introduction"`
	Mail         string         `json:"mail"`
	Password     string
	Sex          int    `json:"sex"`
	Age          int    `json:"age"`
	Birthplace   string `json:"birthplace"`
	Residence    string `json:"residence"`
}

func GetGoods() (users []entities.User, err error) {
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
		var user entities.User
		err = rows.Scan(
			// &user.ID,
			&user.Name,
			&user.NickName,
		// &user.Introduction,
		// &user.Mail,
		// &user.Sex,
		// &user.Age,
		// &user.Birthplace,
		// &user.Residence,
		)
		if err != nil {
			log.Fatalln(err)
		}
		users = append(users, user)
	}
	rows.Close()

	return users, err
}

/**
* いいねを送る処理
*
* @param entities.PostGood いいねに必要な構造体
* @return array ログインユーザーの情報, err
 */
func PostGood(c entities.Good) {
	cmd := `insert into goods (from_user_id, to_user_id) values (?, ?)`
	stmt, err := Db.Prepare(cmd)
	if err != nil {
		log.Fatal(err)
		return
	}
	_, err = stmt.Exec(c.ToUserId, c.FromUserId)
	if err != nil {
		log.Fatal(err)
		return
	}
}

/**
* 既にいいねを送ったユーザーか確認する処理
* @param entities.PostGood いいねに必要な構造体
* @return array ログインユーザーの情報, err
 */
func AlreadyGoodCheck(from_user_id int, to_user_id int) (bool, error) {
	cmd := `SELECT from_user_id, to_user_id FROM goods WHERE from_user_id = ? AND to_user_id = ?`
	var good entities.Good
	err := Db.QueryRow(cmd, from_user_id, to_user_id).Scan(
		&good.ToUserId,
		&good.FromUserId,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}
	isAlreadyGoodCheck := true
	return isAlreadyGoodCheck, nil
}
