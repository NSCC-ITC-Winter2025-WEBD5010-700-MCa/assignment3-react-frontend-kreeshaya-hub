import { useQuery } from "@tanstack/react-query";
import AnimeTable from "../components/anime/AnimeTable";
import { Outlet, useLocation } from "react-router-dom";

const Anime = () => {

// get current location information
const location = useLocation()

console.log(location.pathname)

const { isPending , error , data } = useQuery({
  queryKey: ['AnimeData'],
  queryFn: async () => {
    const response = await fetch(`${import.meta.env.VITE_ANIME_API_URL}`)
    return response.json()
  },
  staleTime: Infinity
})

if(isPending) return <div> Loading...</div>

if(error) return <div> {`An error had occured: + ${error.message}`}</div>

return (
  <div> 
    <h1 className="text-2xl  font-bold"> Anime </h1>

    { 
      location.pathname === '/admin/anime' ? 
        isPending ? <div> Loading...</div> : <AnimeTable anime={data}/>
        : 
        <Outlet />
    }
  </div>
);
};

export default Anime;


