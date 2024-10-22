import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({children} ) => {
    const { isSignedIn, isLoaded , user } = useUser()
    const {pathname} = useLocation()

    if(isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to='/?sign-in=true'/>
    }

    if(user && !user.unsafeMetaData?.role && pathname !=='/onboarding'){
        return <Navigate to='/onboarding'/>
    }


  return (children)
}

export default ProtectedRoutes
