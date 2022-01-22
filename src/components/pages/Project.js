import React, { useEffect, useState } from "react";
import styles from "../pages/Project.module.css";
import { useParams } from "react-router-dom";
import Loading from '../layout/Loading'
import Container from '../layout/Container'

function Project() {
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    setTimeout(()=>{
        fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
      })
      .catch((err) => console.log(err));
    }, 500)
  }, [id]);

function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
}

  return (
  <>
  {project.name ? (
    <div className={styles.project_details}>
        <Container className='column'>
            <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ?
                'Editar Projeto' : 'Fechar'}</button>
                {!showProjectForm ? (
                    <div className={styles.project_info}>
                        <p>
                            <span>Categoria</span> {project.category.name}
                        </p>
                        <p>
                            <span>Total de orçamento</span> R${project.budget}
                        </p>
                        <p>
                            <span>Total utilizado</span> R${project.cost}
                        </p>
                    </div >
                    ) : (
                        <div className={styles.project_info}>
                            <p>Form</p>
                        </div>
                    )}
            </div>
        </Container>
    </div>
    ) : ( 
        <Loading />)}
        </>
  )}
export default Project;
