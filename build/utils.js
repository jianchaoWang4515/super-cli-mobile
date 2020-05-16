const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
function resolve(dir) {
    return path.join(process.cwd(), dir);
};
function getEntryFileContent(entryPath, vueFilePath) {
    // 获取对应vue文件的相对路径
    let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
    // 公共js
    let entryContents = fs.readFileSync(resolve('src/main.js')).toString();
    let contents = 
`${entryContents}
import APP from '${relativeVuePath}';
new Vue({
    render: (h) => h(APP)
}).$mount('#app')`
    return contents;
}

function getEntry(globPath) {
    let result = {}
    let entries = glob.sync(globPath);
 
    entries.forEach(function (entry) {
        const extname = path.extname(entry);
        const basename = entry.replace('src/', '').replace(extname, '');
        const templatePathForWeb = path.join(resolve('.temp'), basename + '.web.js');
        fs.outputFileSync(templatePathForWeb, getEntryFileContent(templatePathForWeb, resolve(entry)));
        result[basename] = templatePathForWeb;
    });
    return result;
}
module.exports = {
    resolve,
    getEntryFileContent,
    getEntry
}