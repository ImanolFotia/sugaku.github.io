var fragment = ["precision mediump float; \n",
	"varying vec2 UV; \n",
	"varying vec3 Normal, T, B, N; \n",
	"varying vec3 FragPos;\n",
	"varying vec3 cubeuv;\n",
	"uniform samplerCube cubemap;\n",
	"uniform sampler2D sampler;\n",
	"uniform sampler2D sampler2;\n",
	"uniform sampler2D sampler3;\n",
	"uniform vec3 viewPos;\n",
	"uniform vec3 viewDir;\n",
	"uniform bool envmap;\n",
	"uniform bool normalmapping;\n",
	"vec3 ligthDir = vec3(-0.54, -1.0, -0.5);\n",
	"void main(){ \n",
	"vec4 texturenormal = normalize(texture2D(sampler3, UV) * 2.0 - 1.0);\n",
	"vec3 norm;\n",
    	"vec3 normal = normalize(N);\n",
    	"vec3 tangent = normalize(T);\n",
    	"vec3 binormal = normalize(B);\n",
    	"vec3 nb = normal + texturenormal.x * tangent + texturenormal.y * binormal;\n",
			"if(normalmapping){\n",
			"norm = normalize(nb);}\n",
			"else\n{",
			"norm = normalize(Normal);}\n",
    	"vec3 I = normalize(FragPos - viewPos); ",
    	"vec3 R = reflect(I, norm); ",
	"vec4 cubereflect = textureCube(cubemap, R);\n ",
    	"float ratio = 1.00 / 1.52;\n",
    	"R = refract(I, norm, ratio);\n",
	"vec4 cuberefract = textureCube(cubemap, R);\n",
	"vec4 texture = texture2D(sampler, UV);\n",
	"vec4 texture2 = texture2D(sampler2, UV);\n",
	"float diff = max(dot(norm, -ligthDir), 0.0);\n",
    	"vec3 halfwayDir = normalize(-ligthDir + normalize(viewDir));\n",
    	"float spec = pow(max(dot(norm, halfwayDir), 0.0), 64.0);\n",
    	"vec3 specular = spec  * vec3(0.5) * vec3(texture2.rgb);\n",
    	"vec3 viewVector = normalize(viewDir);\n",
    	"if(viewVector.y < 0.0)\n",
    	"viewVector.y = -1.0 * viewVector.y;\n",
    	"float fresnel = dot(norm, viewVector);\n",
    	"fresnel = clamp(fresnel, 0.0, 1.0);\n",
    	"vec3 blendcubemap = mix(  cuberefract.rgb, cubereflect.rgb, fresnel);",
		    	"vec4 diffuse = diff * texture * vec4(blendcubemap, 1.0);\n",
	"vec4 ambient = vec4(0.1, 0.1, 0.1, 1.0) * vec4(texture.rgb, 1.0);",
	"if(envmap)",
	"gl_FragColor.rgb = blendcubemap;\n",
	"else",
	"gl_FragColor.rgb = mix(diffuse.rgb + specular, blendcubemap * vec3(diff) * vec3(spec), 0.3) + ambient.rgb;\n",
	"gl_FragColor.a = 1.0;\n",
	"}\n"
	].join("\n");