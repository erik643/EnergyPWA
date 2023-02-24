import { query } from '../db/index.js';

const dbgetData = async () => {
  const { rows } = await query('SELECT * from energys;');
  return rows;
};
const dbgetDetail = async (id) => {
  const { rows } = await query('SELECT * from energys where id=$1;', [id]);
  return rows;
};

export { dbgetData, dbgetDetail };
