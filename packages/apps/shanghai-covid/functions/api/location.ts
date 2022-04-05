import coordtransform from 'coordtransform';

const wsg84_to_gcj02 = (lng, lat) => coordtransform.wgs84togcj02(lng, lat);

export async function onRequest(context) {
  const {
    request: { cf },
  } = context;
  const {
    longitude,
    latitude,
    country,
    city,
    timezone,
    region,
    regionCode,
    asOrganization,
  } = cf;

  const [lng, lat] = wsg84_to_gcj02(longitude, latitude);

  return new Response(
    JSON.stringify({
      lng,
      lat,
      country,
      city,
      timezone,
      region,
      regionCode,
      asOrganization,
    })
  );
}
