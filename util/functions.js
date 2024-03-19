const dateFormatter = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonth() returns month from 0-11, so add 1
  let day = date.getDate();

  // Pad month and day with leading zeros if necessary
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

module.exports = dateFormatter;
