package entities

type PostGood struct {
	ToUserId   int `json:"to_user_id"`
	FromUserId int `json:"from_user_id"`
}
