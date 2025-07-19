from rest_framework.views import exception_handler
from rest_framework.exceptions import NotFound
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    # Handle DRF NotFound exceptions
    if isinstance(exc, NotFound):
        return response.__class__({
            "success": False,
            "message": "Resource not found",
            "errors": {"detail": "The requested endpoint does not exist."}
        }, status=status.HTTP_404_NOT_FOUND)

    # Handle DRF validation and other exceptions
    if response is not None:
        errors = {}
        if isinstance(response.data, dict):
            for key, value in response.data.items():
                errors[key] = value[0] if isinstance(value, list) else value

        response.data = {
            "success": False,
            "message": "Validation Failed",
            "errors": errors
        }
        return response

    # Handle non-DRF exceptions (500 errors)
    return response.__class__({
        "success": False,
        "message": "Internal Server Error",
        "errors": {"detail": str(exc)}
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)