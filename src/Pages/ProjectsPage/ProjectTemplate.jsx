import React, { useState, useEffect } from "react";
// import Experience from "../../Experience/Experience";
import "./ProjectsPage.css";
import ImageSlider from "./ImageSlider";

export default function ProjectTemplate(props)
{
  const content = props.content
  const activeProject = props.activeProject
  const english = props.english

return (
  <section className={activeProject === 0? 'hidden project' : 'project'}>
    <div className='image'>
      <div className='imageSlider'>
      {activeProject === 0 ? "" :<ImageSlider slides={content[activeProject].slides} />}
      </div>
    </div>
    <div className='text'>
      <h4>{english === true ? content[activeProject].englishTitle : content[activeProject].frenchTitle}</h4>
      <a className='textButton' href={content[activeProject].link} target="_blank"><i>{activeProject === 0 ? "" : english === true ? 'visit webpage' : 'visiter site'}</i></a>
      
      {english === true ? content[activeProject].englishText : content[activeProject].frenchText}
    </div>
  </section>
)}
