import React, { useReducer, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { Movie, MoviesAction } from 'types';
import { getMovies } from 'api/movies';
import  { getAvgRating  } from "./ratings"

interface MoviesState {
  movies: Movie[]
  initialized: boolean
}

export function useMoviesCollection(): [MoviesState, React.Dispatch<MoviesAction>] {
  // TODO: Implement all action processing
  

  const movieReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
    switch (action.type) {
      case 'fetch':
       console.log(action)
        let data = action.payload;
        let jointData =[ ];
        return {movies: [...action.payload.data], initialized:true };

      case 'add':
        const newMovie = {
        ...action.payload.movie,
        id: uuid(),
        ratings:  []
        } 
        let allMovies = [...state.movies,newMovie];
        console.log(allMovies);
        return { movies:allMovies, initialized:true };

      case 'delete':
      console.log("delete called"+ action.payload.movieId)
        const filter = state.movies.filter(item=> item.id!==action.payload.movieId)
        console.log(filter)
        return { movies:filter,initialized: state.initialized };

      case 'rate':
        console.log(action.payload);
        const updateMovie = state.movies.filter(item=> item.id ==action.payload.movieId);

        if(Array.isArray(updateMovie) && updateMovie.length>0){
          console.log("we are here");
          let tempRatings = updateMovie[0].ratings;
           tempRatings = [...tempRatings,action.payload.rating];
          updateMovie[0].ratings = tempRatings;
          console.log(updateMovie[0])
          let filteredMovies = state.movies.filter(item=> item.id!==action.payload.movieId);
          filteredMovies = [...filteredMovies, updateMovie[0]];
          return {movies:filteredMovies,initialized: state.initialized  };

        }else{
          return { ...state}
        }
        


        
      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

   async function  loadData(){
      let response = await getMovies();
      //console.log(response);
      dispatch({
        type: 'fetch',
        payload: {
          data: [...response]
        }
      })
    }


  const handleDebounce = (func: Function, delay:number=10000) =>{
    //let timeout = null;
    //return () => {
       
       //if(timeout)clearTimeout(timeout);
       //timeout = setTimeout(()=>{
        //  func();
       //},delay)
    //}
  }

  //const handleExpensiveCall = useCallback(handleDebounce(loadData, 10000),[]);
  //handleExpensiveCall();


  

  useEffect(() => {
    // TODO: Call fetch action
   
    loadData()

    //console.log(state)
    
  }, []);



  return [state, dispatch];
}
