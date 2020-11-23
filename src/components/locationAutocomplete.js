export default async function locationAutocomplete(queryString, city) {
  const results = await fetch(
    `https://api.entur.io/geocoder/v1/autocomplete?text=${queryString}&size=20&lang=no`
  );

  console.log(results);

  const { features } = await results.json();

  const busFeatures = features
    .filter(feature => {
      try {
        return (
          feature.properties.source_id.slice(0, 14) === 'NSR:StopPlace:' &&
          feature.properties.locality === city
        );
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
