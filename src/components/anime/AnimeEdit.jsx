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
            return response.json()
        }
    })

    const editAnimeMutation = useMutation({
        mutationFn: async (data) => { 
            const respone = await fetch(`${import.meta.env.VITE_ANIME_API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: Json.stringify(data)
             })

             return respone.json()
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries(['animeData'])
            navigate('/admin/anime')
        }
    })

    const processData = (data) => { 
        editAnimeMutation.mutate(data)
    }
    

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Anime - Id: {data?.id}</h2>
            <AnimeForm onDataCollected = {processData} initialData={data}/>
        </div>
    )
}
