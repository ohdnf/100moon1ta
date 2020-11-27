# 100moon1ta

> 개발자를 위한 타자 연습 서비스, **백문이불여일타**입니다.



## 목차

- [개요](#개요)
- [기능](#기능)
- [유사 서비스](#유사-서비스)
- [향후 전망](#향후-전망)
- [기술 스택](#기술-스택)
- [기술 설명](#기술-설명)
  - [ERD](#erd)
  - [디렉토리 구조도](#디렉토리-구조도)
  - [아키텍처](#아키텍처)
  - [기타](#기타)
- [테스트 방법](#테스트-방법)



## 개요

> 백문이 불여일견이라고 한다. 백 번 듣는 것이 한 번 보는 것만 못하다는 뜻이다. 개발 또한 마찬가지다. 사람의 뇌는 힘든 상황에서의 기억을 쉽게 떠올린다. 개발자의 덕목인 클린 코드, 알고리즘을 위한 ADT 그리고 다양한 CS 지식을 직접 손으로 따라치면서 향유하는 문화를 만들고자 서비스를 기획하게 되었다.



## 기능

> [100moon1ta.com](http://100moon1ta.com)

<img src="/assets/screenshots/landing_page.png" alt="landing page" style="zoom:50%;" />

<hr>

### 로그인 & 회원가입

> 소셜 로그인(Github) 제공

<img src="/assets/screenshots/login.png" alt="login page" style="zoom:50%;" />

<hr>

<img src="/assets/screenshots/signup.png" alt="signup page" style="zoom:50%;" />

<hr>

### 프로필

> 프로필 이미지는 랜덤으로 제공

<img src="/assets/screenshots/profile_records.png" alt="record page" style="zoom:50%;" />

<hr>

<img src="/assets/screenshots/profile_records.png" alt="bookmark page" style="zoom:50%;" />

<hr>

### 연습할 글 목록

> Pagination, Bookmark 기능 제공

<img src="/assets/screenshots/game_lists.png" alt="game lists page" style="zoom:50%;" />

<hr>

### 게임 화면

> 오타 처리

<img src="/assets/screenshots/typing_01.png" alt="typing page" style="zoom:50%;" />

<hr>

<img src="/assets/screenshots/typing_02.png" alt="shows typo" style="zoom:50%;" />

<hr>

### 결과 표시

> 점수 산정
> 결과 제출 시 틀렸던 부분만 반영
>
> 히트맵
> 게임 진행 동안 누적된 모든 오타 수를 반영

<img src="/assets/screenshots/result.png" alt="Landing page" style="zoom:50%;" />

<hr>

### 프로필 업데이트

<img src="/assets/screenshots/record_saved.png" alt="record saved" style="zoom:50%;" />

<hr>



## 유사 서비스

### typing.io

- http://typing.io/

### SpeedCoder

- http://www.speedcoder.net/



## 향후 전망

> 보완할 점 및 추가 구현할 사항

- 게임 검색 및 필터 기능
- 로드맵 제시 및 사용자 정보 기반 코드 추천
- Docker network로 호스트 포트 개방 없이 컨테이너 간 연결
- Caching data 업데이트



## 기술 스택

<img src="/assets/100moon1ta_tech_stacks.png" alt="Tech stacks" style="zoom:50%;" />



## 기술 설명

### ERD

<img src="/assets/100moon1ta_erd.png" alt="ER Diagram" style="zoom:50%;" />



### 디렉토리 구조도

```
📁100moon1ta
├─📁backend
│   ├─📁games
│   ├─📁l00moon1ta
│   ├─📁users
│   ├─Dockerfile
│   ├─manage.py
│   └─requirements.py
├─📁frontend
│   ├─📁components
│   ├─📁containers
│   ├─📁lib
│   ├─📁modules
│   ├─📁pages
│   ├─App.js
│   ├─Dockerfile
│   ├─nginx.conf
│   └─packages.json
└─docker-compose.yml
```



### 아키텍처

<img src="/assets/100moon1ta_architecture.png" alt="ER Diagram" style="zoom:50%;" />



## 기타

### Git Strategy

#### Branch

```
master
	develop
		back
			jira_ticket_number-feature
			...
		front
			jira_ticket_number-feature
			...
```

#### Commit Message

```
jira_ticket_number #comment 설명 #status
```

- `jira_ticket_number`: Jira 티켓 번호
- `#status`
  - `#to-do`
  - `#in-progress`
  - `#done`



## 테스트 방법

> 로컬 테스트

### Backend

1. Python 설치

2. 가상 환경 설정 및 의존성 주입

   ```shell
   $ cd backend
   $ python -m venv venv
   $ source venv/bin/activate
   (venv) $ python -m pip install -r requirements.txt
   ```

3. `.env` 설정

   ```shell
   DEBUG=
   DJANGO_SECRET_KEY=
   DJANGO_ALLOWED_HOSTS=
   MYSQL_NAME=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_HOST=
   EMAIL_REDIRECT_URL=
   NAVER_ID=
   NAVER_PASSWORD=
   ```

4. 마이그레이션 및 로컬 테스트 서버 실행

   ```shell
   # 마이그레이션
   $ python manage.py makemigrations
   $ python manage.py migrate
   # 테스트 데이터 생성
   $ python manage.py setup_test_data
   # 서버 실행
   $ python manage.py runserver 8000
   ```

### Frontend

1. node.js 설치

2. 환경 설정 및 의존성 주입

   ```shell
   $ cd frontend
   $ npm install --silent
   ```

3. `.env.local` 설정

   ```shell
   REACT_APP_API_URL=http://localhost:8000/
   ```

4. 실행

   ```shell
   $ npm start
   ```

   ​	