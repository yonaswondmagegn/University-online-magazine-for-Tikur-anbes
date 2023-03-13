from djoser.serializers import UserCreateSerializer


class CustomSerailizer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['username','password','school_id']