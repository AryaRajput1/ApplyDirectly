import { useSession, useUser } from "@clerk/clerk-react"
import { useState } from 'react'

export const useFetch = (callback, options= {})=>{
    const { session } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const token = await session?.getToken({
              template: "supabase",
            })
        
            const response = await callback(token, options, ...args)
            setData(response)
            setError(null)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return { fn, data, loading, error} 
}


