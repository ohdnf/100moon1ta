from django.test import TestCase
from .models import Tag, Source, GameHistory
from users.models import CustomUser


class ModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.u1 = CustomUser(email='wnvy19@naver.com', username='ohdnf')
        cls.t1 = Tag(content='python')
        cls.s1 = Source(category='C', content='hello, world', length=len('hello, world'), difficulty=1)
        cls.g1 = GameHistory(user=u1, source=s1, game_time=123, precision=97.32, typo={}, points=100)
    
