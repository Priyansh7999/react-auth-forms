import React, { useEffect, useState } from 'react'

export default function useFetch(method, url, body) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                setIsLoading(true)
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const result = await response.json()
                setData(result)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
    },[url, method, body])

  return {
    data,
    error,
    isLoading
  }
}
