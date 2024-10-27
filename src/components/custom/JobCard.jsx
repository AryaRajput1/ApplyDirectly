import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { BookmarkIcon, MapPinIcon, Trash2Icon } from 'lucide-react'
import JobsListing from '@/pages/JobsListing'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { savedJobs as savingJobs } from '@/services/service'
import { useFetch } from '@/hooks/useFetch'

const JobCard = ({ job, isMyJob = false, isSaved = false, isViewdJob = false, onJobSaved = () => { } }) => {
  const [isSavedJob, setIsSavedJob] = useState(()=>{
    console.log('setIsSavedJob', job.saved)

    return job.saved.length>0
  })
  const { user } = useUser()
  console.log(user.id , 'id')
  const { fn: saveJobs, loading:loadingSavedJobs, data: savedJobs } = useFetch(savingJobs, { alreadySaved: isSavedJob })

  const handleSavedJobs = async () => {
    await saveJobs({
      candidate_id: user.id,
      job_id: job.id
    })
  }

  useEffect(()=>{
    if(savedJobs){
      setIsSavedJob(savedJobs.length>0)
    }else {
      setIsSavedJob(false)
    }
  }, [savedJobs])

  return (
    <Card className="hover:scale-105 transition-all relative">
      <CardHeader >
        <CardTitle className='flex justify-between font-bold'>
          {job?.title}

          {isMyJob && (
            <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer' />
          )}
        </CardTitle>

      </CardHeader>

      <CardContent>
        <div className='flex justify-between items-center'>
          {
            job.company && (<img src={job.company.logo_url} className='h-8' />)
          }
          <div className='flex gap-2 items-center'>
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr className='my-2' />
        <span className='line-clamp-2'>{job.description}</span>
      </CardContent>
      <CardFooter className='flex gap-1'>
        <Link to={`/job/${job.id}`} className='flex-1'>
          <Button className='w-full' variant='secondary'>View More</Button>
        </Link>
        {!isMyJob &&
          <Button onClick={handleSavedJobs} variant='ghost' className='absolute -top-5 right-0' disabled={loadingSavedJobs}>
            <BookmarkIcon fill={isSavedJob ? '#2663EB' : 'white'} size={35} stroke='#2663EB' className='mx-2' />
          </Button>
        }

      </CardFooter>
    </Card>
  )
}

export default JobCard
