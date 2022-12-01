import React, { useState, useEffect } from "react";
import Experience from './Experience/Experience'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ProjectsPage from './Pages/ProjectsPage/ProjectsPage'
import ContactPage from './Pages/ContactPage'
import Menu from './Menu/Menu'
import LoadingAnim from "./LoadingAnim/LoadingAnim";
import { Routes, Route} from "react-router-dom";
import "./App.css";

export default function App() {

    const experience = new Experience()
    const resources = experience.resources
    const [loaded, setLoaded] = useState(false)
    const [endAnimation, setEndAnimation] = useState(false)
    const [english, setEnglish] = useState(true)
    

    useEffect(() => {
        resources.on('ready', () => {
            setEndAnimation(true) 
            window.setTimeout(() => {
                setLoaded(true)  
            }, 500)
        })
    }, [resources])

    useEffect(() => {
        english === true ? experience.englishTrue() : experience.englishFalse()
    }, [english])

    const changeEnglish = (newEnglish) => {
        setEnglish(newEnglish);
      }

    return (
        <div className={loaded === false ? 'background notLoaded' : 'background loaded'}>
            <div className={endAnimation === false ? 'loadingAnim notLoaded' : 'loadingAnim loaded'}>
                {<LoadingAnim />}
                <div className='loading-text'> 
                    <p><i>Grab the shapes and match them to the drawing</i></p>
                </div>
            </div>

            {loaded === true ? 
                <div className='app'>
                    <Menu english={english}/>
                    <Routes>
                    <Route path="*" element={<HomePage english={english} onChange={changeEnglish}/>} />
                        <Route path="/" element={<HomePage english={english} onChange={changeEnglish}/>} />
                        <Route path="about" element={<AboutPage english={english} onChange={changeEnglish}/>} />
                        <Route path="projects" element={<ProjectsPage english={english} onChange={changeEnglish}/>} />
                        <Route path="contact" element={<ContactPage english={english} onChange={changeEnglish}/>} />
                    </Routes>
                </div>
                : <div className='app'></div>
            }
            
        </div>
    );
}

