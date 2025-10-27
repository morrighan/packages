#include <emscripten/bind.h>

#include <optional>
#include <string>

#include "artifacts/glsl-optimizer/src/glsl/glsl_optimizer.h"

using namespace emscripten;

struct OptimizationResult {
	bool completed;
	std::optional<std::string> shader_code;
	std::optional<std::string> error_log;
};

class Optimizer {
private:
	glslopt_ctx* context = nullptr;
	glslopt_shader* shader = nullptr;

public:
	Optimizer(glslopt_shader_type type, const std::string& shader_source) {
		context = glslopt_initialize(kGlslTargetOpenGLES30);
		shader = glslopt_optimize(context, type, shader_source.c_str(), 0);
	}

	~Optimizer() {
		glslopt_shader_delete(shader);
		glslopt_cleanup(context);
	}

	auto get_result() const -> std::optional<OptimizationResult> {
		if (!context || !shader) return std::nullopt;

		auto completed = glslopt_get_status(shader);

		return std::make_optional<OptimizationResult>({
			completed,
			completed ? std::make_optional<std::string>(glslopt_get_output(shader)) : std::nullopt,
			completed ? std::nullopt : std::make_optional<std::string>(glslopt_get_log(shader)),
		});
	}
};

EMSCRIPTEN_BINDINGS(optimizer) {
	value_array<OptimizationResult>("OptimizationResult")
		.element(&OptimizationResult::completed)
		.element(&OptimizationResult::shader_code)
		.element(&OptimizationResult::error_log);

	enum_<glslopt_shader_type>("ShaderType")
		.value("VERTEX", kGlslOptShaderVertex)
		.value("FRAGMENT", kGlslOptShaderFragment);

	class_<Optimizer>("Optimizer")
		.constructor<glslopt_shader_type, std::string>()
		.property("result", &Optimizer::get_result, return_value_policy::take_ownership());

	register_optional<OptimizationResult>();
	register_optional<std::string>();
}
