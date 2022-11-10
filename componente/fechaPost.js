export const dateTime = () => {
  const datePost = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const timePost = {
    hour12: 'true',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date().toLocaleDateString('es-Es', datePost);
  const time = new Date().toLocaleTimeString('es-Es', timePost);
  const dateTimeActual = `${date} - ${time}`;

  return dateTimeActual;
};
