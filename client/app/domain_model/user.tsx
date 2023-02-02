export namespace UserType {
  export type UserDetailType = {
    Introduction: string;
    id: number;
    image: string;
    mail: string;
    name: string;
    nickname: string;
    sex: number;
    age: number;
    birthplace: string;
    residence: string;
  };

  export type UsersListType = {
    user_list: [];
  };
}
