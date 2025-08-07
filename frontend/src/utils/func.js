export const BASE_URL = import.meta.env.VITE_API_URL ;

export function renderFallBack(name) {
  try {
    console.log("name...........", name);

    let names = name.split(" ");
    console.log(names);

    return (names[0][0] + names[1][0]).toUpperCase();
  } catch (err) {
    return name[0];
  }
}

export function formatterDate(D) {
  const date = new Date(D);
  const formatted = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
  return formatted; // 06-08-2025
}
