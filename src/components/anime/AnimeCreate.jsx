import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import AnimeForm from './AnimeForm'

export default function AnimeCreate() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const createAnimeMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_ANIME_API_URL}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['animeData']),
                navigate('/admin/anime')
        }
    })

    const processData = (data) => {
        createAnimeMutation.mutate(data)
    }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Anime</h2>
       <AnimeForm onDataCollected = {processData}/>
    </div>
)
}