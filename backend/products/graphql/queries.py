import graphene
from django.db.models import Q

from products.models import Category, Product

from .types import CategoryType, ProductType


class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)
    all_products = graphene.List(
        ProductType,
        search=graphene.String(required=False),
        category=graphene.String(required=False),
        condition=graphene.String(required=False),
        min_price=graphene.Float(required=False),
        max_price=graphene.Float(required=False),
        sort_by=graphene.String(required=False),
        available=graphene.Boolean(required=False),
    )
    product = graphene.Field(ProductType, id=graphene.ID())
    category = graphene.Field(CategoryType, slug=graphene.String())

    def resolve_all_categories(self, info):
        return Category.objects.all()

    def resolve_all_products(self, info, search=None, category=None, condition=None, min_price=None, max_price=None, sort_by=None, available=None):
        qs = Product.objects.all()

        if search:
            qs = qs.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        if category and category != "All Categories":
             qs = qs.filter(category__name__iexact=category)
        
        if condition and condition != "Any Condition":
            qs = qs.filter(condition=condition)
        
        if min_price is not None:
            qs = qs.filter(price__gte=min_price)
        
        if max_price is not None:
            qs = qs.filter(price__lte=max_price)
        
        if available is not None:
            qs = qs.filter(available=available)
        
        if sort_by:
            if sort_by == "price_asc":
                qs = qs.order_by("price")
            elif sort_by == "price_desc":
                qs = qs.order_by("-price")
            elif sort_by == "name_asc":
                qs = qs.order_by("name")
            elif sort_by == "name_desc":
                qs = qs.order_by("-name")

        return qs

    def resolve_product(self, info, id):
        return Product.objects.filter(pk=id).first()

    def resolve_category(self, info, slug):
        return Category.objects.filter(slug=slug).first()

