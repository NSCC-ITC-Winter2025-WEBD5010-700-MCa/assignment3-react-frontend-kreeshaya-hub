import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import BookForm from './BookForm'

function BookEdit () {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['books', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${id}`)
            return response.json()
        }
    })

    const editBookMutation = useMutation({
        mutationFn: async (data) => { 
            const respone = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: Json.stringify(data)
             })

             return respone.json()
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries(['booksData'])
            navigate('/admin/books')
        }
    })

    const processData = (data) => { 
        editBookMutation.mutate(data)
    }
    

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Book - Id: {data?.id}</h2>
            <BookForm onDataCollected = {processData} initialData={data}/>
        </div>
    )
}

export default BookEdit