export function shuffle(array) {
  return array.reduce(
    (acc, _, i) => {
      // Generate a random index
      const random = Math.floor(Math.random() * (acc.length - i)) + i;

      // Swap the element with random index element
      [acc[i], acc[random]] = [acc[random], acc[i]];

      return acc;
    },
    [...array] // Initialize accumulator as shoallow copy of given array
  );
}

export function getStoredItem(key, defaultValue = null) {
  const storedItem = localStorage.getItem(key);
  return storedItem ? JSON.parse(storedItem) : defaultValue;
}

export function setStoredItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
