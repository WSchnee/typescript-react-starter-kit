// varying lowp vec4 vColor;    
varying highp vec3 vLighting;

void main() {
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // We want everything to be plain white
    // gl_FragColor = vColor;
    highp vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
    gl_FragColor = vec4(color.rgb * vLighting, color.a);
}
    