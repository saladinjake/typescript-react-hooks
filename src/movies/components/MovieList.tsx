import React, { useState } from 'react';

import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies, MovieProvider } from './MovieProvider';

import { getMovies } from "../../api/movies"
type NewMovieMode = "BUTTON" | "FORM"


export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState('button');

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
   imageUrl:"",
   title:"",
   subtitle:"",
   description:""
  });


  function isEmpty(value:string):boolean{
     if(value.length<=0 || !value) return true
     return false
   }

   function isImage(url: string): boolean {
     return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
   }
   const validation = (data:Record< "imageUrl" | "title" | "subtitle" | "description", string>) : boolean => {
     let isValid = true;
     if(!isImage(data.imageUrl)){
       isValid = false;
     }else if(isEmpty(data.title) || isEmpty(data.subtitle)|| isEmpty(data.description)){
       isValid= false;
     }
     return isValid;

   }

  
  // TODO: Display list of movies
  const handleSubmit = (data:Record< "imageUrl" | "title" | "subtitle" | "description", string>) => {
     
    

     // if(validation(data)){
        //do dispatch
        moviesDispatch({
          type:"add",
          payload:{
            movie: data
          }
        });
      //}


  }
  
  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>      
      ))}
      <Card>
        {/* TODO: Implement displaying appropriate card for add movie - button or form */}
        {!showForm && (<AddMovieButton onClick={()=>{ 
           setShowForm(true)}}/>)}
        {/* TODO: use AddMovieButton and AddMovieForm */}
        {showForm && (<AddMovieForm 
             onSubmit={(formData) => handleSubmit(formData)} 
             onCancel={()=>{setShowForm(false)}}/>
        )}
      </Card>
    </div>
  );
}
