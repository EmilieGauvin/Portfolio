uniform vec3 uGlowColor;
varying vec2 vUv;
varying float vheight;


void main()
{
    vec3 glow = uGlowColor ;
    float strength = 3.0;
    float gradient = - 0.08 + (vheight / 12.0);
    float blur = 
                (1.0 - vUv.x) 
                * 
                vUv.y
                ;

    float opacity = 
                    gradient
                    * 
                    blur
                    ;

    float ray1 = mod(vUv.x * 10.0, 1.0) + mod(vUv.y * 10.0, 1.0);
    ray1 = step(0.6, ray1) * 0.2;

    float ray2 = mod(vUv.x * 6.0, 1.0) + mod(vUv.y * 6.0, 1.0);
    ray2 = step(0.4, ray2) * 0.4;

    float ray3 = mod(vUv.x * 3.0, 1.0) + mod(vUv.y * 3.0, 1.0);
    ray3 = step(0.2, ray3) * 0.4;

    float rays = ray1 + ray2 + ray3;


    // gl_FragColor = vec4(glow, opacity * strength);
    // gl_FragColor = vec4(glow, rays * opacity);

    gl_FragColor = vec4(glow, rays * opacity + opacity * strength);
}