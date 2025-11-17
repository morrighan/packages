#include <emscripten/bind.h>

#include <optional>
#include <string>

#include "artifacts/glsl-optimizer/src/glsl/glsl_optimizer.h"

using namespace emscripten;

extern "C" const char* minifier_minify(const char* shader_source);
extern "C" void minifier_release(const char*);

class Optimizer {
private:
	glslopt_ctx* context = nullptr;
	glslopt_shader* shader = nullptr;
	const char* shader_code = nullptr;

public:
	Optimizer(int type, const std::string& shader_source) {
		context = glslopt_initialize(kGlslTargetOpenGLES30);
		shader = glslopt_optimize(context, static_cast<glslopt_shader_type>(type), shader_source.c_str(), 0);

		if (context && shader && glslopt_get_status(shader)) {
			shader_code = glslopt_get_output(shader);
		}
	}

	~Optimizer() {
		if (shader) glslopt_shader_delete(shader);
		if (context) glslopt_cleanup(context);
	}

	auto get_result() const -> std::optional<std::string> {
		return shader_code ? std::make_optional<std::string>(shader_code) : std::nullopt;
	}
};

class Minifier {
private:
	const char* shader_code = nullptr;

public:
	Minifier(const std::string& shader_source) {
		shader_code = minifier_minify(shader_source.c_str());
	}

	~Minifier() {
		if (shader_code) minifier_release(shader_code);
	}

	auto get_result() const -> std::optional<std::string> {
		return shader_code ? std::make_optional<std::string>(shader_code) : std::nullopt;
	}
};

EMSCRIPTEN_BINDINGS(shader_compressor) {
	class_<Optimizer>("Optimizer")
		.constructor<int, std::string>()
		.property("result", &Optimizer::get_result, return_value_policy::take_ownership());

	class_<Minifier>("Minifier")
		.constructor<std::string>()
		.property("result", &Minifier::get_result, return_value_policy::take_ownership());

	register_optional<std::string>();
}
