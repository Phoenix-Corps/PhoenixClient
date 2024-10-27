// shinobiConfig.ts

export interface ShinobiLevel {
  level: number;
  name: string;
  percentage: number;
}

export const shinobiLevels: ShinobiLevel[] = [
  { level: 0, name: "Shinobi", percentage: 3.5 },
  { level: 1, name: "Genin", percentage: 4 },
  { level: 2, name: "1st class Genin", percentage: 4.5 },
  { level: 3, name: "2nd class Genin", percentage: 5 },
  { level: 4, name: "Assistant Chunin", percentage: 5.5 },
  { level: 5, name: "Chunin", percentage: 6 },
  { level: 6, name: "Chunin 1st class", percentage: 6.5 },
  { level: 7, name: "Chunin 2nd class", percentage: 7 },
  { level: 8, name: "Chunin 3rd class", percentage: 8 },
  { level: 9, name: "Assistant Jounin", percentage: 9 },
  { level: 10, name: "Jounin", percentage: 10 },
  { level: 11, name: "Jounin 1st class", percentage: 11 },
  { level: 12, name: "Jounin 2nd class", percentage: 12 },
  { level: 13, name: "Jounin 3rd class", percentage: 13 },
  { level: 14, name: "Jounin 4th class", percentage: 14 },
  { level: 15, name: "Densetsu no Shinobi", percentage: 15 },
  { level: 16, name: "Kage", percentage: 16.5 },
  { level: 17, name: "Daimyo", percentage: 18 }
];

export const getShinobiLevelInfo = (level: number): ShinobiLevel => {
  return shinobiLevels[level] || shinobiLevels[0]; // Default to first level if out of range
};
