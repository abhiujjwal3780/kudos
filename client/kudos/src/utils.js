
export const paths = {
    home:'/',
    login:'/login',
    logot:'/logout',
    create_org:'/create-org',
    create_user:'/create-user',
    kudos:'/kudos',
    users:'/users',
    error:'/error',
    userProfile:'/user-profile',
    organizationProfile:'/organization-profile',
    
}

export const subPath = {
    kudos_dashboard:`${paths.kudos}/dashboard`,
    kudos_create:`${paths.kudos}/create`,
    kudos_all:`${paths.kudos}/all-kudos`,
    kudos_my:`${paths.kudos}/my-kudos`, 
    assign_kudos:`${paths.kudos}/assign-kudos`,
}

export const ALL_ROLES = {
    admin:'admin',
    user:'user',
    manager:'manager',
    superAdmin:'superAdmin',
}
