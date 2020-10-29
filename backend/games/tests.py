from django.test import TestCase
from django.test.client import RequestFactory
from games.models import Tag, Source, GameHistory
from users.models import CustomUser


class ModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        """
        테스트 시작 시 한 번만 실행
        테스트 메소드가 실행되어도 수정/변경이 되지 않는 객체들을 생성
        """
        # print("setUpTestData: Run once to set up non-modified data for all class methods.")
        # cls.u1 = CustomUser(email='wnvy19@naver.com', username='ohdnf')
        # cls.t1 = Tag(content='python')
        # cls.s1 = Source(category='C', content='hello, world', length=len('hello, world'), difficulty=1)
        # cls.g1 = GameHistory(user=u1, source=s1, game_time=123, precision=97.32, typo={}, points=100)
        pass

    def setUp(self):
        """
        각 테스트 메소드가 실행될 때마다 실행
        테스트 중 내용이 변경될 수 있는 객체를 생성
        """
        # print("setUp: Run once for every test method to setup clean data.")

        self.factory = RequestFactory()
        self.admin = CustomUser.objects.create(
            is_superuser=True,
            is_staff=True,
            email='wnvy19@naver.com', 
            username='wnvy',
            password='q1w2e3r4'
        )
        self.normal_user = CustomUser.objects.create(
            is_superuser=False,
            is_staff=False,
            email='ohdnf@gmail.com', 
            username='ohdnf',
            password='q1w2e3r4'
        )
        
        Tag.objects.create(content='Python')
        Tag.objects.create(content='JavaScript')

        Source.objects.create(
            content='print(\'hello, python\')', 
            category='C', 
            length=len('print(\'hello, python\')'), 
            difficulty=1
        )
        Source.objects.create(
            content='console.log(\'hello, javascript\')', 
            category='C', 
            length=len('console.log(\'hello, javascript\')'), 
            difficulty=1
        )

    def test_create_game_history(self):
        params = {
            "game_time": 123,
            "precision": 97.32,
            "typo": {},
            "points": 85
        }
        user = CustomUser.objects.get(pk=1)
        src = Source.objects.get(pk=1)
        response = self.factory.post(f'/api/v1/games/{src.id}/')

        self.assertEqual(response.status_code, 201)
