/**
 * Is the object Mergeable
 *
 * @param val
 * @returns {*|boolean}
 */
function isMergeableObject(val) {
  var nonNullObject = val && typeof val === 'object';
  return (
    nonNullObject &&
    Object.prototype.toString.call(val) !== '[object RegExp]' &&
    Object.prototype.toString.call(val) !== '[object Date]'
  );
}

/**
 * Empty the Target
 *
 * @param val
 * @returns {*}
 */
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

/**
 * Clone if Necessary
 *
 * @param value
 * @param optionsArgument
 * @returns {*}
 */
function cloneIfNecessary(value, optionsArgument) {
  var clone = optionsArgument && optionsArgument.clone === true;
  return clone && isMergeableObject(value)
    ? merge(emptyTarget(value), value, optionsArgument)
    : value;
}

/**
 * Default Array Merge
 *
 * @param target
 * @param source
 * @param optionsArgument
 * @returns {*}
 */
function defaultArrayMerge(target, source, optionsArgument) {
  var destination = target.slice();
  source.forEach(function (e, i) {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument);
    } else if (isMergeableObject(e)) {
      destination[i] = merge(target[i], e, optionsArgument);
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument));
    }
  });
  return destination;
}

/**
 * Merge Object
 *
 * @param target
 * @param source
 * @param optionsArgument
 * @returns {{}}
 */
function mergeObject(target, source, optionsArgument) {
  var destination = {};
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(function (key) {
      destination[key] = cloneIfNecessary(target[key], optionsArgument);
    });
  }
  Object.keys(source).forEach(function (key) {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument);
    } else {
      destination[key] = merge(target[key], source[key], optionsArgument);
    }
  });
  return destination;
}
/**
 * Merge Object and Arrays
 *
 * @param target
 * @param source
 * @param optionsArgument
 * @returns {*}
 */
function merge(target, source, optionsArgument) {
  var array = Array.isArray(source);
  var options = optionsArgument || { arrayMerge: defaultArrayMerge };
  var arrayMerge = options.arrayMerge || defaultArrayMerge;
  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument);
  } else {
    return mergeObject(target, source, optionsArgument);
  }
}

export default merge;
