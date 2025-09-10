import { NUMBER_OF_QUESTIONS_PER_LEVEL } from './config';

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

export function getQuestionsPerLevel(level, allQuestions) {
  const startIndex = level * NUMBER_OF_QUESTIONS_PER_LEVEL;
  const endIndex = startIndex + NUMBER_OF_QUESTIONS_PER_LEVEL;

  return allQuestions.filter((item, index) => {
    return index >= startIndex && index < endIndex;
  });
}

export function findSearchTerms(text, searchTerm) {
  if (!searchTerm || searchTerm.length < 3 || searchTerm === '') return [];
  const foundStrings = searchTerm
    .toLowerCase()
    .replace(/[^a-z ]/g, '')
    .split(' ')
    .filter((s) => s !== '' && text.toLowerCase().includes(s));

  return foundStrings;
}

export function hasSearchTerms(text, searchTerm) {
  if (!searchTerm || searchTerm.length < 3 || searchTerm === '') return [];
  const foundStrings = searchTerm
    .toLowerCase()
    .replace(/[^a-z ]/g, '')
    .split(' ')
    .filter((s) => s !== '' && text.toLowerCase().includes(s));

  return foundStrings;
}
