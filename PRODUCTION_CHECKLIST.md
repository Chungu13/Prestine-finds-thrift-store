# Production Deployment Checklist

Use this checklist before deploying to production to ensure everything is configured correctly.

## 🔐 Security

- [ ] **SECRET_KEY**: Generate a new, strong secret key for production
  ```bash
  python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
  ```
- [ ] **DEBUG**: Set `DEBUG=False` in production environment
- [ ] **ALLOWED_HOSTS**: Configure with your actual domain(s)
- [ ] **CORS_ALLOWED_ORIGINS**: Set to your frontend domain only
- [ ] **SSL/HTTPS**: Enable SSL redirect and secure cookies if using HTTPS
  - Set `SECURE_SSL_REDIRECT=True`
  - Set `SESSION_COOKIE_SECURE=True`
  - Set `CSRF_COOKIE_SECURE=True`
- [ ] **Database Credentials**: Use strong, unique passwords
- [ ] **Environment Variables**: Never commit `.env` files to version control

## 🗄️ Database

- [ ] **PostgreSQL**: Use PostgreSQL instead of SQLite in production
- [ ] **Backups**: Set up automated database backups
- [ ] **Migrations**: Run all migrations before going live
  ```bash
  python manage.py migrate
  ```
- [ ] **Test Data**: Remove or clearly mark test/demo data

## 📦 Static Files & Media

- [ ] **Static Files**: Collect static files
  ```bash
  python manage.py collectstatic --noinput
  ```
- [ ] **Media Files**: Configure proper media file storage (consider using S3 or similar)
- [ ] **CDN**: Consider using a CDN for static assets in production
- [ ] **Image Optimization**: Ensure images are optimized for web

## 🐳 Docker & Deployment

- [ ] **Docker Images**: Build production Docker images
- [ ] **Environment Files**: Create production `.env` files from `.env.example`
- [ ] **Volume Persistence**: Ensure database and media volumes are persistent
- [ ] **Health Checks**: Test the `/health/` endpoint
- [ ] **Container Restart Policy**: Set appropriate restart policies

## 🔍 Monitoring & Logging

- [ ] **Logging**: Configure production logging
  - Check that logs directory exists and is writable
  - Set up log rotation
- [ ] **Error Tracking**: Consider integrating Sentry or similar service
- [ ] **Monitoring**: Set up uptime monitoring
- [ ] **Performance**: Monitor application performance and database queries

## 🌐 Frontend

- [ ] **Environment Variables**: Update `NEXT_PUBLIC_GRAPHQL_ENDPOINT` to production API URL
- [ ] **Build**: Test production build locally
  ```bash
  npm run build
  ```
- [ ] **Image Domains**: Configure allowed image domains in `next.config.ts`
- [ ] **Analytics**: Add analytics if needed (Google Analytics, etc.)
- [ ] **SEO**: Verify meta tags, sitemap, and robots.txt

## 🧪 Testing

- [ ] **Functionality**: Test all major features in production-like environment
- [ ] **API Endpoints**: Test all GraphQL queries and mutations
- [ ] **Forms**: Test all forms and data validation
- [ ] **Authentication**: Test login/logout flows if applicable
- [ ] **Error Handling**: Test error pages (404, 500, etc.)
- [ ] **Mobile**: Test on mobile devices
- [ ] **Browsers**: Test on different browsers (Chrome, Firefox, Safari, Edge)

## 📊 Performance

- [ ] **Database Indexes**: Add indexes for frequently queried fields
- [ ] **Query Optimization**: Review and optimize slow database queries
- [ ] **Caching**: Implement caching where appropriate
- [ ] **Compression**: Enable gzip compression
- [ ] **Image Optimization**: Use Next.js Image component for automatic optimization

## 🔄 Backup & Recovery

- [ ] **Database Backups**: Automated daily backups configured
- [ ] **Backup Testing**: Test backup restoration process
- [ ] **Code Repository**: Ensure code is backed up in version control
- [ ] **Rollback Plan**: Have a rollback strategy in case of issues

## 📝 Documentation

- [ ] **README**: Update README with production deployment instructions
- [ ] **API Documentation**: Document GraphQL schema and queries
- [ ] **Environment Variables**: Document all required environment variables
- [ ] **Deployment Process**: Document the deployment process
- [ ] **Troubleshooting**: Create troubleshooting guide for common issues

## 🚀 Pre-Launch

- [ ] **Domain**: Configure domain and DNS settings
- [ ] **SSL Certificate**: Install and configure SSL certificate
- [ ] **Email**: Configure email settings if sending emails
- [ ] **Rate Limiting**: Consider implementing rate limiting for API
- [ ] **Terms & Privacy**: Add Terms of Service and Privacy Policy pages
- [ ] **Contact Info**: Update contact information

## 📱 Post-Launch

- [ ] **Monitor Logs**: Watch logs for errors after launch
- [ ] **Performance Monitoring**: Monitor application performance
- [ ] **User Feedback**: Set up a way to collect user feedback
- [ ] **Analytics**: Monitor traffic and user behavior
- [ ] **Security Updates**: Plan for regular security updates

## 🛠️ Maintenance

- [ ] **Update Schedule**: Plan regular update schedule for dependencies
- [ ] **Security Patches**: Subscribe to security advisories for Django and Next.js
- [ ] **Database Maintenance**: Schedule regular database maintenance
- [ ] **Monitoring Alerts**: Set up alerts for critical issues

---

## Quick Production Deployment Commands

### Using Docker Compose (Recommended)

```bash
# 1. Build and start production containers
docker-compose -f docker-compose.prod.yml up -d --build

# 2. Run migrations
docker-compose -f docker-compose.prod.yml exec web python manage.py migrate

# 3. Create superuser
docker-compose -f docker-compose.prod.yml exec web python manage.py createsuperuser

# 4. Collect static files
docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --noinput

# 5. Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Using Deployment Script (Windows)

```powershell
.\deploy.ps1
```

### Using Deployment Script (Linux/Mac)

```bash
chmod +x deploy.sh
./deploy.sh
```

---

**Remember**: Always test in a staging environment before deploying to production!
