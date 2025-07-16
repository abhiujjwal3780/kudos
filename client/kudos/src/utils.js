
export const paths = {
    home:'/',
    login:'/login',
    logot:'/logout',
    create_org:'/create-org',
    create_user:'/create-user',
    dashboard:'/dashboard',
    kudos:'/kudos',
    users:'/users',
    error:'/error',
    userProfile:'/user-profile',
    organizationProfile:'/organization-profile',
    
}

export const subPath = {
    organization:'/organizations/:orgId',
    user:'/organizations/:orgId/users/:userId',
    kudos:'/organizations/:orgId/kudos/:kudosId',
    userProfile:'/users/:userId',
    organizationProfile:'/organizations/:orgId/profile',
}

export const ALL_ROLES = {
    admin:'admin',
    user:'user',
    manager:'manager',
    superAdmin:'superAdmin',
}
