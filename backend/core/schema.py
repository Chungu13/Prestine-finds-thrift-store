import graphene
from products.graphql import Query, Mutation

schema = graphene.Schema(query=Query, mutation=Mutation)