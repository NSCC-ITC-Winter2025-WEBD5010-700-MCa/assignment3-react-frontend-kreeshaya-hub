import { use, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import BookForm from './BookForm'

function BookEdit () {
    const { id } = useParams()
    const { handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['books', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/books/${id}`)
            return response.json()
        }
    })

    const editBookMutation = useMutation({
        mutationFn: async (data) => { 
            const respone = await fetch(`http://localhost:3000/books/${id}`, {
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

    useEffect(() => {
        console.log(data)
        // pre-populate the form
        // if (data) {
        //     setValue('title', data.title)
        //     setValue('author', data.author)
        //     setValue('published_year', data.published_year)
        //     setValue('genre', data.genre)
        // }
    }, [data])

    const processData = (data) => { 
        console.log(data)
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