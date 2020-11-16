import random

from django.db import transaction
from django.core.management.base import BaseCommand, CommandError

from users.models import CustomUser
from games.models import Tag, Source, GameHistory
from games.factories import (
    UserFactory,
    TagFactory,
    SourceFactory,
    GameHistoryFactory,
    EmailAddressFactory
)
from allauth.account.models import EmailAddress

NUM_USERS = 50
NUM_TAGS = 10
NUM_SOURCES = 20
TAGS_PER_SOURCE = 3
NUM_GAME_HISTORIES = 100


class Command(BaseCommand):
    help = 'Generate test data'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [CustomUser, Tag, Source, GameHistory, EmailAddress]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")
        # Create all the users
        users = []
        for _ in range(NUM_USERS):
            user = UserFactory()
            users.append(user)
        # Create all the emailaddress
        for user in users:
            emailaddress = EmailAddressFactory(user=user)

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
                k=random.randint(0, NUM_USERS)
            )
            source.likers.add(*likers)
            subscribers = random.choices(
                users,
                k=random.randint(0, NUM_USERS)
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

