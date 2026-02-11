# GraphQL Mutation Tests for GraphiQL

Copy and paste these into GraphiQL at: `http://localhost:8000/graphql/`

---

## STEP 1: Check Existing Data (Queries)

### Get All Categories
```graphql
query {
  allCategories {
    id
    name
    slug
  }
}
```

### Get All Products
```graphql
query {
  allProducts {
    id
    name
    description
    price
    size
    condition
    category {
      id
      name
      slug
    }
  }
}
```

### Get Single Product by ID
```graphql
query {
  product(id: "1") {
    id
    name
    description
    price
    size
    condition
    category {
      id
      name
    }
  }
}
```

### Get Category by Slug
```graphql
query {
  category(slug: "clothing") {
    id
    name
    slug
  }
}
```

---

## STEP 2: Category Mutations

### Create Category #1
```graphql
mutation {
  createCategory(name: "Clothing", slug: "clothing") {
    category {
      id
      name
      slug
    }
  }
}
```

### Create Category #2
```graphql
mutation {
  createCategory(name: "Electronics", slug: "electronics") {
    category {
      id
      name
      slug
    }
  }
}
```

### Create Category #3
```graphql
mutation {
  createCategory(name: "Books", slug: "books") {
    category {
      id
      name
      slug
    }
  }
}
```

### Update Category (Change name and slug)
```graphql
mutation {
  updateCategory(id: "1", name: "Vintage Clothing", slug: "vintage-clothing") {
    category {
      id
      name
      slug
    }
  }
}
```

### Update Category (Change only name)
```graphql
mutation {
  updateCategory(id: "1", name: "Modern Clothing") {
    category {
      id
      name
      slug
    }
  }
}
```

### Update Category (Change only slug)
```graphql
mutation {
  updateCategory(id: "1", slug: "modern-clothing") {
    category {
      id
      name
      slug
    }
  }
}
```

### Delete Category
```graphql
mutation {
  deleteCategory(id: "3") {
    success
  }
}
```

---

## STEP 3: Product Mutations

**Note:** You need a category ID first! Get it from Step 1 or Step 2.

### Create Product #1 (All fields)
```graphql
mutation {
  createProduct(
    name: "Vintage Denim Jacket"
    description: "A classic vintage denim jacket in excellent condition. Perfect for any wardrobe."
    price: "45.99"
    categoryId: "1"
    size: "M"
    condition: "EXCELLENT"
  ) {
    product {
      id
      name
      description
      price
      size
      condition
      category {
        id
        name
      }
    }
  }
}
```

### Create Product #2 (Minimal fields - size and condition optional)
```graphql
mutation {
  createProduct(
    name: "Wireless Headphones"
    description: "High-quality wireless headphones with noise cancellation."
    price: "89.99"
    categoryId: "2"
  ) {
    product {
      id
      name
      description
      price
      size
      condition
      category {
        id
        name
      }
    }
  }
}
```

### Create Product #3 (Different size and condition)
```graphql
mutation {
  createProduct(
    name: "Programming Book"
    description: "Learn Python programming from scratch."
    price: "29.99"
    categoryId: "3"
    size: "L"
    condition: "NEW"
  ) {
    product {
      id
      name
      description
      price
      size
      condition
      category {
        id
        name
      }
    }
  }
}
```

### Update Product (Change all fields)
```graphql
mutation {
  updateProduct(
    id: "1"
    name: "Updated Vintage Jacket"
    description: "Updated description for this amazing jacket."
    price: "55.99"
    categoryId: "1"
    size: "L"
    condition: "GOOD"
  ) {
    product {
      id
      name
      description
      price
      size
      condition
      category {
        id
        name
      }
    }
  }
}
```

### Update Product (Change only name)
```graphql
mutation {
  updateProduct(
    id: "1"
    name: "Super Cool Vintage Jacket"
  ) {
    product {
      id
      name
      description
      price
    }
  }
}
```

### Update Product (Change only price)
```graphql
mutation {
  updateProduct(
    id: "1"
    price: "49.99"
  ) {
    product {
      id
      name
      price
    }
  }
}
```

### Update Product (Change category)
```graphql
mutation {
  updateProduct(
    id: "1"
    categoryId: "2"
  ) {
    product {
      id
      name
      category {
        id
        name
      }
    }
  }
}
```

### Update Product (Change size and condition)
```graphql
mutation {
  updateProduct(
    id: "1"
    size: "XL"
    condition: "FAIR"
  ) {
    product {
      id
      name
      size
      condition
    }
  }
}
```

### Delete Product
```graphql
mutation {
  deleteProduct(id: "2") {
    success
  }
}
```

---

## STEP 4: Error Testing (Optional - Test Error Handling)

### Try to create product with invalid category ID
```graphql
mutation {
  createProduct(
    name: "Test Product"
    description: "This should fail"
    price: "10.00"
    categoryId: "999"
  ) {
    product {
      id
      name
    }
  }
}
```
**Expected:** Error: "Category not found."

### Try to update non-existent product
```graphql
mutation {
  updateProduct(id: "999", name: "Test") {
    product {
      id
      name
    }
  }
}
```
**Expected:** Error: "Product not found."

### Try to delete non-existent product
```graphql
mutation {
  deleteProduct(id: "999") {
    success
  }
}
```
**Expected:** Error: "Product not found."

### Try to create category with duplicate slug
```graphql
mutation {
  createCategory(name: "Another Clothing", slug: "clothing") {
    category {
      id
      name
      slug
    }
  }
}
```
**Expected:** Error: "A category with this slug already exists."

---

## Valid Values Reference

### Size Options:
- `"S"` - Small
- `"M"` - Medium (default)
- `"L"` - Large
- `"XL"` - Extra Large

### Condition Options:
- `"NEW"` - Brand New
- `"EXCELLENT"` - Like New
- `"GOOD"` - Gently Used (default)
- `"FAIR"` - Worn but functional

---

## Testing Order Recommendation:

1. **First:** Run queries to see what exists
2. **Second:** Create 2-3 categories
3. **Third:** Create 2-3 products (using category IDs from step 2)
4. **Fourth:** Update some products and categories
5. **Fifth:** Delete one product and one category
6. **Finally:** Run queries again to verify changes

---

## Tips:

- Replace `"1"`, `"2"`, etc. with actual IDs from your database
- Prices must be strings with quotes: `"45.99"` not `45.99`
- Category IDs must be strings: `"1"` not `1`
- If you get errors, check that category IDs exist before creating products
- Use the queries at the top to get real IDs from your database
