import { LiveFlightResponse } from '../types';

export const flightService = {
  async getLiveFlights(
    airportCode: string = 'DAD',
    type: 'arrival' | 'departure' = 'arrival',
    forceRefresh: boolean = false
  ): Promise<LiveFlightResponse> {
    const url = `/api/flights/live?airport=${encodeURIComponent(airportCode)}&type=${encodeURIComponent(type)}${
      forceRefresh ? '&refresh=true' : ''
    }`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Flight request failed with status: ${res.status}`);
    }
    return res.json();
  }
};
