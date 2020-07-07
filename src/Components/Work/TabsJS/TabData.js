
import React, {useState } from 'react';
import ReactDOM from 'react-dom' ;

import { useForm } from 'react-hook-form';


import {priceTags} from 'react-icons-kit/icomoon/priceTags';
import './TabData.css'

export default function TabData() {
    const { register, handleSubmit, errors } = useForm();
    const [fields, setFields] = useState([]);
   const onSubmit = data => console.log(data);
   console.log(errors);
  
   
  
    const addField = () =>
      setFields(fields => {
        // DON'T USE [...spread] to clone the array because it will bring back deleted elements!
        const outputState = fields.slice(0);
        outputState.push('');
        return outputState;
      });
  
    const removeField = idx =>
      setFields(fields => {
        const outputState = fields.slice(0);
        // `delete` removes the element while preserving the indexes.
        delete outputState[idx];
        return outputState;
      });


   
        return (
            
                <div className="container">
                  
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="areaA">
              <label>Titulo </label>
              <input type="text" placeholder="Educast- grava, edita e publica " name="Titulo" ref={register({required: true, min: 5, maxLength: 40})} />
              <label>Subtitulo </label>
              <input type="text" placeholder="Grave as suas aulas com o Educast " name="Subtitulo" ref={register({required: true, max: 40, min: 5, maxLength: 100})} />
              <label>Local </label>
              <input type="text" placeholder="Laboratório Nacional de Quarentena " name="Local" ref={register({required: true, maxLength: 40})} />
              <label>Data </label>
              <input type="datetime" placeholder="13 de Agosto " name="Data" ref={register({required: true})} />
              
              </div> 
              
              <div className="areaB">
              <label>Descrição</label>
              <textarea name="Descrição" placeholder="Descrição" ref={register({required: true, min: 20, maxLength: 400})} />
             
              <label>Tags</label>
              <button type="button" onClick={addField}>
                     + Add tag
              </button>
           
         <div className="tagstyle">
          {fields.map((field, idx) => (
        <div   key={idx}>
          <div className= "tenta">
          <input type="text" className="tag" placeholder="Tags" name="Tag" ref={register({required: false, min: 1, maxLength: 20})} name={`fieldName[${idx}]`} />
          <button type="delete" className= "delete" onClick={() => removeField(idx)}>
          <label className="x">x</label>
          </button>
          </div>
          </div>
          
         
      ))}
      
      </div>
      </div>
              <button type="submit">Salvar </button> 

              </form>
              </div>
             
            
              );
              
      }
