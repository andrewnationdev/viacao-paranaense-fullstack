import { IRoutes } from "~/types/schema";

export default defineEventHandler(async (event): Promise<T> => {
  const query = getQuery(event);
  const selectedDate = query.date as string;

  const data: IRoutes[] = await $fetch('/api/get_routes');

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const limitTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  const availableTravels = data.filter(route => {
    if (selectedDate !== todayStr) return true;

    return route.departures.every(departure => {
      const [hours, minutes] = departure.time.split(':').map(Number);
      const departureDate = new Date(now);
      departureDate.setHours(hours!, minutes!, 0, 0);
      
      return departureDate > limitTime;
    });
  });

  return availableTravels
});