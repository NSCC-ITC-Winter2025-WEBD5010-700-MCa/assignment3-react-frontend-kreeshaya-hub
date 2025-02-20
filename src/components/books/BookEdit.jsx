import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

function BookEdit () {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const { isPending, error, data } = useQuery({
        queryKey: ['books', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/books/${id}`)
            return response.json()
        }
    })

    useEffect(() => {
        console.log(data)
        // pre-populate the form
        if (data) {
            setValue('title', data.title)
            setValue('author', data.author)
            setValue('published_year', data.published_year)
            setValue('genre', data.genre)
        }
    }, [data])

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Book - Id: {data?.id}</h2>
            <form className="space-y-4">
                <div>
                    <input
                        {...register('title', { required: 'Title is required!' })}
                        type="text"
                        placeholder="Title"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <input
                        {...register('author', { required: 'Author is required!' })}
                        type="text"
                        placeholder="Author"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <input
                        {...register('published_year', { required: 'Year is required!', min: { value: 1700, message: 'Year must be greater than 1700' }})}
                        type="number"
                        placeholder="Year"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.published_year && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <input
                        {...register('genre', { required: 'Genre is required!' })}
                        type="text"
                        placeholder="Genre"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                >
                    Submit Changes
                </button>
            </form>
        </div>
    )
}

export default BookEdit