import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300'>
            <div className='flex items-center gap-3 mb-3'>
                <Avatar className="h-12 w-12">
                    <AvatarImage src={job?.company?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt={job?.company?.name} />
                </Avatar>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}</Badge>
                <Badge className={'text-green-700 font-bold'} variant="ghost">{job?.experienceLevel} yrs</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards