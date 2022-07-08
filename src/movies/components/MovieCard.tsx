import React, {useState } from "react"
import { StarRating, Button } from 'shared/components';

import { getAvgRating } from 'movies/ratings';
import { Movie } from 'types';
import { useMovies } from './MovieProvider';

interface MovieCardProps {
    movie: Movie,
}


interface RatingProps{
   onRate: (rating: number) => void
    rating:number
}




export const MovieCard = ({ movie }: MovieCardProps) => {
    const {movies, moviesDispatch } = useMovies();

    // TODO: implement required functionality
    const [totalRating, setTotalRating] = useState(getAvgRating(movie))
    

   const handleRate = (index: number) =>{
     console.log("update rating");
     moviesDispatch({
        type: 'rate',
        payload: {
            movieId: movie.id,
            rating: index
        }
     });

     //recalculate the change made on the click event on the star
     const currentMovie = movies.filter(movieStack => movieStack.id == movie.id);
     if(Array.isArray(currentMovie) && currentMovie.length>0){
       setTotalRating(getAvgRating(currentMovie[0]))
     }


     //dispatch resort

     
    
   }
   

  
   const deleteHandler =  (id:string) => {
       //e.preventDefault();
       moviesDispatch({
            type: 'delete',
            payload: {
                movieId: id,
            }
        });
    }
    const movieId = `movie-item-${movie.id}`;
    return (
        <div data-testid={movieId} >
            {/* TODO: Display image */}
            <img className="card-img-top" alt="" src={movie.imageUrl} />
            <div className="card-body">
                <h4 className="card-title">
                    {movie.title}
                </h4>
                {/* TODO: Display subtitle */}
                <h6 className="card-subtitle mb-2 text-muted">{movie.subtitle}</h6>
                <p className="text-justify" style={{ fontSize: '14px' }}>
                  {movie.description}
                </p>
                {/* TODO: Implement delete functionality */}
                <Button  onClick={()=> deleteHandler(movie.id) }>Delete</Button>
            </div>
            <div className="card-footer">
                <div className="clearfix">
                <div className="float-left mt-1">
                    {/* TODO: Display stars */}
                  
                    <StarRating rating={totalRating} onRate={(index) => handleRate(index)} />
                  
                   
    
                </div>
                {/* TODO: Display rating value */}
                <div className="card-footer-badge float-right badge badge-primary badge-pill movie-rating" title="movie-rating"  data-testid="movie-rating"> {totalRating}</div>
                </div>
            </div>
        </div>    
    )
};
