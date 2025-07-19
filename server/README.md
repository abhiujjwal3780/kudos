
This is the Django backend for the Kudos application. It provides REST APIs for managing users, organizations, kudos, and kudos assignments.

## Features

- JWT authentication (login, refresh)
- Organization, User, Kudos, and KudosAssignment models
- Filterable API endpoints for all major resources
- Assignment and tracking of kudos between users
- Admin interface for data management

## Requirements

- Python 3.8+
- pip
- SQLite (for development)

## Setup

1. **Clone the repository:**
    ```sh
    cd kudos/server
    ```

2. **Create and activate a virtual environment:**
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```


4. **Apply migrations:**
    ```sh
    python manage.py migrate
    ```

5. **Create a superuser (for admin access):**
    ```sh
    python manage.py createsuperuser : this command will not work, as organization is mandatory to create a user, so plase below steps to create super user.
    1. go to User interface(React application, localhost:3000) and select Create Org tab ==> localhost:3000/create-org and create org.
    now  
    2. Go to Create User tab => path will be localhost/create-user
    3. fill all the details
    4. Organization id will be 1, as org id will be starting from 1,
    5. select Is Superuser 
    and click on Create button
    6, now you can go to backend url, => localhost:8000/admin and user username and password login to admin console.
    ```

6. **Run the development server:**
    ```sh
    python manage.py runserver
    ```
7. **Swagger UI: **
    http://localhost:8000/swagger/
    Redoc: http://localhost:8000/redoc/

## API Overview

- **Authentication:**  
  `/api/token/` (obtain), `/api/token/refresh/` (refresh)

- **Organizations:**  
  `/organizations/`, `/organizations/<org_id>/`

- **Users:**  
  `/organizations/<org_id>/users/`, `/organizations/<org_id>/users/<user_id>/`

- **Kudos:**  
  `/organizations/<org_id>/kudos/`, `/organizations/<org_id>/kudos/<kudos_id>/`

- **Kudos Assignments:**  
  `/organizations/<org_id>/kudos-assignments/`, `/organizations/<org_id>/kudos-assignments/<assignment_id>/`

- **User Kudos:**  
  `/organizations/<org_id>/users/<user_id>/kudos/` (received)  
  `/organizations/<org_id>/users/<user_id>/kudos/given/` (given)

## Filtering

Most list endpoints support filtering via query parameters, e.g.:
```
/organizations/1/kudos/?sender=2&level=Gold
```

## Admin

Visit `/admin/` to manage all models via Django admin.

- Make sure to install and configure `django-filter` for API filtering.


- Update `ALLOWED_HOSTS` and database settings for production.

---

**Happy coding and kudos sharing!**
