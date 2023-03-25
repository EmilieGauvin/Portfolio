import React, { useMemo, useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./AboutPage.css";

export default function AboutPage({ english, changeLanguage }) {
  const [showContentAbout, setShowContent] = useState(false)

  const experience = useMemo(() => {
    const experience = new Experience
    return experience
  })

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)

    experience.navigation.on('notAboutPage', () => {
      setShowContent(false)
    })

    return () => experience.navigation.off('notAboutPage', () => { })
  }, [])

  const englishTitle = 'About';
  const englishText = `I’m Emilie, a French creative developer 
  with a background in architecture. 
My areas of expertise are interactive web experiences 
and 3D modeling.`;
  const englishCV = `-
2022 / Three.js Journey course
2018-2022 / Freelance exhibition and graphic designer
2017-2018 / Exhibition designer studies,
2014-2017 / Architect in architecture studios 
2010-2014 / Architecture Studies, State diploma of architecture `;


  const frenchTitle = `À propos`;
  const frenchText = `Je suis Emilie, développeuse créative française
  avec un background en architecture. 
Mes spécialités sont les expériences web intéractives 
et la modélisation 3D.`;
  const frenchCV = `-
  2022 / Cursus Three.js Journey
  2018-2022 / Scénographe et graphiste d'exposition freelance
  2017-2018 / Formation en scénographie
  2014-2017 / Architecte en agences d'architecture
  2010-2014 / Formation en architecture, Architecte diplômée d’État,  `;


  const handleChangeLanguage = () => {
    changeLanguage()
  }

  return (
    <div className={showContentAbout === false ? "about-page hide" : "about-page show"}>
      <section className='title'>
        <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
        <button className="title" onClick={handleChangeLanguage}>{english === true ? 'en français ?' : 'in english?'}</button>
      </section>
      <section className='main'>
        <div className="line"></div>
        <section className='text-cv'>
          <h4 className="text">{english === true ? englishText : frenchText}</h4>
          <h5 className="cv">{english === true ? englishCV : frenchCV}</h5>
        </section>
        <div className="line"></div>
        <section className='skills'>
          <div className='right-align skills-column'>
            <div><h5 className='skill'>{english === true ? 'Coding skills' : 'Langages'}</h5></div>
            <div>
              <p className='skill'><img src='../../static/skills/logo_threejs.png' />Three.js</p>
              <p className='skill'><img src='../../static/skills/logo_javascript.png' />Javascript</p>
              <p className='skill'><img src='../../static/skills/logo_react.png' />React</p>
            </div>
            <div>
              <p className='skill'><img src='../../static/skills/logo_html.png' />HTML</p>
              <p className='skill'><img src='../../static/skills/logo_css.png' />CSS</p>
            </div>
            <div>
              <p className='skill'>GLSL</p>
              <p className='skill'>GSAP</p>
            </div>
          </div>
          {/* <div className="line skills-division"></div> */}
          <div className='left-align skills-column'>
            <div><h5 className='skill'>{english === true ? 'Software skills' : 'Logiciels'}</h5></div>
            <div>
              <p className='skill'><img src='../../static/skills/logo_blender.png' />Blender</p>
              <p className='skill'><img src='../../static/skills/logo_rhino.png' />Rhinoceros</p>
              <p className='skill'><img src='../../static/skills/logo_photoshop.png' />Photoshop</p>
            </div>
            <div>
              <p className='skill'><img src='../../static/skills/logo_illustrator.png' />Illustrator</p>
              <p className='skill'><img src='../../static/skills/logo_autocad.png' />Autocad</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}