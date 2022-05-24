export const assignDisease = (diseaseId: number, childId: number): string => {
  return `INSERT INTO DijeteBolest(idBolest, idDijete) VALUES (${diseaseId}, ${childId});`;
};
