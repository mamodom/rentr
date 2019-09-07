export default function nextMondayAt9AM() {
  const nextMonday9AM = new Date();
  nextMonday9AM.setUTCHours(7, 0, 0);
  nextMonday9AM.setDate(
    nextMonday9AM.getDate() + ((7 - nextMonday9AM.getDay()) % 7) + 1
  );
  return nextMonday9AM;
}
