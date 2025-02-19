import { useForm } from 'react-hook-form';
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

function BookCreate() {

const { handleSubmit, register, formState: {errors} } = useForm()
const queryClient = useQueryClient();
const navigate = useNavigate();

 const createBookMutation =  useMutation({ 
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booksData"]);
      navigate('/admin/books')
    },
    onError: (error) => {
      alert('Unable to create book')
    }
  })

  return (
    <div>
      <h2>Create New Book</h2>
      <form onSubmit={handleSubmit((createBookMutation.mutate))}>
      
        <input {...register('title', { required: 'Title is required! '})} type="text" placeholder="Title"/>
        <input {...register('author', { required: 'Author is required! '})}type="text" placeholder="Author"/>
        <input {...register('published_year', { required: 'Published year is required! '})}type="number" placeholder="Year"/>
        <input {...register('genre', { required: 'Genre is required! '})}type="text" placeholder="Genre"/>
        <button type="submit"> Create Book </button>
      </form>

    </div>
  )
}

export default BookCreate;
