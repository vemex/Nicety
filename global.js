const fs = require('fs');
const execSync = require('child_process').execSync;
/**
 * 执行shell命令
 * @param command
 * @returns {string}
 */
function cmd(command) {
    try {
        const result = execSync(command,{shell: '/bin/bash'});
        return result.toString()
    } catch (error) {
        return ''
        //throw(error);
    }
}

const packageInfo = JSON.parse(fs.readFileSync('package.json'));

return packageInfo.version;