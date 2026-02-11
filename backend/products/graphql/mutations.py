import graphene
from graphql import GraphQLError

from products.models import Category, Product

from .types import CategoryType, ProductType


# ----- Product mutations -----


class CreateProduct(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=True)
        price = graphene.Decimal(required=True)
        category_id = graphene.ID(required=True)
        size = graphene.String()
        condition = graphene.String()
        image = graphene.String()
        isAvailable = graphene.Boolean()

    product = graphene.Field(ProductType)

    def mutate(self, info, name, description, price, category_id, size=None, condition=None, image=None, isAvailable=None):
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            raise GraphQLError("Category not found.")

        product = Product.objects.create(
            name=name,
            description=description,
            price=price,
            category=category,
            size=size,
            condition=condition,
            image=image,
            available=isAvailable if isAvailable is not None else True
        )   
        return CreateProduct(product=product)


class UpdateProduct(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        price = graphene.Decimal()
        category_id = graphene.ID()
        size = graphene.String()
        condition = graphene.String()
        image = graphene.String()
        isAvailable = graphene.Boolean()

    product = graphene.Field(ProductType)

    def mutate(self, info, id, **kwargs):
        product = Product.objects.filter(pk=id).first()
        if not product:
            raise GraphQLError("Product not found.")

        if "name" in kwargs and kwargs["name"] is not None:
            product.name = kwargs.pop("name")
        if "description" in kwargs and kwargs["description"] is not None:
            product.description = kwargs.pop("description")
        if "price" in kwargs and kwargs["price"] is not None:
            product.price = kwargs.pop("price")
        if "size" in kwargs and kwargs["size"] is not None:
            product.size = kwargs.pop("size")
        if "condition" in kwargs and kwargs["condition"] is not None:
            product.condition = kwargs.pop("condition")
        if "image" in kwargs and kwargs["image"] is not None:
            product.image = kwargs.pop("image")
        if "isAvailable" in kwargs and kwargs["isAvailable"] is not None:
            product.isAvailable = kwargs.pop("isAvailable")
        if "category_id" in kwargs and kwargs["category_id"] is not None:
            try:
                category = Category.objects.get(pk=kwargs.pop("category_id"))
                product.category = category
            except Category.DoesNotExist:
                raise GraphQLError("Category not found.")

        product.save()
        return UpdateProduct(product=product)


class DeleteProduct(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        product = Product.objects.filter(pk=id).first()
        if not product:
            raise GraphQLError("Product not found.")
        product.delete()
        return DeleteProduct(success=True)


# ----- Category mutations -----


class CreateCategory(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        slug = graphene.String(required=True)

    category = graphene.Field(CategoryType)

    def mutate(self, info, name, slug):
        if Category.objects.filter(slug=slug).exists():
            raise GraphQLError("A category with this slug already exists.")
        category = Category.objects.create(name=name, slug=slug)
        return CreateCategory(category=category)


class UpdateCategory(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        slug = graphene.String()

    category = graphene.Field(CategoryType)

    def mutate(self, info, id, name=None, slug=None):
        category = Category.objects.filter(pk=id).first()
        if not category:
            raise GraphQLError("Category not found.")

        if name is not None:
            category.name = name
        if slug is not None:
            category.slug = slug
            if Category.objects.filter(slug=category.slug).exclude(pk=id).exists():
                raise GraphQLError("A category with this slug already exists.")

        category.save()
        return UpdateCategory(category=category)


class DeleteCategory(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        category = Category.objects.filter(pk=id).first()
        if not category:
            raise GraphQLError("Category not found.")
        category.delete()
        return DeleteCategory(success=True)


# ----- Root Mutation -----


class Mutation(graphene.ObjectType):
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()
    create_category = CreateCategory.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()
