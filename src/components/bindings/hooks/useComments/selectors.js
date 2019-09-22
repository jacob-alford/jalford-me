export const transformComments = data =>
  Object.keys(data)
        .map(key => data[key])
        .filter(key => key !== null);
