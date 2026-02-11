from graphene_django.types import DjangoObjectType
import graphene

from products.models import Category, Product


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "size",
            "condition",
            "category",
            "image",
            "available",
        )

    def resolve_image(self, info):
        if self.image:
            return self.image.url
        return None
