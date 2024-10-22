import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {
  const [search, setSearch] = useSearchParams();
  const {user} = useUser();
  const { role } = user?.unsafeMetadata || {}

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const [showSignIn, setShowSignIn] = useState(false)
  return (
    <>
    <nav className='py-4 flex justify-between items-center mx-3'>
      <Link>
      <span className='font-bold text-3xl'> Apply <span className='text-blue-600'>Directly</span></span>
      </Link>
      <div className='flex gap-8'>
      <SignedOut>
        <Button variant='blue' onClick={()=>setShowSignIn(true)}>Login</Button>
      </SignedOut>
      <SignedIn>
        {role && <Link to='/post-job'>
        
        <Button variant='outline'><PenBox size={20} className='mr-2'/>Post a Job</Button>
        </Link>}
        <UserButton appearance={{
          elements: {
            avatarBox: 'w-10 h-10'
          }
        }}>
          <UserButton.MenuItems>
            <UserButton.Link 
            label='My Jobs'
            labelIcon={<BriefcaseBusiness size={15}/>}
            href='/my-jobs'
            />
            <UserButton.Link 
            label='Saved Jobs'
            labelIcon={<Heart size={15}/>}
            href='/saved-jobs'
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      </div>
    </nav>
    {
      showSignIn && 
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50' onClick={handleOverlayClick}>
        <SignIn
        signUpForceRedirectUrl='/onboarding'
        fallbackRedirectUrl='/onboarding'
        />
      </div>
    }
    </>
  )
}

export default Header
