import { useMutation , useQueryClient} from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function AnimeTable({ anime }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const deleteAnimeMutation = useMutation({
  mutationFn: async (animeId) => {
    const response = await fetch(`${import.meta.env.VITE_ANIME_API_URL}/${animeId}`, {
      method: 'DELETE'

    })
    return response.json()
  },

  onSuccess: () => {
    queryClient.invalidateQueries(["anime"]);
  },
  onError: (error) => {
    alert('Unable to delete')
  }
  })

const handleDelete = (animeId) => {
  // send a delete request to the api to delete the chosen or seleted record 

  if(window.confirm(`Are you sure you wish to delete record ${animeId}`)){
    deleteAnimeMutation.mutate(animeId)
  }
}
        return (
          <>
          <p> <Link to= "/admin/anime/create"> Add New Anime </Link>  </p>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Characters</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Ratings</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {anime.map((anime) => (
                  <tr key={anime.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{anime.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{anime.author}</td>
                    <td className="border border-gray-300 px-4 py-2">{anime.published_year}</td>
                    <td className="border border-gray-300 px-4 py-2">{anime.genre}</td>
                    <td className="border border-gray-300 px-4 py-2">{anime.characters.join(', ')}</td>
                    <td className="border border-gray-300 px-4 py-2">{anime.ratings.critics}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                      <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                      <button onClick={ () => {navigate(`${anime.id}/edit`)}} className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                      <button onClick={ () => {handleDelete (anime.id)}} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
          );
        }
        
export default AnimeTable;
        