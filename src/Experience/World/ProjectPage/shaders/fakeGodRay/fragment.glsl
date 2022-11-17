uniform vec3 uGlowColor;
uniform float uBlurOffset;
uniform float uAlphaBase;
uniform float uAlphaRays;
varying vec2 vUv;


void main()
{
    vec3 glow = uGlowColor ;
    float blur = (uBlurOffset - vUv.y) * 2.0 ;
    blur = clamp(blur, 0.0, 1.0) ;

    float ray1 = mod(vUv.x * 5.0, 1.0) ;
    ray1 = step(0.6, ray1) * 0.15;

    float ray2 = mod(vUv.x * 10.0, 1.0);
    ray2 = step(0.4, ray2) * 0.3;

    float ray3 = mod(vUv.x * 15.0, 1.0);
    ray3 = step(0.2, ray3) * 0.3;

    float rays = ray1 + ray2 + ray3;


    gl_FragColor = vec4(glow, (uAlphaBase + rays * uAlphaRays) * blur );
}