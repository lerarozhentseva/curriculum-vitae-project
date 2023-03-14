const formatDate = (date?: Date) => {
  const toFormat = date ?? new Date();
  return `${toFormat.getFullYear()}-${toFormat.getMonth()}-${toFormat.getDate()}`;
};

export default formatDate;
