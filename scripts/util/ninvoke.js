/**
 * Creates a promise by invoking a method on an object that expects a Node-style callback as its
 * final argument:
 *
 *     ninvoke(someObject, 'doSomething', arg1, arg2, arg3);
 */
export default function ninvoke(object, methodName, ...args) {
    return new Promise((resolve, reject) => {
        args.push((err, ret) => err ? reject(err) : resolve(ret));
        object[methodName].apply(object, args);
    });
}
