import { useFetch } from '@/hooks/useFetch';
import { getSingleJob } from '@/services/service';
import { useUser } from '@clerk/clerk-react';
import { Briefcase, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const Job = () => {
  const { isLoaded } = useUser()
  const { id } = useParams();
  const {
    fn: fetchJob,
    loading,
    data: job,
  } = useFetch(getSingleJob, {id: id});

  console.log(job)

  useEffect(() => {
    if (isLoaded) {
      fetchJob();
    }
  }, [isLoaded]);

  if (!isLoaded || loading) {
    return <BarLoader className="mb-4" width="100%" color="#2563EB" />;
  }

  return (
    <div className='mt-4'>
      <div className='flex flex-col-reverse gap-2 md:flex-row justify-between items-center'>
        <h1 className='font-bold pb-3 text-2xl sm:text-4xl'>{job?.title}</h1>
        <img src={job?.company.logo_url} className='h-12' alt={job?.title}/>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon/>
          {job?.location}
        </div>
      </div>
    </div>
  )
}

export default Job
