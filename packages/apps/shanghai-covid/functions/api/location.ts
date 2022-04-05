function bd09_to_gc102(lng, lat) {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  const x = lng - 0.0065;
  const y = lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

  const _lng = z * Math.cos(theta);
  const _lat = z * Math.sin(theta);
  return [_lng, _lat];
}

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
  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);
  console.log(cf);
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
