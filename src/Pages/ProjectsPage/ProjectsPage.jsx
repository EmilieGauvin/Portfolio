import React, { useState, useEffect } from "react";
import Experience from "../../Experience/Experience";
import "./ProjectsPage.css";
import ProjectTemplate from './ProjectTemplate'
import projectsContent from "./projectsContent";

export default function ProjectsPage(props) {
  const experience = new Experience()
  const navigation = experience.navigation
  const [showContent, setShowContent] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [english, setEnglish] = useState(props.english)

  useEffect(() => {
    props.onChange(english)
  }, [english])

  useEffect(() => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;
    activeProject === 0 ? experience.parallaxEnabled() : experience.parallaxDisabled()
  }, [activeProject])

  navigation.on('notProjectPage', () => {
    setShowContent(false)
  })

  useEffect(() => {
    setShowContent(true)
  }, [])

  const handleCategory0 = () => {
    //     document.querySelector(".project").style.visibility = `hidden`
    //     document.querySelector(".imageSlider").style.visibility = `hidden`
    // console.log(document.querySelector(".project"))
    setActiveCategory(0)
    setActiveProject(0)

  }
  const handleCategory1 = () => {
    setActiveCategory(1)
// document.querySelector(".project").style.visibility = `visible`
// document.querySelector(".imageSlider").style.visibility = `visible`
  }
  const handleCategory2 = () => {
    setActiveCategory(2)
// document.querySelector(".project").style.visibility = `visible`
// document.querySelector(".imageSlider").style.visibility = `visible`
  }
  const handleCategory3 = () => {
    setActiveCategory(3)
    // document.querySelector(".project").style.visibility = `visible`
    // document.querySelector(".imageSlider").style.visibility = `visible`
  }

  const handleChangeLanguage = () => {
    setEnglish(!english);
  }

  const changeActiveProject = (newActiveProject) => {
    setActiveProject(newActiveProject);
  }

  return (
    <div className={showContent === false ? "project-page hide" : "project-page show"}>
      <section className={activeCategory === 0 ? 'huge title project-page' : ' title project-page'}>
        <h1 className='textButton' onClick={handleCategory0}>{english === true ? 'Projects' : 'Projets'}</h1>
        <button onClick={handleChangeLanguage}>{english === true ? 'en français ?' : 'in english?'}</button>
      </section>
      <section className={activeCategory === 0 ? 'huge main' : ' main'}>
        <div className="line"></div>

        <section className={activeCategory === 0 ? 'project-menu huge' : 'project-menu'}>
          <div className={activeCategory === 0 ? 'categories huge' : 'categories'}>
            <h4 className={activeCategory === 1 ? 'active textButton' : 'textButton'} onClick={handleCategory1} name='category1'>
              {english === true ? 'Graphics' : 'Graphismes'}</h4>
            <h4 className={activeCategory === 2 ? 'active textButton' : 'textButton'} onClick={handleCategory2} name='category2'>
              {english === true ? 'Games' : 'Jeux'}</h4>
            <h4 className={activeCategory === 3 ? 'active textButton' : 'textButton'} onClick={handleCategory3} name='category3'>
              {english === true ? '3d models' : 'Modèles 3D'}</h4>
          </div>
            {activeCategory === 0 ? <NoCategory /> 
            : activeCategory === 1 ? <Category1 english={english} onChange={changeActiveProject} /> 
            : activeCategory === 2 ? <Category2 english={english} onChange={changeActiveProject} /> 
            : <Category3 english={english} onChange={changeActiveProject} />}
        </section>

        <div className={activeCategory === 0 ? 'huge line under' : ' line under'}></div>

        < ProjectTemplate english={english} content={projectsContent} activeProject={activeProject}  />
      </section>
    </div>
  );
}


function NoCategory() {
  return (
    <div className='no-projects-thumbnails'>
    </div>
  )
}

function Category1(props) {
  const [activeProject, setActiveProject] = useState(0)
  const english = props.english
  const [showContent, setShowContent] = useState(false)


  useEffect(() => {
    setShowContent(true)
  }, [])

-
  useEffect(() => {
    props.onChange(activeProject)
  }, [activeProject])

  return (
    <div className={showContent === false ? "projects-thumbnails hide" : "projects-thumbnails show"}>
      <h5 className={activeProject === 1 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(1)}>
        <i>{english === true ? projectsContent[1].englishTitle : projectsContent[1].frenchTitle}</i>
      </h5>
      <h5 className={activeProject === 2 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(2)}>
        <i>{english === true ? projectsContent[2].englishTitle : projectsContent[2].frenchTitle}</i>
      </h5>
      <h5 className={activeProject === 3 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(3)}>
        <i>{english === true ? projectsContent[3].englishTitle : projectsContent[3].frenchTitle}</i>
      </h5>
    </div>
  )
}

function Category2(props) {
  const [activeProject, setActiveProject] = useState(0)
  const english = props.english
  const [showContent, setShowContent] = useState(false)


  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    props.onChange(activeProject)
  }, [activeProject])

  return (
    <div className={showContent === false ? "projects-thumbnails hide" : "projects-thumbnails show"}>
      <h5 className={activeProject === 4 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(4)}>
        <i>{english === true ? projectsContent[4].englishTitle : projectsContent[4].frenchTitle}</i>
      </h5>
      <h5 className={activeProject === 8 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(8)}>
        <i>{english === true ? projectsContent[8].englishTitle : projectsContent[8].frenchTitle}</i>
      </h5>
      <h5 className={activeProject === 9 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(9)}>
        <i>{english === true ? projectsContent[9].englishTitle : projectsContent[9].frenchTitle}</i>
      </h5>
      {/* <h5 className='placeholder'>place holder</h5> */}
    </div>
  )
}

function Category3(props) {
  const [activeProject, setActiveProject] = useState(0)
  const english = props.english
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    props.onChange(activeProject)
  }, [activeProject])

  return (
    <div className={showContent === false ? "projects-thumbnails hide" : "projects-thumbnails show"}>
      <h5 className={activeProject === 5 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(5)}>
        <i>{english === true ? projectsContent[5].englishTitle : projectsContent[5].frenchTitle}</i>
      </h5>
      <h5 className={activeProject === 6 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(6)}>
        <i>{english === true ? projectsContent[6].englishTitle : projectsContent[6].frenchTitle}</i>
      </h5>
      <h5 className={activeProject === 7 ? 'active textButton' : ' textButton'} onClick={() => setActiveProject(7)}>
        <i>{english === true ? projectsContent[7].englishTitle : projectsContent[7].frenchTitle}</i>
      </h5>
    </div>
  )
}
