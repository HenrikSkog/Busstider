export default async function locationAutocomplete(queryString) {
  const results = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.entur.io/geocoder/v1/autocomplete?text=${queryString}&size=20&lang=no`,
    {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
        'content-type': 'application/json;charset=utf-8',
        expires: '0',
        pragma: 'no-cache',
      },
    }
  );

  const { features } = await results.json();

  const busFeatures = features
    .filter(feature => {
      try {
        return feature.properties.category[0] === 'onstreetBus';
      } catch (e) {
        return false;
      }
    })
    .map(busFeature => {
      return {
        id: busFeature.properties.id,
        name: busFeature.properties.name,
        city: busFeature.properties.locality,
      };
    });

  return busFeatures;
}
