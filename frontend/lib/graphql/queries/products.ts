import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts(
    $search: String
    $category: String
    $condition: String
    $minPrice: Float
    $maxPrice: Float
    $sortBy: String
    $available: Boolean
  ) {
    allProducts(
      search: $search
      category: $category
      condition: $condition
      minPrice: $minPrice
      maxPrice: $maxPrice
      sortBy: $sortBy
      available: $available
    ) {
      id
      name
      description
      price
      size
      condition
      image
      available
      category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      size
      condition
      image
      available
      category {
        id
        name
      }
    }
  }
`;
