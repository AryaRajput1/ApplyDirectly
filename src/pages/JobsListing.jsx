import { getJobs } from "@/services/service"
import { useSession, useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { BarLoader } from "react-spinners"

const JobsListing = () => {

  const { isLoaded , session } = useSession()

  if(!isLoaded){
    return <BarLoader  className='mb-4' width="100%" color='#2563EB'/>
  }

  const fetchJobs = async () =>{
    const user_session = await session
    const token = await user_session?.getToken({
      template: "supabase",
    })

    console.log('token', token)

    const data = await getJobs(token)
    console.log('data', data)
    return data
  }

  useEffect(()=>{
    fetchJobs()
  },[])

  return (
    <div>
      JobsListing
    </div>
  )
}

export default JobsListing
