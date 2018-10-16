export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Communications Services" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Consumer Discreationary" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Consumer Staples" },
  { _id: "5b21ca3eeb7f6fbccd471800", name: "Energy" },
  { _id: "5b21ca3eeb7f6fbccd471801", name: "Financials" },
  { _id: "5b21ca3eeb7f6fbccd471802", name: "Health Care" },
  { _id: "5b21ca3eeb7f6fbccd471803", name: "Industrials" },
  { _id: "5b21ca3eeb7f6fbccd471804", name: "Materials" },
  { _id: "5b21ca3eeb7f6fbccd471805", name: "Real Estate" },
  { _id: "5b21ca3eeb7f6fbccd471806", name: "Utilities" }
];

export function getGenres() {
  return genres.filter(g => g);
}
