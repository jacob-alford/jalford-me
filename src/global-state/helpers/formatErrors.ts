const hasProperty = (obj: any, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

const formatErrors = (err: any): string => {
  if (typeof err === 'string') return err;
  if (err.errors && Array.isArray(err.errors))
    return err.errors.map((e: any) => formatErrors(e)).join('; ');
  if (hasProperty(err, 'toString')) return err.toString();
  if (err.message) return formatErrors(err.message);
  if (err.error) return formatErrors(err.error);
  if (err.data) return formatErrors(err.data);
  return JSON.stringify(err);
};

export default formatErrors;
