 interface User{
   ID:string;
    createdAt:string;
    userName:string;
    email:string;
    phoneNumber:string;
    role:string;
}
export  interface UserWithToken
{
    user:User;
    token:string;
}