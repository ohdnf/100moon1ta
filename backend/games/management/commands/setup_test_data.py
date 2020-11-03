import random

from django.db import transaction
from django.core.management.base import BaseCommand, CommandError

from users.models import CustomUser
from games.models import Tag, Source, GameHistory
from games.factories import (
    UserFactory,
    TagFactory,
    SourceFactory,
    GameHistoryFactory
)


NUM_USERS = 40
NUM_TAGS = 5
NUM_SOURCES = 10
TAGS_PER_SOURCE = 3
NUM_GAME_HISTORIES = 20


class Command(BaseCommand):
    help = 'Generate test data'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [CustomUser, Tag, Source, GameHistory]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")
        # Create all the users
        users = []
        for _ in range(NUM_USERS):
            user = UserFactory()
            users.append(user)
        
        # Create all the tags
        tags = []
        for _ in range(NUM_TAGS):
            tag = TagFactory()
            tags.append(tag)
        
        # Create all the Sources
        sources = []
        for _ in range(NUM_SOURCES):
            source = SourceFactory()
            # Add likers and subscribers
            likers = random.choices(
                users,
                k=random.randint(0, 40)
            )
            source.likers.add(*likers)
            subscribers = random.choices(
                users,
                k=random.randint(0, 40)
            )
            source.subscribers.add(*subscribers)
            # Add tags
            tags = random.choices(
                tags,
                k=TAGS_PER_SOURCE
            )
            source.tags.add(*tags)

            sources.append(source)

        # Create game histories
        for _ in range(NUM_GAME_HISTORIES):
            user = random.choice(users)
            src = random.choice(sources)
            game_history = GameHistoryFactory(player=user, source=src)
