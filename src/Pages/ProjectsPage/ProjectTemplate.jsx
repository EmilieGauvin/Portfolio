import React, { useState, useEffect } from "react";
// import Experience from "../../Experience/Experience";
import "./ProjectsPage.css";
import ImageSlider from "./ImageSlider";

export default function ProjectTemplate(props)
{
  const content = props.content
  const activeProject = props.activeProject
  const english = props.english
  const [activeProjectCopy, setActiveProjectCopy] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(false)
      window.setTimeout(() =>
      {
        setActiveProjectCopy(activeProject)
        activeProject === 0 ? setShowContent(false) : setShowContent(true);
      }, 200)
    
    let div = document.getElementById("top")
    div.scrollTop = 0;
  }, [activeProject]);

return (
  <section id="top" className={showContent === false ? 'project hide' : 'project show'}>
    <div className='text'>
      <h4 className='project-title'>{english === true ? content[activeProjectCopy].englishTitle : content[activeProjectCopy].frenchTitle}</h4>
      <a className='textButton' href={content[activeProjectCopy].link} target="_blank"><i>{activeProjectCopy === 0 ? "" : english === true ? 'visit webpage' : 'visiter site'}</i></a>
      
      {english === true ? content[activeProjectCopy].englishText : content[activeProjectCopy].frenchText}
    </div>
    <div className='image'>
      <div className='imageSlider'>
      {activeProjectCopy === 0 ? "" :<ImageSlider slides={content[activeProjectCopy].slides} />}
      </div>
    </div>
  </section>
)}
