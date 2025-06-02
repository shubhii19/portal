import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
// import useGetAllJobs from '@/hooks/useGetAllJobs'
// import { useDispatch, useSelector } from 'react-redux'


const randomJObs = [1,2,3]
const Browse = () => {
    // useGetAllJobs();
    // const {allJobs} = useSelector(store=>store.job);
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     return ()=>{
    //         dispatch(setSearchedQuery(""));
    //     }
    // },[])
  return (
     <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJObs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                       randomJObs.map((job) => {
                            return (
                                <Job />
                            )
                        })
                    }
                </div>

            </div>
        </div>
  )
}

export default Browse
