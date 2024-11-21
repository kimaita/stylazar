const formatDate = (timestamp, withTime = false) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(withTime && { hour: "numeric", minute: "2-digit", hour12: true }),
  };
  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", options);
};

export default formatDate;
