export namespace UserType {
  export interface UserDetailType {
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
  }

  export interface UsersListType {
    user_list: [];
  }
}
