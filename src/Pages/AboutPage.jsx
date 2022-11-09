import React, { useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./AboutPage.css";


export default function AboutPage(props) {
  const experience = new Experience()
  const navigation = experience.navigation
  const [showContent, setShowContent] = useState(false)
  const [english, setEnglish] = useState(props.english)

  useEffect(() =>
  {
    props.onChange(english)
  }, [english])

  navigation.on('notAboutPage', () =>
  {
    setShowContent(false)

  })

  useEffect(() => {
    setShowContent(true)
  }, [])


    const englishTitle = 'About';
    const englishText = `I’m Emilie, a French creative developer
with a background in architecture, graphic design, and mathematics. 
My specialties are 3D modeling, interactive web experiences,
and 3D scene conception.
I can’t wait to bring your projects to life !`;
    const englishCV = `-
2022 Three.js Journey course
2017 Exhibition and graphic design
2014 Architecture school
2010 Prépa Math`;


    const frenchTitle = `À propos`;
    const frenchText = `Je suis Emilie, une creative developpeuse française
avec un background en architecture, design graphique et mathématiques. 
Mes spécialités sont la modélisation 3D, les expériences web 3D
et la conception de décors 3D.
J’ai hâte de donner vie à vos projets !`;
    const frenchCV = `-
Three.js Journey course
Exhibition and graphic design
Architecture school
Prépa Math`;
    

    const handleChange = () => 
    {
        setEnglish(prevState=> !prevState);
    }

    return (
    <div className={showContent === false ? "about hide" : "about show"}>
      <section className='title'>
        <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
        <button className="title" onClick={handleChange}>{english === true ? 'À propos ?' : 'About?'}</button>
      </section>
      <section className='main about'>
        <div className="line"></div>
        <section className='text-cv'>
          <h4 className="text">{english === true ? englishText : frenchText}</h4>
          <h4 className="cv">{english === true ? englishCV : frenchCV}</h4>
        </section>
        <div className="line"></div>
        <section className='skills'>
          <div className='right-align'>
            <h4 className='skill'>Coding skills</h4>
            <div><h5 className='skill'><img src ='../../static/skills/logo_threejs.png'/>Three.js</h5></div>
            <div><h5 className='skill'><img src ='../../static/skills/logo_javascript.png'/>Javascript</h5>
            <h5 className='skill'><img src ='../../static/skills/logo_react.png'/>React</h5></div>
            <div><h5 className='skill'><img src ='../../static/skills/logo_html.png'/>HTML</h5>
            <h5 className='skill'><img src ='../../static/skills/logo_css.png'/>CSS</h5></div>
          </div>
          <div className='left-align'>
          <h4 className='skill'>Software skills</h4>
            <h5 className='skill'>Blender<img src ='../../static/skills/logo_blender.png'/></h5>
            <h5 className='skill'>Rhinoceros<img src ='../../static/skills/logo_rhino.png'/></h5>
            <h5 className='skill'>Photoshop<img src ='../../static/skills/logo_photoshop.png'/></h5>
            <h5 className='skill'>Illustrator<img src ='../../static/skills/logo_illustrator.png'/></h5>
            <h5 className='skill'>Autocad<img src ='../../static/skills/logo_autocad.png'/></h5>

          </div>
        </section>
      </section>
    </div>
  );
}