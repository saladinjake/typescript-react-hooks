import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';
import { MoviesAction } from 'types';
import { useMovies } from './MovieProvider';
interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void,
}


export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  // TODO: Implement form for adding a movie

  const [imageUrl, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle,setSubTitle] = useState("");
  const [description, setDesc] = useState("");
  const [formData, setFormData] = useState({
   imageUrl:"",
   title:"",
   subtitle:"",
   description:""
  })


  
   const handleSubmit =(formData:Record< "imageUrl" | "title" | "subtitle" | "description", string>) =>{
      //test validation before calling the submit handler

      const data:Record< "imageUrl" | "title" | "subtitle" | "description", string> ={
        //id: ""+ (Math.floor(Math.random()*20 ) + new Date().getTime()),
        imageUrl,
        title,
        subtitle,
        description,
        
      }


      console.log(data);
      onSubmit(data);

      setUrl("");
      setTitle("");
      setSubTitle("");
      setDesc("");
   }




  
   const handleCancel = () =>{
     onCancel();
     //window.location.reload();
   }
  return (
    <form className="p-4 ">
      <h2>Add Movie</h2>
      {/* TODO: Add code to make form actions work */}
      <InputField name="Url" value={imageUrl || ''} setter={setUrl} />
      <InputField name="Title" value={title || ''} setter={setTitle}/>
      <InputField name="Subtitle" value={subtitle || ''} setter={setSubTitle}/>
      <InputField name="Description"  value={description || ""} setter={setDesc}/>
      <div className="text-center">
      <Button onClick={() => {handleSubmit(formData)}}>
        Submit
      </Button>
      <Button onClick={() => {handleCancel()}}>
        Cancel
      </Button>
      </div>
    </form>
  );
}
