import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-6 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
            <div className='mb-3'>
                <p className='text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            </div>

            <div className='flex items-center gap-3 my-4'>
                <div className="p-2 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 flex items-center gap-1'>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        India
                    </p>
                </div>
            </div>

            <div className='my-4'>
                <h1 className='font-bold text-xl mb-2 text-gray-900'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-semibold bg-red-50 hover:bg-red-100'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-semibold bg-purple-50 hover:bg-purple-100'} variant="ghost">{job?.salary}</Badge>
                <Badge className={'text-green-700 font-semibold bg-green-50 hover:bg-green-100'} variant="ghost">{job?.experienceLevel} yrs</Badge>
            </div>
            <div className='mt-5'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="w-full hover:bg-gray-50 font-medium transition-colors">Details</Button>
            </div>
        </div>
    )
}

export default Job