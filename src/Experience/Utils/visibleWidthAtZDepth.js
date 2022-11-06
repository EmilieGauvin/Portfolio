import visibleHeightAtZDepth from './visibleHeightAtZDepth'


export default function visibleWidthAtZDepth( depth, camera ){
  const height = visibleHeightAtZDepth( depth, camera );
  return height * camera.aspect;
};

