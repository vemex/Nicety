const fs = require('fs');
const execSync = require('child_process').execSync;

//const args  = process.argv.splice(2);
const githubtoken=process.env["GITHUB_TOKEN"];

/**
 * 执行shell命令
 * @param command
 * @returns {string}
 */
function cmd(command) {
    try {
        const result = execSync(command);
        return result.toString()
    } catch (error) {
        return ''
        //throw(error);
    }
}
/**
 * 获取版本号
 * @returns {*}
 */
function getVersion() {
    try {
        let tag = cmd('git describe --exact-match --tags $(git rev-parse HEAD)');
        console.log('tag');
        console.log(tag);
        tag = tag.replace(/\r?\n|\r/g, '');
        if (/^v\d+.\d+.\d+/.test(tag)) {
            return tag;
        }
        return null;
    } catch (e) {
        return null;
    }
}

console.log('start release prepare');

const packageInfo = JSON.parse(fs.readFileSync('package.json'));

const version = getVersion();

if (version) {
    console.log('update release version');
    packageInfo.version = version;
    fs.writeFileSync('package.json', JSON.stringify(packageInfo, null, 2));
    cmd("git add package.json");
    cmd("git commit -m '[auto]update version to "+version+"'");
    cmd("git push --progress o1 master:master");
}
console.log('finish release prepare');