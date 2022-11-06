import { useEffect } from 'react';
import Experience from './Experience/Experience.js'

export default function ThreeJSExperience() {
  useEffect(() => {
    const experience = new Experience(document.querySelector('canvas.webgl'))
  }, []);

  return (
    <div>
      <canvas className="webgl" />
    </div>
  );
}

