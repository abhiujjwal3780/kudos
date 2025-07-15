KUDOS_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('cancelled', 'Cancelled'),
]

KUDOS_STATUS_VALUES = ['pending', 'completed', 'cancelled']

ERROR_SAME_USER = "Sender and receiver cannot be the same."
ERROR_ORG_MISMATCH = "You can only send Kudos within your organization."
ERROR_EMPTY_MESSAGE = "Message cannot be empty."
ERROR_POINTS_MIN = "Points must be at least 1."
ERROR_SELF_KUDOS = "You cannot send Kudos to yourself."
ERROR_START_AFTER_END = "Start date cannot be after end date."
ERROR_INVALID_STATUS = "Invalid status. Choose from 'pending', 'completed', or 'cancelled'."
ERROR_START_REQUIRED = "Assignment start date is required."
ERROR_END_REQUIRED = "Assignment end date is required."
ERROR_EMAIL_IN_USE = "Email is already in use."
ERROR_USERNAME_IN_USE = "Username is already in use."
ERROR_PASSWORD_LENGTH = "Password must be at least 8 characters long."
ERROR_PASSWORD_DIGIT = "Password must contain at least one digit."
ERROR_PASSWORD_LETTER = "Password must contain at least one letter."
ERROR_MANAGER_ORG = "Manager and employee must belong to the same organization."