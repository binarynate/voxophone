
export default function ninvoke(object, methodName, ...args) {
    return new Promise((resolve, reject) => {
        args.push((err, ret) => err ? reject(err) : resolve(ret));
        object[methodName].apply(object, args);
    });
}
