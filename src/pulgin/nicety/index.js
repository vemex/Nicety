export default class  Nicety{

     beforeHooks=[];
     registerHook (list, fn) {
        list.push(fn);
        return () => {
            const i = list.indexOf(fn)
            if (i > -1) list.splice(i, 1)
        }
    }
}