#ifdef GL_ES
precision lowp float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define COLOR_COUNT 4
#define R_INTENSITY 0.2126
#define G_INTENSITY 0.7152
#define B_INTENSITY 0.0722

void main( void ) {

	vec4 color = vec4( 0 );
	
	vec2 p = gl_FragCoord.xy / resolution.y;
	
	vec2 lightPos;
	vec4 lightColor;
	float lightRadius;
	float d;
	float att;
		
	vec2 lightPosArray[COLOR_COUNT];
	vec4 lightColorArray[COLOR_COUNT];
	float lightRadiusArray[COLOR_COUNT];
	
	// light 0
	lightPosArray[0] = vec2(1. + cos(time) / 4., .5 + sin(time) / 4.);
	lightColorArray[0] = vec4( .3, .3, .3, 1 );
	lightRadiusArray[0] = .03;
	
	// light 1
	lightPosArray[1] = vec2(1. + -cos(time/2.) / 4., .5 + sin(time/2.) / 5.);
	lightColorArray[1] = vec4( .5, .2, .1, 1 );
	lightRadiusArray[1] = .05;
	
	// light 2
	lightPosArray[2] = vec2(1.2 + cos(time/3.) / 2., .5 + sin(time/2.) / 2.);
	lightColorArray[2] = vec4( .01, .8, .1, 1 );
	lightRadiusArray[2] = .2;
	
	// light 3
	lightPosArray[3] = vec2(1.2, .5);
	lightColorArray[3] = vec4( 0.5, .0, .0, 1. );
	lightRadiusArray[3] = .1;
	
	for (int i = 0; i < COLOR_COUNT; i++) {
		lightPos = lightPosArray[i];
		lightColor = lightColorArray[i];
		lightRadius = lightRadiusArray[i];
		d = distance(lightPos, p);
		att = clamp(1. - (d*d)/(lightRadius*lightRadius), 0., 1.);
		att *= att;
		color += lightColor * att;
	}
	
	float grey = color.r * R_INTENSITY +
		color.g * G_INTENSITY +
		color.b * B_INTENSITY;
	
	//color = vec4(grey);
	gl_FragColor = color;

}