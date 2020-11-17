import moment from 'moment';

async function formatDateToAPI(date) {
   const day = String(date[0]) + String(date[1]);
   const month = String(date[3]) + String(date[4]);
   const year = String(date[6]) + String(date[7]) + String(date[8]) + String(date[9]);
   
   const dateFormated = await moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');

   return dateFormated;
}

export default formatDateToAPI;