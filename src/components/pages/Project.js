import {parse, v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from "react";
import styles from "../pages/Project.module.css";
import { useParams } from "react-router-dom";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";

function Project() {
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
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
    }, 500);
  }, [id]);

  function editPost(project) {
    setMessage("");

    //budget validation
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado");
        setType("sucess");
      })
      .catch((err) => console.log(err));
  }

  function createService(project){
    setMessage('')
    // last service
    const lastService = project.services[project.services.length - 1] //Pegando o ultimo
    
    lastService.id = uuidv4()
   
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
   
    //maximum value validation
    if(newCost > parseFloat(project.budget)){
      setMessage("Orçamento ultrapassado, verifique o valor do serviço")
      setType('error')
      project.services.pop()
      return false
    }
     //Add service cost to project total cost
     project.cost = newCost
     //update project
     fetch(`http://localhost:5000/projects/${project.id}`,{
       method: 'PATCH',
       headers: {
         'Contnt-Type': 'application/json'
       },
       body: JSON.stringify(project)
     })
     .then((resp)=> resp.json())
     .then((data)=>{
       console.log(data)
     }).catch((err)=> console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container className="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
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
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concuir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h1>Adicione um serviço</h1>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" :
                "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm 
                  handleSubmit={createService}
                  btnText="Adicionar serviço"
                  projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviço</h2>
            <Container customClass="start">
                <p>Itens de serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Project;
