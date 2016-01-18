let startsWith = require('lodash/string/startsWith');
let resolve = require('path').resolve;
let ROOT_PREFIX = '~';

/// http://astexplorer.net/
/// https://github.com/facebook/fbjs/blob/master/scripts/babel/rewrite-modules.js
/// https://github.com/gavriguy/babel-plugin-project-relative-require/blob/master/index.js
module.exports = function plugin(babel) {
    /* eslint object-shorthand: 0, func-names: 0 */
    let t = babel.types;

    /// TODO: 根目录设置不应以当前文件目录为标准.
    let root = resolve(__dirname, '..', '..');

    function rootify(path) {
        if (startsWith(path, ROOT_PREFIX)) {
            path = root + path.slice(ROOT_PREFIX.length);
            return path;
        }
        return path;
    }

    return new babel.Transformer('babel-plugin-project-relative-require', {
        ImportDeclaration: function (node, parent) {
            // probably always true, but let's be safe
            if (!t.isLiteral(node.source)) {
                return node;
            }
            node.source.value = rootify(node.source.value);
            return node;
        },
        CallExpression: {
            exit: function (call, parent) {
                if (
                    !t.isMemberExpression(call.callee)
                    &&
                    t.isIdentifier(call.callee, { name: 'require' })
                ) {
                    let moduleArg = call.arguments[0];
                    if (moduleArg && moduleArg.type === 'Literal') {
                        return t.callExpression(
                            call.callee,
                            [t.literal(rootify(moduleArg.value))]
                        );
                    }
                }
                return call;
            }
        }
    });
};
