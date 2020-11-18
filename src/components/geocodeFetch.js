export default async function geocodeFetch(address) {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );
  const data = result.json();
  return data;
}
