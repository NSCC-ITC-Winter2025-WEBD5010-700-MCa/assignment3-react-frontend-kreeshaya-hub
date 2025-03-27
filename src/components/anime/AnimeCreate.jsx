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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
    
            if (!response.ok) {
                throw new Error(`Failed to add anime: ${response.statusText}`)
            }
    
            const result = await response.json()
    
    
            console.log('Formatted Characters:', result.characters)  // Verify the format
            return result
        },
        onSuccess: () => {
            window.alert('Anime added successfully!')
            queryClient.invalidateQueries(['animeData'])
            navigate('/admin/anime')
        },
        onError: (error) => {
            console.error('Error adding anime:', error)
            window.alert('Failed to add anime!')
        }
    })
    

    const processData = (data) => {
        data.characters = data.characters.split(',').map(c => c.trim())  
        data.genre = data.genre.split(',').map(g => g.trim())
        createAnimeMutation.mutate(data)
    }    


    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Anime</h2>
            <AnimeForm onDataCollected={processData} />
        </div>
    )
}