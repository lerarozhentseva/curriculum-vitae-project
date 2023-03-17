const formatDate = (date?: Date) => {
  const toFormat = date ?? new Date();
  return `${toFormat.getFullYear()}-${('' + (toFormat.getMonth() + 1)).padStart(2, '0')}-${(
    '' + toFormat.getDate()
  ).padStart(2, '0')}`;
};

export default formatDate;
