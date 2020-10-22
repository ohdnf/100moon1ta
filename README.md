# 100moon1ta

자세한건 swagger/

localhost:8000/

### Login

```
POST api/rest-auth/login/

{
    email: string,
    password: string
}
```

### Logout

```
POST api/rest-auth/logout/
```

- jwt 인증방식이기 때문에 로그아웃은 별 효과가 없음, 만료시간을 짧게 하거나 블랙리스트를 사용

### Password

```
Password change

POST api/rest-auth/password/change/

header = { Authorization : JWT {JWT token} }
{
    new_password1: string,
    new_password2: string
}
```

```
Password reset

POST api/rest-auth/password/reset/

{
    email: string,
}
```

### Signup

```
POST api/rest-auth/signup/

{
    username: string,
    email: string,
    password1: string,
    password2: string
}
```

### Social

```
POST api/rest-auth/social/

{
    access_token: string
}
```

- github의 경우 access_token만 있으면 됨

### User

```
User 정보

GET api/rest-auth/user/
header = { Authorization : JWT {JWT token} }
```

- token에 해당하는 유저 정보 리턴

```
User 정보 수정

PUT pi/rest-auth/user/
header = { Authorization : JWT {JWT token} }
{
    id: int,
    email: string,
    username: string,
    profile_image,
}
```
