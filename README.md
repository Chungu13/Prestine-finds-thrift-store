# Pristine Finds - Product Catalogue System
**Personal Project** | Full-Stack Development

## Overview
Pristine Finds is a product catalogue system for pre-loved women's fashion, designed to make quality second-hand clothing accessible and affordable. Currently at MVP stage as a browsable catalogue, with plans to evolve into a full-featured e-commerce platform.

**Live Demo:** [https://prestine-finds-thrift-store.vercel.app/]

## Current Status (MVP)
- Browse curated collection of pre-loved fashion items
- Product search and filtering by category, size, and condition
- Responsive design for mobile and desktop
- Admin dashboard for product management

## Future Vision
Transform into a complete online thrift store with:
- Shopping cart and checkout system
- Payment integration
- User accounts and order history
- Inventory management
- Customer reviews and ratings

## Tech Stack

**Backend:**
- Django 5.2 with GraphQL (Graphene-Django)
- PostgreSQL database
- Gunicorn WSGI server
- Docker containerization

**Frontend:**
- Next.js 16 (React framework)
- TypeScript
- Tailwind CSS
- Apollo Client for GraphQL

**DevOps:**
- Docker (Backend only)
- [Your hosting platform -  Vercel for frontend, Render for backend]

## Quick Start

### Prerequisites
- Docker and Docker Compose (for backend)
- Node.js 20+ (for frontend)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Chungu13/Prestine-finds-thrift-store.git
```

2. **Start the Backend**
```bash
   # Set up environment variables
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Start Docker containers
   docker-compose up --build
   
   # In a new terminal, run migrations
   docker-compose exec web python manage.py migrate
   docker-compose exec web python manage.py createsuperuser
```

3. **Start the Frontend**
```bash
   # In a new terminal
   cd frontend
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   # Edit .env.local (set NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql/)
   
   # Start development server
   npm run dev
```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend Admin: http://localhost:8000/admin
   - GraphQL API: http://localhost:8000/graphql/

## Project Structure
```
pristine-finds/
├── backend/          # Django backend with GraphQL API (Docker)
├── frontend/         # Next.js frontend application (Node.js)
├── docker-compose.yml
└── README.md
```

## Key Features

**Product Management**
- Add, edit, and delete products through admin dashboard
- Image upload and optimization
- Category, size, and condition tracking

**User Experience**
- Fast, responsive product browsing
- Advanced filtering and search
- Mobile-first design

**API**
- GraphQL endpoint for efficient data fetching
- Type-safe queries and mutations

## Development Roadmap

- [x] Product catalogue with search/filter
- [x] Admin dashboard
- [x] Responsive design
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management system
- [ ] Email notifications

## Contributing
This is a personal project, but feedback and suggestions are welcome!

## License
Private and proprietary

## Contact
[Chungu Muloshi] - [chungumuloshi03@gmail.com]

---

**Note:** This project started as an MVP product catalogue and is actively being developed into a full e-commerce platform.
