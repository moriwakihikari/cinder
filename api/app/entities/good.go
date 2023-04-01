package entities

type Good struct {
	FromUserId int `json:"from_user_id"`
	ToUserId   int `json:"to_user_id"`
}
