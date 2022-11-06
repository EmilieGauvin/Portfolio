import React, { useState, useEffect } from "react";
import Experience from './Experience/Experience'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ProjectsPage from './Pages/ProjectsPage/ProjectsPage'
import ContactPage from './Pages/ContactPage'
import Menu from './Menu/Menu'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

export default function App() {

    const experience = new Experience()
    const resources = experience.resources
    const [loaded, setLoaded] = useState(false)
    const [endAnimation, setEndAnimation] = useState(false)
    const [english, setEnglish] = useState(true)
    // const handleClick1 = () => {
    //     experience.color1()
    // }
    // const handleClick2 = () => {
    //     experience.color2()
    // }
    // const handleClick3 = () => {
    //     experience.color3()
    // }
    // const handleClick4 = () => {
    //     experience.color4()
    // }
    // const handleClick5 = () => {
    //     experience.color5()
    // }
    // const handleClick6 = () => {
    //     experience.color6()
    // }

    useEffect(() => {
        resources.on('ready', () => {
            setEndAnimation(true) 
            window.setTimeout(() =>
            {
                setLoaded(true)  
            }, 500)
            console.log(loaded)
        })
    }, [resources])

    useEffect(() => {
        english === true ? experience.englishTrue() : experience.englishFalse()
    }, [english])

    const changeEnglish = (newEnglish) => {
        setEnglish(newEnglish);
        console.log(english)
      }

    return (
        <div className={loaded === false ? 'app. background notLoaded' : 'app. background loaded'}>
            <div className={endAnimation === false ? 'cubeContainer notLoaded' : 'cubeContainer loaded'}>
                <div className="cubeMover">
                    <div className="cursor">
                        <img src="../static/textures/cursor-01.png" />
                    </div>
                    <div className="cube">
                        <div className="face left"></div>
                        <div className="face right"></div>
                        <div className="face top"></div>
                    </div>
                </div>
                <div className="hole">
                    <div className="face bottom"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
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

