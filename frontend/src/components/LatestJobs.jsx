import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div 
            className='max-w-7xl mx-auto my-20'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className='mb-12'
            >
                <div className='flex items-center gap-3 mb-2'>
                    <Briefcase className='h-8 w-8 text-[#6A38C2]' />
                    <h1 className='text-5xl font-bold'>
                        <span className='text-[#6A38C2]'>Latest & Top </span>
                        <span className='text-gray-900'>Job Openings</span>
                    </h1>
                </div>
                <div className='h-1 w-20 bg-gradient-to-r from-[#6A38C2] to-purple-400 rounded-full'></div>
            </motion.div>

            <motion.div 
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8'
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {
                    allJobs.length <= 0 ? (
                        <motion.div 
                            variants={itemVariants}
                            className='col-span-full flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg'
                        >
                            <Briefcase className='h-16 w-16 text-gray-300 mb-4' />
                            <p className='text-xl text-gray-500 font-medium'>No Job Available</p>
                            <p className='text-gray-400 mt-2'>Check back soon for new opportunities!</p>
                        </motion.div>
                    ) : (
                        allJobs?.slice(0,6).map((job) => (
                            <motion.div
                                key={job._id}
                                variants={itemVariants}
                            >
                                <LatestJobCards job={job}/>
                            </motion.div>
                        ))
                    )
                }
            </motion.div>
        </motion.div>
    )
}

export default LatestJobs