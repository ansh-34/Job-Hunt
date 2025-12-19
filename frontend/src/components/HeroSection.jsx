import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Zap, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <motion.div 
            className='relative text-center py-20 overflow-hidden'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Gradient Background */}
            <div className='absolute inset-0 -z-10'>
                <div className='absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20'></div>
                <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20'></div>
            </div>

            <motion.div variants={itemVariants} className='mb-6'>
                <span className='mx-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-[#F83002] font-semibold text-sm border border-purple-200'>
                    <Zap className='h-4 w-4' />
                    No. 1 Job Hunt Website
                </span>
            </motion.div>

            <motion.div variants={itemVariants} className='mb-8'>
                <h1 className='text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-gray-900 bg-clip-text text-transparent leading-tight'>
                    Search, Apply & <br /> Get Your <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#7C52D4] animate-pulse'>Dream Jobs</span>
                </h1>
            </motion.div>

            <motion.p 
                variants={itemVariants}
                className='text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed'
            >
                Discover exciting career opportunities and land your perfect job. Connect with top companies and showcase your skills.
            </motion.p>

            <motion.div 
                variants={itemVariants}
                className='flex flex-col items-center gap-6 mb-12'
            >
                <div className='w-full max-w-2xl group'>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#6A38C2] to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                        <div className='relative flex items-center gap-3 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-300 pl-6 pr-2 py-3'>
                            <Search className='h-5 w-5 text-gray-400' />
                            <input
                                type="text"
                                placeholder='Find your dream jobs...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                className='outline-none border-none flex-1 text-gray-700 placeholder-gray-400 bg-transparent'
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="rounded-full bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-[#7C52D4] hover:to-purple-700 text-white font-semibold px-6 py-2 transition-all duration-300"
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className='flex justify-center gap-8 text-sm text-gray-600 flex-wrap'>
                    <motion.div 
                        variants={itemVariants}
                        className='flex items-center gap-2'
                    >
                        <TrendingUp className='h-4 w-4 text-[#6A38C2]' />
                        <span><strong className='text-gray-900'>10K+</strong> Active Jobs</span>
                    </motion.div>
                    <motion.div 
                        variants={itemVariants}
                        className='flex items-center gap-2'
                    >
                        <TrendingUp className='h-4 w-4 text-[#6A38C2]' />
                        <span><strong className='text-gray-900'>5K+</strong> Companies</span>
                    </motion.div>
                    <motion.div 
                        variants={itemVariants}
                        className='flex items-center gap-2'
                    >
                        <TrendingUp className='h-4 w-4 text-[#6A38C2]' />
                        <span><strong className='text-gray-900'>50K+</strong> Success Stories</span>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default HeroSection