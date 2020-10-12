export function orderByDate(indexA: any, indexB: any) {

  const dateA: any = new Date(indexA.publi_date);
  const dateB: any = new Date(indexB.publi_date);

  return dateA - dateB;

};