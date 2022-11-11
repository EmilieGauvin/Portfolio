import React, { useState, useEffect } from "react";
import Experience from "../../Experience/Experience";
import "./ProjectsPage.css";
import ImageSlider from "./ImageSlider";
import ProjectTemplate from './ProjectTemplate'
import projectsContent from "./projectsContent";



export default function ProjectsPage(props) {
  const experience = new Experience()
  const navigation = experience.navigation
  const [showContent, setShowContent] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [english, setEnglish] = useState(props.english)

  useEffect(() =>
  {
    props.onChange(english)
  }, [english])

  navigation.on('notProjectPage', () =>
  {
    setShowContent(false)
  })

  useEffect(() => {
    setShowContent(true)
  }, [])

  const handleCategory0 = () => {
    setActiveCategory(0)
    setActiveProject(0) }
  const handleCategory1 = () => setActiveCategory(1)
  const handleCategory2 = () => setActiveCategory(2)
  const handleCategory3 = () => setActiveCategory(3)
  
  const handleChangeLanguage = () => 
  {
      setEnglish(!english);
  }
  
  const changeActiveProject = (newActiveProject) => {
    setActiveProject(newActiveProject);
  }

    return (
    <div className={showContent === false ? "project-page hide" : "project-page show"}>
      <section className={activeCategory === 0 ? 'huge title project-page' : ' title project-page'}>
        <h1 className='textButton' onClick = {handleCategory0}>Projects</h1>
        <button onClick={handleChangeLanguage}>{english === true ? 'en français ?' : 'in english?'}</button>
      </section>
      <section className={activeCategory === 0 ? 'huge main' : ' main'}>
        <div className="line"></div>

        <section className='project-menu '>
          <div className={activeCategory === 0 ? 'categories huge' : 'categories'}>
            {/* <button className={activeCategory === 1 ? 'active' : ''} onClick = {handleCategory1} name='category1'> */}
              <h4 className={activeCategory === 1 ? 'active textButton' : 'textButton'} onClick = {handleCategory1} name='category1'>
                { english === true ? 'Graphics' : 'Graphismes'}</h4>
                {/* </button> */}
            {/* <button className={activeCategory === 2 ? 'active' : ''} onClick = {handleCategory2} name='category2'> */}
              <h4 className={activeCategory === 2 ? 'active textButton' : 'textButton'} onClick = {handleCategory2} name='category2'>
                { english === true ? 'Games' : 'Jeux'}</h4>
                {/* </button> */}
            {/* <button className={activeCategory === 3 ? 'active' : ''} onClick = {handleCategory3} name='category3'> */}
              <h4 className={activeCategory === 3 ? 'active textButton' : 'textButton'} onClick = {handleCategory3} name='category3'>
                { english === true ? '3d models' : 'Modèles 3D'}</h4>
              {/* </button> */}
          </div>
          {activeCategory === 0 ? <NoCategory/> : 
          activeCategory === 1 ? <Category1 english = {english} onChange={changeActiveProject} /> : 
          activeCategory === 2 ? <Category2 english = {english} onChange={changeActiveProject} /> : 
          <Category3 english = {english} onChange={changeActiveProject} />}
          {/* <div>
          {activeCategory != 0 ? <button onClick = {handleCategory0}>x</button> : ''}
          </div> */}
        </section>

        <div className={activeCategory === 0 ? 'huge line under' : ' line under'}></div>
        
        < ProjectTemplate english = {english} content = {projectsContent} activeProject = {activeProject}/>
      </section>  
    </div>
  );
}


function NoCategory()
{
    return (
      <div className='projects'>
      </div>
    )
}

function Category1(props)
{
    const [activeProject, setActiveProject] = useState(0)
    const english = props.english
    const [showContent, setShowContent] = useState(false)


    useEffect(() => {
      setShowContent(true)
    }, [])


    useEffect(() =>
    {
      props.onChange(activeProject)
    }, [activeProject])

    // const changeActiveProject = (newActiveProject) => {
    //   setActiveProject(newActiveProject);
    //   }

  const handleProject1 = () => setActiveProject(1)
  const handleProject2 = () => setActiveProject(2)
  const handleProject3 = () => setActiveProject(3)
  
    return (
      <div className={showContent === false ? "projects-thumbnails hide" : "projects-thumbnails show"}>
        <h5 className={activeProject === 1 ? 'active textButton' : ' textButton'} onClick={handleProject1}>
          <i>{english === true ? projectsContent[1].englishTitle : projectsContent[1].frenchTitle}</i>
          {/* <img src = {projectsContent[1].slides[0].url}/> */}
        </h5>
        <h5 className={activeProject === 2 ? 'active textButton' : ' textButton'} onClick={handleProject2}>
          <i>{english === true ? projectsContent[2].englishTitle : projectsContent[2].frenchTitle}</i>
          {/* <img src = {projectsContent[2].slides[0].url}/> */}
        </h5>
        <h5 className={activeProject === 3 ? 'active textButton' : ' textButton'} onClick={handleProject3}>
          <i>{english === true ? projectsContent[3].englishTitle : projectsContent[3].frenchTitle}</i>
          {/* <img src = {projectsContent[3].slides[0].url}/> */}
        </h5>
      </div>
    )
}

function Category2(props)
{
  const [activeProject, setActiveProject] = useState(0)
  const english = props.english
  const [showContent, setShowContent] = useState(false)


  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() =>
  {
    props.onChange(activeProject)
  }, [activeProject])

  // const changeActiveProject = (newActiveProject) => {
  //   setActiveProject(newActiveProject);
  //   }
  
  const handleProject4 = () => setActiveProject(4)

  return (
    <div className={showContent === false ? "projects-thumbnails hide" : "projects-thumbnails show"}>
      <h5 className={activeProject === 4 ? 'active textButton' : ' textButton'} onClick={handleProject4}>
        <i>{english === true ? projectsContent[4].englishTitle : projectsContent[4].frenchTitle}</i>
          {/* <img src = {projectsContent[4].slides[0].url}/> */}
        </h5>
        <h5 className='placeholder'>place holder</h5>
      <h5 className='placeholder'>place holder</h5>
    </div>
  )
}

function Category3(props)
{
  const [activeProject, setActiveProject] = useState(0)
  const english = props.english
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() =>
  {
    props.onChange(activeProject)
  }, [activeProject])

  const handleProject5 = () => setActiveProject(5)
  const handleProject6 = () => setActiveProject(6)

  // const changeActiveProject = (newActiveProject) => {
  //   setActiveProject(newActiveProject);
  //   }
    return (
      <div className={showContent === false ? "projects-thumbnails hide" : "projects-thumbnails show"}>
        <h5 className={activeProject === 5 ? 'active textButton' : ' textButton'} onClick={handleProject5}>
          <i>{english === true ? projectsContent[5].englishTitle : projectsContent[5].frenchTitle}</i>
          {/* <img src = {projectsContent[5].slides[0].url}/> */}
        </h5>
        <h5 className={activeProject === 6 ? 'active textButton' : ' textButton'} onClick={handleProject6}>
          <i>{english === true ? projectsContent[6].englishTitle : projectsContent[6].frenchTitle}</i>
          {/* <img src = {projectsContent[6].slides[0].url}/> */}
        </h5>
        <h5 className='placeholder'>place holder</h5>
      </div>
    )
}
