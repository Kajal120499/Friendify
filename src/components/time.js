export const timeAgo = createdTimestamp => {
  const now = new Date();
  const createdDate = new Date(createdTimestamp);
  const timeDifference = createdDate - now;

  const absoluteDifference = Math.abs(timeDifference) / 1000;

  if (absoluteDifference < 60) {
    return `${Math.floor(absoluteDifference)} ${
      Math.floor(absoluteDifference) === 1 ? 'second' : 'seconds'
    } ago`;
  }

  const minutes = Math.floor(absoluteDifference / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${
      minutes % 60
    } minutes ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};