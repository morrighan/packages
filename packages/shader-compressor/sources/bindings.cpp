#include <emscripten/bind.h>

#include <optional>
#include <string>

#include "externals/glslang/glslang/Include/glslang_c_interface.h"
#include "externals/glslang/glslang/Public/resource_limits_c.h"
#include "externals/glsl-optimizer/src/glsl/glsl_optimizer.h"

using namespace emscripten;

extern "C" const char* minifier_minify(const char* shader_source);
extern "C" void minifier_release(const char*);

class Validator {
private:
	glslang_input_t input;
	glslang_shader_t* shader;

public:
	static void initialize() {
		glslang_initialize_process();
	}

	static void finalize() {
		glslang_finalize_process();
	}

	Validator(int type, const std::string& shader_source) {
		input = {
			.language = GLSLANG_SOURCE_GLSL,
			.stage = type == 0 ? GLSLANG_STAGE_VERTEX : GLSLANG_STAGE_FRAGMENT,
			.client = GLSLANG_CLIENT_NONE,
			.client_version = static_cast<glslang_target_client_version_t>(0),
			.target_language = GLSLANG_TARGET_NONE,
			.target_language_version = static_cast<glslang_target_language_version_t>(0),
			.code = shader_source.c_str(),
			.default_version = 100,
			.default_profile = GLSLANG_ES_PROFILE,
			.force_default_version_and_profile = false,
			.forward_compatible = false,
			.messages = GLSLANG_MSG_DEFAULT_BIT,
			.resource = glslang_default_resource(),
		};

		shader = glslang_shader_create(&input);
	}

	~Validator() {
		if (shader) glslang_shader_delete(shader);
	}

	auto get_error() const -> std::optional<std::string> {
		auto is_parsed = !!glslang_shader_parse(shader, &input);

		return !is_parsed ? std::make_optional<std::string>(glslang_shader_get_info_log(shader)) : std::nullopt;
	}
};

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

	auto get_result() const -> std::string {
		if (!shader_code) {
			throw std::runtime_error(glslopt_get_log(shader));
		}

		return shader_code;
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
	class_<Validator>("Validator")
		.constructor<int, std::string>()
		.property("error", &Validator::get_error, return_value_policy::take_ownership())
		.class_function("initialize", &Validator::initialize)
		.class_function("finalize", &Validator::finalize);

	class_<Optimizer>("Optimizer")
		.constructor<int, std::string>()
		.property("result", &Optimizer::get_result, return_value_policy::take_ownership());

	class_<Minifier>("Minifier")
		.constructor<std::string>()
		.property("result", &Minifier::get_result, return_value_policy::take_ownership());

	register_optional<std::string>();
}
