export default function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', weekday: 'long' };
  return date.toLocaleDateString('es-MX', options);
}