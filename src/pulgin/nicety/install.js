export default class  Nicety{


    function registerHook (list: Array<any>, fn: Function): Function {
        list.push(fn)
        return () => {
            const i = list.indexOf(fn)
            if (i > -1) list.splice(i, 1)
        }
    }
}