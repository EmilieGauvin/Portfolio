varying vec2 vUv;
varying float vheight;
uniform float uScaleRatio;

void main()
{

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
    vheight = position.y / uScaleRatio + 3.0;
}
