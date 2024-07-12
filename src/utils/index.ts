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