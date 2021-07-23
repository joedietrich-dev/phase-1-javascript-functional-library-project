const fi = (function () {
  return {
    libraryMethod: function () {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function (collection, callback) {
      for (let key in collection) {
        callback(collection[key], key, collection);
      }
      return collection;
    },

    map: function (collection, callback) {
      const result = [];
      this.each(collection, (value, key, collection) => {
        result.push(callback(value, key, collection));
      })
      return result;
    },

    reduce: function (collection, callback, accumulator) {
      let acc = accumulator;
      let col = collection;
      if (!Array.isArray(col)) col = this.map(collection, (value) => value);
      if (!acc) {
        [acc, ...col] = col;
      }
      for (let key in col) {
        acc = callback(acc, col[key], collection);
      }
      return acc;
    },

    find: function (collection, predicate) {
      for (let key in collection) {
        if (predicate(collection[key])) return collection[key];
      }
      return;
    },
    filter: function (collection, predicate) {
      const result = [];
      for (let key in collection) {
        if (predicate(collection[key])) result.push(collection[key]);
      }
      return result;
    },
    size: function (collection) {
      return this.reduce(collection, (acc) => acc + 1, 0);
    },
    first: function (array, n) {
      if (!n) return array[0];
      return this.reduce(array, (acc, curr) => {
        return (acc.length < n) ? [...acc, curr] : acc;
      }, []);
    },
    last: function (array, n) {
      if (!n) return array[array.length - 1];
      return this.reduce([...array].reverse(), (acc, curr) => {
        return (acc.length < n) ? [curr, ...acc] : acc;
      }, [])
    },
    compact: function (array) {
      return this.reduce(array, (acc, curr) => {
        return curr ? [...acc, curr] : acc;
      }, [])
    },
    sortBy: function (array, callback) {
      const result = [...array].sort((a, b) => callback(a) - callback(b));
      return result;
    },
    flatten: function (array, shallow = false) {
      if (!Array.isArray(array)) return array;
      if (shallow) {
        return this.reduce(array, (acc, curr) => {
          return Array.isArray(curr) ? [...acc, ...curr] : [...acc, curr];
        }, [])
      } else {
        return this.reduce(array, (acc, curr) => {
          return Array.isArray(curr) ? [...acc, ...this.flatten(curr)] : [...acc, curr];
        }, [])
      }
    },
    uniq: function (array, isSorted = false, callback = (f) => f) {
      if (isSorted) {
        return this.reduce(array, (acc, curr) => {
          if (callback(curr) !== callback(acc.last)) {
            return {
              last: curr,
              res: [...acc.res, curr]
            }
          }
          return acc;
        }, { last: null, res: [] }).res;
      }
      const hash = {};
      const result = []
      this.each(array, (item) => {
        if (!hash[JSON.stringify(callback(item))]) {
          result.push(item);
          hash[JSON.stringify(callback(item))] = true;
        }
      })
      return result;
    },
    keys: function (object) {
      return this.map(object, (_, key) => key);
    },
    values: function (object) {
      return this.map(object, (val) => val);
    },
    functions: function (object) {
      return this.compact(this.map(object, (val, key) => typeof val === 'function' ? key : false))
    }
  }
})()

fi.libraryMethod()
