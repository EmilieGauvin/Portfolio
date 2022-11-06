uniform vec2 uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uBigWavesSpeed;
uniform float uScaleRatio;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float speed = 
                uBigWavesSpeed 
                // + 
                // (sin(uTime * 0.0001)) 
                // * uBigWavesSpeed 
                // * 0.05
                ;

    // Elevation
    float elevationX = 
                sin(modelPosition.x * uBigWavesFrequency.x / uScaleRatio) * (1.0 - uv.y)
                * uBigWavesElevation.x * uScaleRatio
                + uv.y * 0.3 * uScaleRatio
                +
                sin(modelPosition.x * uBigWavesFrequency.y * 10.0 / uScaleRatio + uTime * speed * 0.5 ) * uv.y *0.2
                * uScaleRatio
                ;

    float elevationY =   
                sin(modelPosition.y * uBigWavesFrequency.y / uScaleRatio + uTime * speed) * uv.y
                * uBigWavesElevation.y* uScaleRatio + uv.y * 0.2 * uScaleRatio
                ;

    modelPosition.z += elevationX + elevationY;

    modelPosition.x += 
                        (1.0-uv.x) 
                        * 
                        (uv.y - 0.2) 
                        * 0.5 
                        * uScaleRatio
                        ;



    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}
