import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Onboarding = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate();
  const { pathname} = useLocation()

  useEffect(()=>{
    console.log('h')
    if(user && user.unsafeMetadata.role && pathname ==='/onboarding'){
      const role = user?.unsafeMetadata?.role
      // const route = role === 'RECRUITER' ? '/post-job' : '/jobs'
      // navigate(route)
    }
  },[user])

  if(!isLoaded){
    return <BarLoader  className='mb-4' width="100%" color='#2563EB'/>
  }

  const handleRoleSelection = async (role)=>{
    try{await user.update({
      unsafeMetadata: { role },
    })
    const route = role === 'RECRUITER' ? '/post-job' : '/job'
      navigate(route)}
      catch (e) {
        alert('Something went wrong', e.message)
      }
  }

  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h2 className='font-extrabold text-3xl sm:text-8xl tracking-tighter'>I am a...</h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button variant="blue" className='h-28 text-2xl' onClick={()=> handleRoleSelection('CANDIDATE')}>Candidate</Button>
        <Button variant="destructive" className='h-28 text-2xl' onClick={()=> handleRoleSelection('RECRUITER')}>Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding
