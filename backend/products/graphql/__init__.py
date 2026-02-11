"""
products.graphql: re-exports Query and Mutation so core can do
  from products.graphql import Query, Mutation

Expects:
  - .queries: Query (all_categories, all_products, etc.)
  - .mutations: Mutation (create_product, etc.; can start as empty pass)
"""

from .queries import Query
from .mutations import Mutation
