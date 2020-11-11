import factory
import factory.fuzzy
from factory.django import DjangoModelFactory

from users.models import CustomUser
from games.models import Tag, Source, GameHistory


CATEGORIES = [x[0] for x in Source.TYPE_CHOICES]


class UserFactory(DjangoModelFactory):
    class Meta:
        model = CustomUser

    email = factory.Faker('email')
    username = factory.Faker('name')


class TagFactory(DjangoModelFactory):
    class Meta:
        model = Tag
    
    content = factory.Faker('color_name')


class SourceFactory(DjangoModelFactory):
    class Meta:
        model = Source
    
    title = factory.Faker('sentence', nb_words=3)
    description = factory.Faker('sentence')
    link = factory.Faker('domain_name')
    category = factory.fuzzy.FuzzyChoice(CATEGORIES)
    content = factory.Faker('paragraph', nb_sentences=3, variable_nb_sentences=True)
    length = factory.Faker('random_number')
    difficulty = factory.Faker('random_digit_not_null')


class GameHistoryFactory(DjangoModelFactory):
    class Meta:
        model = GameHistory
    
    game_time = factory.Faker('random_int',min=0, max=100)
    precision = factory.Faker('random_int', min=0, max=100)
    typo = factory.Faker('json')
    score = factory.Faker('random_int', min=0, max=100)
    player = factory.SubFactory(UserFactory)
    source = factory.SubFactory(SourceFactory)
