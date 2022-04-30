type LocationType = {
  lng: number;
  lat: number;
  country: string;
  city: string;
  timezone: string;
  region: string;
  regionCode: string;
  asOrganization: string;
};

export const getLocation = (): Promise<LocationType> =>
  new Promise((resolve) => {
    fetch('/api/location')
      .then((data) => data.json())
      .then((data) => resolve(data as LocationType))
      .catch((err) => console.error(err));
  });
