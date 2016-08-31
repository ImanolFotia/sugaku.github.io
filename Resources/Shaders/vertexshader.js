	var vertex = [
	"attribute vec3 position; ",
	"attribute vec3 normal; ",
	"attribute vec3 uvs; ",
	"attribute vec3 binormal; ",
	"attribute vec3 tangent; ",
	"varying vec2 UV; ",
	"varying vec3 FragPos;",
	"varying vec3 cubeuv;",
	"varying vec3 Normal, T, B, N; ",
	"uniform mat4 matrix; ",
	"uniform mat4 model; ",
	"uniform mat4 view; ",
	"uniform mat4 perspective; ",
	"uniform mat4 transInvModel;",
	"void main(){ ",
	"gl_Position = perspective * view * model * vec4(position, 1.0);",
	"UV = uvs.xy; ",
	"cubeuv = position; ",
	"Normal = vec3(mat3(transInvModel) * normal); ",
	"FragPos = vec3(model * vec4(position, 1.0));",
	"T = normalize(mat3(transInvModel) * tangent);",
    	"B = normalize(mat3(transInvModel) * binormal);",
    	"N = normalize(mat3(transInvModel) * normal);",
	"}"
	].join("\n");