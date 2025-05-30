// import React, { useEffect } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';

// import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';

// import { useDispatch, useSelector } from 'react-redux';

// const JobDescription = () => {

//     const isApplied = true;
//     const params = useParams();
//     const jobId = params.id;
//     const {singleJob} = useSelector(store=>store.job);
//     const {user} = useSelector(store=>store.auth)
//     const dispatch = useDispatch();

//     useEffect(() => {
//     const fetchSingleJob = async ()=>{
//         try {
//             const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
//             console.log(res.data.job)
//             if(res.data.success){
//                 dispatch(setSingleJob(res.data.job))
//             }
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
//     fetchSingleJob()
//   }, [jobId,dispatch,user?._id])
//   return (
//      <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'></h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={'text-blue-700 font-bold'} variant="ghost"> Positions</Badge>
//                         <Badge className={'text-[#F83002] font-bold'} variant="ghost"></Badge>
//                         <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                 // onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Title</span></h1>
//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>LOcation</span></h1>
//                 <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>lorem</span></h1>
//                 <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12 LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>2</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>12-05-22</span></h1>
//             </div>
//         </div>
//   )
// }

// export default JobDescription




import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const isApplied = singleJob?.applications?.includes(user?._id);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  if (!singleJob) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>

      <div className="my-4">
        <h1 className="font-bold my-1">
          Role: <span className="pl-4 font-normal text-gray-800">{singleJob.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location: <span className="pl-4 font-normal text-gray-800">{singleJob.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description: <span className="pl-4 font-normal text-gray-800">{singleJob.description}</span>
        </h1>
        <h1 className="font-bold my-1">
          Experience: <span className="pl-4 font-normal text-gray-800">{singleJob.experienceLevel} yrs</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl-4 font-normal text-gray-800">{singleJob.salary} LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.applications?.length || 0}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {new Date(singleJob.createdAt).toLocaleDateString()}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;





// 8:17:32