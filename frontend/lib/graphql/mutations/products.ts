import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Decimal!
    $categoryId: ID!
    $size: String
    $condition: String
    $image: String
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      categoryId: $categoryId
      size: $size
      condition: $condition
      image: $image
    ) {
      product {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Decimal
    $categoryId: ID
    $size: String
    $condition: String
    $image: String
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      categoryId: $categoryId
      size: $size
      condition: $condition
      image: $image
    ) {
      product {
        id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
    }
  }
`;
