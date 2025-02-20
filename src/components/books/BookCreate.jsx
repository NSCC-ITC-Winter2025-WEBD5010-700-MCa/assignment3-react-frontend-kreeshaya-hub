import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

function BookCreate() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const collectData = (data) => {
        console.log(data)
        createBookMutation.mutate(data)
    }

    const createBookMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['booksData']),
                navigate('/admin/books')
        }
    })

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Book</h2>
        <form onSubmit={handleSubmit(collectData)} className="space-y-4">
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
                Create Book
            </button>
        </form>
    </div>
)
}

export default BookCreate;
