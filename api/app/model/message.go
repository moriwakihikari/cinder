package model

type Message struct {
	ID       int    `json:"id" binding:"required"`
	UserId   int    `json:"user_id"`
	RoomId   int    `json:"room_id"`
	Body     string `json:"body"`
}

func GetMessages(id int) (message Message, err error) {
	cmd := `select id, user_id, room_id, body from messages where id = ?`
	message = Message{}

	err = Db.QueryRow(cmd, 1).Scan(
		&message.ID,
		&message.UserId,
		&message.RoomId,
		&message.Body,
	)
	return message, err
} 