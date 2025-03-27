import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnimeForm from './AnimeForm'

export default function AnimeEdit () {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['anime', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_ANIME_API_URL}/${id}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch anime: ${response.statusText}`) 
            }
            return response.json()
        }
    })

    const editAnimeMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_ANIME_API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
    
            console.log('Response Status:', response.status)
    
            if (!response.ok) {
                const errorMsg = await response.text()  
                throw new Error(`Failed: ${response.status} - ${errorMsg}`)
            }
    
            return response.json()  
        },
        onSuccess: () => {
            window.alert('Anime updated successfully!')
            queryClient.invalidateQueries(['animeData'])
            navigate('/admin/anime')
        },
        onError: (error) => {
            console.error('Failed to update:', error.message)
            alert('Failed to update anime. Check the console for details.')
        }
    })
    
    const processData = (data) => {
        console.log('Form Data:', data)
        editAnimeMutation.mutate(data)
    }
    
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Anime - {data?.title}</h2>
            <AnimeForm onDataCollected = {processData} initialData={data}/>
        </div>
    )
}
