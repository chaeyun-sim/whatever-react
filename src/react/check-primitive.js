export const isPrimitiveType = node => {
  return typeof node === 'string' || typeof node === 'number';
};
