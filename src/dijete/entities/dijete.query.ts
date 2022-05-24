export const assignGroup = (groupId: number, childId: number): string => {
  return `UPDATE Dijete SET idGrupa = ${groupId} WHERE idDijete = ${childId};`;
};

export const removeGroup = (childId: number): string => {
  return `UPDATE Dijete SET idgrupa = null WHERE iddijete = ${childId};`;
};
