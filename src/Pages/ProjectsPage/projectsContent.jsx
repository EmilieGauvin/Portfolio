export default [
    {
        projectNumber: '0',
        englishTitle: '',
        englishText: ``,
        frenchTitle: '',
        frenchText: ``,
        slides: []
    },
    {
        projectNumber: '11',
        englishTitle: 'Kaleidoscope gradient',
        englishText: <p><br/>Inspired by the physics of kaleidoscopes, this gradient is slowly evolving. 
        Toggle the kaleidoscope by clicking and dragging and watch the colored shapes metamorphose.  
        <br/>As the blurred 3D body slowly revolves around itself or is spun by the user, it is infinitely reflected in a three-faced mirror tunnel merged with the camera.
        <br/><br/><i>Built in Three.js and React</i></p>,

        frenchTitle: 'Dégradé kaléidoscope',
        frenchText: <p><br/>À la manière d’un kaléidoscope, ce dégradé se transforme lentement. Le kaléidoscope s’anime lorsqu’on clique et glisse son curseur dessus et ses formes colorées se métamorphosent.
        <br/>Pendant que le volume 3D tourne doucement sur lui-même ou qu’il est pivoté par l’utilisateur, il est infiniment réfléchi dans un tunnel constitué de trois miroirs solidaires à la caméra.
        <br/><br/><i>Construit en Three.js et React</i></p>,

        slides: [
            { url: "../../static/projects/kaleidoscope/01.png", title: "1" },
            { url: "../../static/projects/kaleidoscope/02.png", title: "2" },
            { url: "../../static/projects/kaleidoscope/03.png", title: "3" },
            { url: "../../static/projects/kaleidoscope/04.png", title: "4" },
            { url: "../../static/projects/kaleidoscope/05.png", title: "5" },

          ],
        link: 'https://kaleidoscope-gradient.vercel.app/'
    },
    {
        projectNumber: '12',
        englishTitle: 'String waves',
        englishText: <p><br/>As you navigate on the web page, the straight diagonal hatching becomes a sea of undulating strings following your cursor. 
        As the waves grow, the content peeking through the lines is revealed. 
        <br/>The string waves were built with a custom shader material that creates an original curve and lighting relative to the cursor proximity and 
        direction and replicates it infinitely along the strings to create the illusion of waves.
        <br/><br/><i>Built in Three.js and React</i></p>,

        frenchTitle: 'Lignes sinueuses',
        frenchText: <p><br/>En naviguant sur la page web, les hachures diagonales deviennent des lignes ondulantes suivant le curseur. 
        Alors que les vagues prennent de l’ampleur, le contenu qu’on apercevait à travers les hachures est révélé. 
        <br/>Les lignes sinueuses sont faites d’un <i>custom shader material</i> qui génère une première courbe et son éclairage 
        d’après sa proximité au curseur et sa direction, et la reproduit à l’infini le long des lignes, créant ainsi l’illusion de vagues.
        <br/><br/><i>Construit en Three.js et React</i></p>,
        slides: [
          { url: "../../static/projects/string-waves/01.png", title: "1" },
          { url: "../../static/projects/string-waves/02.png", title: "2" },
          { url: "../../static/projects/string-waves/03.png", title: "3" },
          { url: "../../static/projects/string-waves/04.png", title: "4" },
          { url: "../../static/projects/string-waves/05.png", title: "5" },
          { url: "../../static/projects/string-waves/06.png", title: "6" },
          { url: "../../static/projects/string-waves/07.png", title: "7" },
          ],
        link: 'https://string-waves.vercel.app/'
    },
    {
        projectNumber: '13',
        englishTitle: 'Psychedelic tunnel',
        englishText: <p><br/>This line tunnel randomly morphs at its own rhythm. Move your mouse around to play with its evolving shape. 
        <br/>The tunnel illusion is created by a succession of simple planes with each a cloned custom shader material generating the sinusoidal animation. Each clone has a time increment that delays the animation and creates the hypnotic tunnel effect.
        <br/><br/><i>Built in Three.js, React</i></p>,

        frenchTitle: 'Tunnel psychédélique ',
        frenchText: <p><br/>Ce tunnel de lignes se dessine de manière aléatoire et à son propre rythme. Ses formes évoluent et se transforment sous le passage du curseur. 
        <br/>L’illusion du tunnel est créée par une succession de plans simples, habillés d’un <i>custom shader material</i> cloné générant l’animation sinusoïdale. Chaque clone a un incrément de temps qui retarde l’animation et créé l’effet hypnotique du tunnel.
        <br/><br/><i>Construit en Three.js, React</i></p>,
        slides: [
          { url: "../../static/projects/tunnel/01.png", title: "1" },
          { url: "../../static/projects/tunnel/02.png", title: "2" },
          { url: "../../static/projects/tunnel/03.png", title: "3" },
          { url: "../../static/projects/tunnel/04.png", title: "4" },
          { url: "../../static/projects/tunnel/05.png", title: "5" },
          { url: "../../static/projects/tunnel/06.png", title: "6" },
          ],
        link: 'https://psychedelic-tunnel.vercel.app/'
    },
    {
        projectNumber: '21',
        englishTitle: 'Steer the boat!',
        englishText: <p><br/>Steer the boat to avoid the waves and try not to get water inside! 
        <br/>This game was inspired by Bruno Simon’s <i>Three.js journey</i> course <i>Raging sea</i> where I learned to generate a water like animation effect through shaders. From that, the trickiest part of this project was to have the boat move and rotate according to the growing movements of the sea.
        <br/><br/><i>Built in Three.js, React and Blender</i></p>,

        frenchTitle: 'Ne pas chavirer !',
        frenchText: <p><br/>Dirige le bateau pour éviter les vagues et ne pas faire rentrer de l’eau à l'intérieur&nbsp;! 
        <br/>Ce jeu est inspiré du cours <i>Raging sea</i> de <i>Three.js journey</i> de Bruno Simon, qui m'a appris à générer une animation 
        d’eau en mouvement grâce à des shaders. En partant de cette base, l'enjeu principal de ce projet était d'animer et orienter le bateau
         en fonction des mouvements de la mer.
        <br/><br/><i>Construit en Three.js, React et Blender</i></p>,
        slides: [
            { url: "../../static/projects/steer-the-boat/01.png", title: "1" },
            { url: "../../static/projects/steer-the-boat/02.png", title: "2" },
            { url: "../../static/projects/steer-the-boat/03.png", title: "3" },
            { url: "../../static/projects/steer-the-boat/04.png", title: "4" },
            { url: "../../static/projects/steer-the-boat/05.png", title: "5" },
            { url: "../../static/projects/steer-the-boat/06.png", title: "6" },
            { url: "../../static/projects/steer-the-boat/07.png", title: "7" },
            { url: "../../static/projects/steer-the-boat/08.png", title: "8" },
            { url: "../../static/projects/steer-the-boat/09.png", title: "9" },
            { url: "../../static/projects/steer-the-boat/10.png", title: "10" },
            { url: "../../static/projects/steer-the-boat/11.png", title: "11" },
          ],
        link: 'https://steer-the-boat.vercel.app/'
    },
    {
        projectNumber: '31',
        englishTitle: 'The attic',
        englishText: <p><br/>This 3D model was realized for the purpose of this portfolio. 
        <br/>It was built and texturized in Blender and light effects were added in Three.js with custom shaders. 
        <br/>Move your cursor around to move the camera inside the model.
        <br/><br/><i>Built in Three.js and Blender</i></p>,
        frenchTitle: 'Le grenier',
        frenchText: <p><br/>Ce modèle 3D a été réalisé afin de faire partie de ce portfolio. 
        <br/>Il a été modélisé et texturé dans Blender et des effets de lumière par <i>custom shaders</i> lui ont été ajoutés en Three.js. 
        <br/>La caméra bouge dans le modèle avec les mouvements du curseur.
        <br/><br/><i>Construit en Three.js and Blender</i></p>,
        slides: [
          { url: "../../static/projects/attic/01.png", title: "one" },
          { url: "../../static/projects/attic/02.png", title: "two" },
          { url: "../../static/projects/attic/03.png", title: "three" },
          { url: "../../static/projects/attic/04.png", title: "four" }
          ],
        link: 'https://the-attic-mocha.vercel.app/'
    },
    {
        projectNumber: '32',
        englishTitle: 'The living-room',
        englishText: <p><br/>This 3D model was realized for the purpose of this portfolio. 
        <br/>It was built and texturized in Blender and light and movement effects were added in Three.js with custom shaders. 
        <br/>Move your cursor around to move the camera inside the model.
        <br/><br/><i>Built in Three.js and Blender</i></p>,
        frenchTitle: 'Le salon',
        frenchText: <p><br/>Ce modèle 3D a été réalisé afin de faire partie de ce portfolio. 
        <br/>Il a été modélisé et texturé dans Blender et des effets de lumière et de mouvement par <i>custom shaders</i> lui ont été ajoutés en Three.js. 
        <br/>La caméra bouge dans le modèle avec les mouvements du curseur.
        <br/><br/><i>Construit en Three.js and Blender</i></p>,
        slides: [
            { url: "../../static/projects/livingRoom/01.png", title: "one" },
            { url: "../../static/projects/livingRoom/02.png", title: "two" },
            { url: "../../static/projects/livingRoom/03.png", title: "three" },
            { url: "../../static/projects/livingRoom/04.png", title: "four" }
          ],
        link: 'https://the-living-room.vercel.app/'
    },
]


