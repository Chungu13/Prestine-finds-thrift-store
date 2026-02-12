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
        if not self.image:
            return None
        
        # info.context is the HttpRequest object
        if info.context is not None:
            return info.context.build_absolute_uri(self.image.url)
        
        # If context is somehow missing, return the relative path 
        # (your frontend can then prepend the backend URL)
        return self.image.url