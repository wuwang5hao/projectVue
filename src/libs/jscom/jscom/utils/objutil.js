export class ObjUtil {
  copy(obj) {
    return Object.assign({}, obj)
  }
  setdefault(dict, key, value) {
    if (key in dict) {
      return dict[key]
    } else {
      dict[key] = value
      return value
    }
  }
  get(object, key, default_value) {
    if (!object) return default_value
    let result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
  }
  isEmpty(obj) {
    if (!obj) return true
    if (typeof obj === 'object') {
      return Object.keys(obj).length === 0
    }
    return false
  }
  has(obj, key) {
    return obj.hasOwnProperty(key)
  }

  /**
   * Performs a deep merge of `source` into `target`.
   * Mutates `target` only but not its objects and arrays.
   *
   * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
   */
  merge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object';

    if (!isObject(target) || !isObject(source)) {
      return source;
    }

    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = this.merge(Object.assign({}, targetValue), sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });

    return target;
  }

  // clone(obj) {
  //   return Object.assign(new (obj.constructor)(), obj)
  // }
  clone(obj) {
    let copy

    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }

    // throw new Error("Unable to copy obj! Its type isn't supported.");
    return obj
  }
}

export let objUtil = new ObjUtil()
