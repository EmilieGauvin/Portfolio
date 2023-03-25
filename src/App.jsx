import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Experience from './Experience/Experience'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ProjectsPage from './Pages/ProjectsPage/ProjectsPage'
import ContactPage from './Pages/ContactPage'
import Menu from './Menu/Menu'
import LoadingAnim from "./LoadingAnim/LoadingAnim";
import "./App.css";

export default function App() {

    const [loaded, setLoaded] = useState(false)
    const [endAnimation, setEndAnimation] = useState(false)
    const [english, setEnglish] = useState(true)

    const experience = useMemo(() => {
        const experience = new Experience
        return experience
    })

    useEffect(() => {
        experience.resources.on('ready', () => {
            setEndAnimation(true)
            window.setTimeout(() => {
                setLoaded(true)
            }, 500)
        })

        return () => {
            experience.navigation.off('ready', () => { })
        }
    }, [])

    useEffect(() => {
        english === true ? experience.englishTrue() : experience.englishFalse()
    }, [english])

    const changeLanguage = () => {
        setEnglish(prevState => !prevState);
    }

    return (
        <div className={loaded === false ? 'background notLoaded' : 'background loaded'}>
            <div className={endAnimation === false ? 'loadingAnim notLoaded' : 'loadingAnim loaded'}>
                {<LoadingAnim />}
                <div className='loading-text'>
                    <p>Grab the shapes and match them to the drawing</p>
                </div>
            </div>

            {loaded === true ?
                <div className='app'>
                    <Menu english={english} />
                    <Routes>
                        <Route path="*" element={<HomePage english={english} changeLanguage={changeLanguage} />} />
                        <Route path="/" element={<HomePage english={english} changeLanguage={changeLanguage} />} />
                        <Route path="about" element={<AboutPage english={english} changeLanguage={changeLanguage} />} />
                        <Route path="projects" element={<ProjectsPage english={english} changeLanguage={changeLanguage} />} />
                        <Route path="contact" element={<ContactPage english={english} changeLanguage={changeLanguage} />} />
                    </Routes>
                </div>
                : <div className='app'></div>
            }

        </div>
    );
}

