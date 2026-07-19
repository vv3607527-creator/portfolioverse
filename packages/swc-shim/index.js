// SWC binding shim for Android (Termux) where native SWC binary needs glibc
// Falls back to Babel for transformation

const babel = require("@babel/core");

function createStubBindings() {
  return {
    isWasm: true,

    async transform(src, options) {
      return transformSync(src, options);
    },

    transformSync(src, options) {
      try {
        const result = babel.transformSync(src, {
          babelrc: true,
          configFile: true,
          filename: options?.filename || "unknown.js",
          sourceMaps: options?.sourceMaps ?? true,
          sourceFileName: options?.filename,
        });
        return {
          code: result?.code || src,
          map: result?.map ? JSON.stringify(result.map) : undefined,
        };
      } catch {
        return { code: src, map: undefined };
      }
    },

    async minify(src, options) {
      return minifySync(src, options);
    },

    minifySync(src, _options) {
      // Basic minification - remove comments and extra whitespace
      const code = typeof src === "string" ? src : String(src);
      return {
        code: code
          .replace(/\/\/.*$/gm, "")
          .replace(/\/\*[\s\S]*?\*\//gm, "")
          .replace(/\s+/g, " ")
          .trim(),
      };
    },

    async parse(src, options) {
      return parseSync(src, options);
    },

    parseSync(src, _options) {
      try {
        const ast = babel.parseSync(src, {
          babelrc: true,
          configFile: true,
          filename: "unknown.js",
        });
        return JSON.stringify(ast);
      } catch {
        return JSON.stringify({ type: "Program", body: [], sourceType: "module" });
      }
    },

    getTargetTriple() {
      return "aarch64-linux-android";
    },

    initCustomTraceSubscriber() {
      return () => {};
    },

    teardownTraceSubscriber() {},

    initHeapProfiler() {
      return () => {};
    },

    teardownHeapProfiler() {},

    createTurboTasks(_memoryLimit) {
      return {};
    },

    mdxCompile(src, _options) {
      return src;
    },

    mdxCompileSync(src, _options) {
      return src;
    },

    lightningCssTransform(opts) {
      return opts.code || "";
    },

    lightningCssTransformStyleAttribute(opts) {
      return opts.code || "";
    },
  };
}

module.exports = createStubBindings();
module.exports.createStubBindings = createStubBindings;
