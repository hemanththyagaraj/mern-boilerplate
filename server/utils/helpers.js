exports.convertGmtToIst = (gmt = new Date()) => {
  const date = gmt;
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);

  return date;
};
