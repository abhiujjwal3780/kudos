from django.contrib import admin

from .models import Organization, User, Kudos, KudosAssignment  
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name',)       

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'organization')
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'is_staff', 'organization')    

@admin.register(Kudos)
class KudosAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'level', 'behaviour', 'points', 'organization', 'created_at')
    search_fields = ('sender__username', 'receiver__username', 'level', 'behaviour')
    list_filter = ('organization', 'level', 'behaviour')     

@admin.register(KudosAssignment)
class KudosAssignmentAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'assignment_start_date', 'assignment_end_date', 'status', 'organization', 'created_at')
    search_fields = ('sender__username', 'receiver__username', 'status')
    list_filter = ('organization', 'status')    