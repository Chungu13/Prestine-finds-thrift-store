from django.db import models

class Category(models.Model):
    # 'name' is the display name (e.g., "Vintage Jackets")
    name = models.CharField(max_length=100)
    # 'slug' is for URL optimization (e.g., "vintage-jackets")
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    # Hardcoded choices for the dropdown menus (Conditions and Sizes)
    CONDITION_CHOICES = [
        ('NEW', 'Brand New'),
        ('EXCELLENT', 'Like New'),
        ('GOOD', 'Gently Used'),
        ('FAIR', 'Worn but functional'),
    ]
# For the choices you should make sure that only the specifi choice can be inputted into the database like no other forms of choices must be inpuuted 
    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Availability: whether this product is currently available for purchase
    available = models.BooleanField(default=True, help_text='Is this product available for purchase')
    # We use our Choices lists here                                                                                                                                                                                                                                                                                                           
    size = models.CharField(max_length=5, choices=SIZE_CHOICES, default='M')
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='GOOD')
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    # The Foreign Key links this product to a specific Category
    # 'on_delete=models.CASCADE' means if a category is deleted, its products are too.
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='products'
    )

    def __str__(self):
        return self.name