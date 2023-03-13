export const timeFormatter = (timeInput) => {
  let timeAgo;
  const time = Math.floor(Date.now() - Date.parse(timeInput));
  const date = new Date(timeInput).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (time < 60000) {
    timeAgo = `Now`;
  } else if (time < 3600000) {
    timeAgo = `${Math.floor(time / 60000)} min`;
  } else if (time < 36000000) {
    timeAgo = `${Math.floor(time / 3600000)} hr`;
  } else {
    timeAgo = `${date}, ${new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return timeAgo;
};
