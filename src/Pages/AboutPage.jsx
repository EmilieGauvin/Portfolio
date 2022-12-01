import React, { useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./AboutPage.css";


export default function AboutPage(props) {
  const experience = new Experience()
  const navigation = experience.navigation
  const [showContent, setShowContent] = useState(false)
  const [english, setEnglish] = useState(props.english)

  useEffect(() => {
    props.onChange(english)
  }, [english])

  navigation.on('notAboutPage', () => {
    setShowContent(false)

  })

  useEffect(() => {
    setShowContent(true)
  }, [])

  const englishTitle = 'About';
  const englishText = `I’m Emilie, a French creative developer with a background in architecture, graphic design, and mathematics. 
My areas of expertise are 3D modeling, interactive web experiences, and virtual set design.`;
  const englishCV = `-
2022 / Three.js Journey course
2017-2022 / Freelance exhibition and graphic designer
2014-2017 / Architect in architecture studios 
2009-2014 / Advanced mathematical studies and Architecture School `;


  const frenchTitle = `À propos`;
  const frenchText = `Je suis Emilie, développeuse créative française avec un background en architecture, design graphique et mathématiques. 
Mes spécialités sont la modélisation 3D, les expériences web intéractives et la conception de décors virtuels.`;
  const frenchCV = `-
  2022 / Cursus Three.js Journey
  2017-2022 / Scénographe et graphiste d'exposition freelance
  2014-2017 / Architecte en agences d'architecture 
  2009-2014 / Classes préparatoires MPSI et école d'Architecture `;


  const handleChange = () => {
    setEnglish(prevState => !prevState);
  }

  return (
    <div className={showContent === false ? "about-page hide" : "about-page show"}>
      <section className='title'>
        <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
        <button className="title" onClick={handleChange}>{english === true ? 'en français ?' : 'in english?'}</button>
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
          </div>
          <div className="line skills-division"></div>
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