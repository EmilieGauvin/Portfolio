import * as React from "react";
import { useEffect, useState } from "react";
import Experience from '../Experience/Experience'
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "./Menu.css";

export default function Menu(props) {
    let location = useLocation()
    const navigate = useNavigate()
    const experience = new Experience()
    const navigation = experience.navigation
    const [onHomePage, setOnHomePage] = useState(false)
    const [onAboutPage, setOnAboutPage] = useState(false)
    const [onProjectPage, setOnProjectPage] = useState(false)
    const [onContactPage, setOnContactPage] = useState(false)
    const [deployMenu, setDeployMenu] = useState(false)
    const [lightText, setLightText] = useState(false)
    const english = props.english
    
    useEffect(() => {
        if (location.pathname != '/' && location.pathname != '/about' && location.pathname != '/projects' && location.pathname != '/contact')
        location.pathname ='/'
        
        if (location.pathname === '/'&& onHomePage === false) 
        {
            setOnHomePage(true)
                setOnAboutPage(false)
                setOnProjectPage(false)
                setOnContactPage(false)
            navigation.homePage()
            navigate('/')
        }
            
        if (location.pathname === '/about' && onAboutPage === false) 
        {
            setOnAboutPage(true)
                setOnHomePage(false)
                setOnProjectPage(false)
                setOnContactPage(false)
            setLightText(true)
            navigation.aboutPage()
            navigate('/about')
        }

        if (location.pathname === '/projects'&& onProjectPage === false) 
        {
            setOnProjectPage(true)
                setOnHomePage(false)
                setOnAboutPage(false)
                setOnContactPage(false)
            navigation.projectPage()
            navigate('/projects')
        }

        if (location.pathname === '/contact'&& onContactPage === false) 
        {
            setOnContactPage(true)
                setOnHomePage(false)
                setOnAboutPage(false)
                setOnProjectPage(false)
            navigation.contactPage()
            navigate('/contact')
        }
    }, [location]);


    useEffect(() => {

        navigation.on('homePage', () =>
        {
            if (onHomePage === false) 
            {
                setLightText(false)
                setOnHomePage(true)
                    setOnAboutPage(false)
                    setOnProjectPage(false)
                    setOnContactPage(false)
                navigate('/')
            }
        })

        navigation.on('aboutPage', () =>
        {
            console.log('onAboutPage', onAboutPage)
            if (onAboutPage === false) 
            {
                setLightText(true)
                setOnAboutPage(true)
                    setOnHomePage(false)
                    setOnProjectPage(false)
                    setOnContactPage(false)
                console.log('2')
                navigate('/about')
            }  
        })

        navigation.on('projectPage', () =>
        {
            if (onProjectPage === false) 
            {
                setLightText(false)
                setOnProjectPage(true)
                    setOnHomePage(false)
                    setOnAboutPage(false)
                    setOnContactPage(false)
                navigate('/projects')
            }  
        })
    
        navigation.on('contactPage', () =>
        {
            if (onContactPage === false) 
            {
                setLightText(false)
                setOnContactPage(true)
                    setOnHomePage(false)
                    setOnAboutPage(false)
                    setOnProjectPage(false)
                navigate('/contact')
            }  
        })
      }, [navigation]);

    const handleDeployMenu = () => 
    {
        setDeployMenu(true)
    }

    const handleHomeClick = () => 
    {
        if ((window.location.pathname === '/about') || (window.location.pathname === '/projects')|| (window.location.pathname === '/contact')) 
        navigation.resetToHomePage()
        setDeployMenu(false)
        setLightText(false)
    }

    const handleAboutClick = () => 
    {

        if (window.location.pathname === '/') navigation.transitionAboutPage()
        if ((window.location.pathname === '/projects') || (window.location.pathname === '/contact')) 
        navigation.resetBeforeAboutPage()
        setDeployMenu(false)
        setLightText(true)
    }

    const handleProjectClick = () => 
    {
        if (window.location.pathname === '/') navigation.transitionProjectPage()
        if ((window.location.pathname === '/about') || (window.location.pathname === '/contact')) 
        navigation.resetBeforeProjectPage()
        setDeployMenu(false)
        setLightText(false)
    }

    const handleContactClick = () => 
    {
        if (window.location.pathname === '/') navigation.transitionContactPage()
        if ((window.location.pathname === '/projects') || (window.location.pathname === '/about')) 
        navigation.resetBeforeContactPage()
        setDeployMenu(false)
        setLightText(false)
    }


    

    return (
        <section className={ lightText === false ? 'menu title dark' : 'menu title light'}>
        <nav onMouseEnter={() => setDeployMenu(true)}
                onMouseLeave={() => setDeployMenu(false)}
                className={deployMenu === false ? "navigation concentrate" : "navigation deploy"}>
            <NavLink  className="navButton" onClick={deployMenu === false ? handleDeployMenu : handleHomeClick} >
                <div className="navText home" >{english === true ? 'Home' : 'Accueil'} </div>
                <div className='navIcon home one'>
                    <img src="../../static/menu/menu-01.png"/>
                </div>
                <div className='navIcon home two'>
                    <img src="../../static/menu/menu-01.png"/>
                </div>
                <div className='navIcon home three'>
                    <img src="../../static/menu/menu-01.png"/>
                </div>
            </NavLink>
            <NavLink className="navButton" onClick={deployMenu === false ? handleDeployMenu : handleAboutClick} >
               <div className="navText" >{english === true ? 'About' : 'À propos'} </div>
                <div className='navIcon about'>
                    <img src="../../static/menu/menu-02.png"/>
                    </div>
            </NavLink>
            <NavLink  className='navButton' onClick={deployMenu === false ? handleDeployMenu : handleProjectClick}>
                <div className="navText" >Projects </div>
                <div className='navIcon project'>
                    <img src="../../static/menu/menu-03.png"/>
                    </div>
            </NavLink>
            <NavLink  className="navButton" onClick={deployMenu === false ? handleDeployMenu : handleContactClick} >
                <div className="navText" >Contact </div>
                <div className='navIcon contact'>
                    <img src="../../static/menu/menu-04.png"/>
                    </div>
            </NavLink>
        </nav>
        </section>
    );  
}
