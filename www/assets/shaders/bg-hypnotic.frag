#define U  uniform
#define M  mat2
#define T  time
#define X  p.x
#define Y  p.y
#define R  T/10.
#define C  cos
#define S  sin
#define F  float
#define L  floor
#define N  tan
#define Q  sqrt
#define P  main
#define A  abs
#define V  vec2
#define W  vec3
#define V4 vec4
#define E  return
#define O  void
#define RS resolution
#define GL gl_FragCoord.xy
#define FC gl_FragColor

precision mediump F;

U F T;
U V RS
;W ca(
V p){p
*=M(C(
R),-S(
R),S(R
),C(R)
);F a=
C(X+Y-
(T/4.)
+C(X*Y
-8.*S(
T/3.))
);F b=
C(X)-N
(Y)+S(
X-T/7.
)*.2;F
 v=1.-
L(A(a-
b)*10.
)/2.;E
 W(v,v
*Q(b+(
S(T)+1.
 )/2.)
,v/N(a
));}O 
P(O){V
 u=(GL
/RS)-
.5;u.x
*=RS.x
/RS.y;
FC=V4(
ca(u*6.
),1);}