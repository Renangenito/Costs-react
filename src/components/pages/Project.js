import React, { useEffect, useState } from 'react';
// import styles from '../pages/Project.module.css';
import { useParams } from 'react-router-dom'

function Project(){
const [project, setProject] = useState([])

    const { id } = useParams()
   
    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },    
        }).then((resp) => resp.json())
        .then((data)=>{
            setProject(data)
        })
        .catch((err) => console.log(err))  
    }, [id])

    return(
        <p>{project.name}</p>
    )
}
export default Project;