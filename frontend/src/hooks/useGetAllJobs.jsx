import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                console.log("=== useGetAllJobs Hook ===");
                console.log("Searched query from Redux:", searchedQuery);
                console.log("API URL:", `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`);
                
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                console.log("API Response:", res.data);
                console.log("Jobs received:", res.data.jobs?.length || 0);
                
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("=== useGetAllJobs Error ===");
                console.log("Error:", error);
            }
        }
        fetchAllJobs();
    },[searchedQuery])
}
export default useGetAllJobs