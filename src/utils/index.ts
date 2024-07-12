import _ from 'lodash';

export const getInfoData = ({ fields = [], object = {} }: { fields: string[], object: any }) => {
  return _.pick(object, fields);
}

export const getSelectData = (select: string[] = []) => {
  return Object.fromEntries(select.map(el => [el, 1]));
}

export const unGetSelectData = (select: string[] = []) => {
  return Object.fromEntries(select.map(el => [el, 0]));
}

export const removeUndefinedObject = (obj: any) => {
  Object.keys(obj).forEach((k: any) => {
    if (obj[k] == null) {
      delete obj[k];
    }
  })

  return obj;
}

const x = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  }
}

// {"b.c": 2, "b.d": 3}

export const updateNestedObjectParser = (obj: any, prefix = "") => {
  const result = {};
  Object.keys(obj).forEach(key => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] === null || obj[key] === undefined) {
      console.log(`ingore key`, key);
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      Object.assign(result, updateNestedObjectParser(obj[key], newKey));
    } else {
      // @ts-ignore
      result[newKey] = obj[key];
    }
  });

  return result;
};

// export const updateNestedObjectParser = (obj: any) => {
//   const final = {};

//   Object.keys(obj).forEach((k: any) => {
//     if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
//       const response = updateNestedObjectParser(obj[k]);
//       Object.keys(response).forEach(a => {
//         // @ts-ignore
//         final[`${k}.${a}`] = response[a];
//       })
//     } else {
//       // @ts-ignore
//       final[k] = obj[k]
//     }
//   })

//   return final;
// }