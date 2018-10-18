 /*Fragnment Shader for textures*/
 
varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;
// varying highp vec3 vLighting;

void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord);
  // gl_FragColor = vec4(color.rgb * vLighting, color.a);
}
