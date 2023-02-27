import { query } from '../db/index.js';

const dbgetData = async () => {
  const { rows } = await query(
    'select id,name, (select array_agg(image) as "image" from images where id = e.id),cal,price,trating,arating from energys e;',
  );
  return rows;
};
const dbgetDetail = async (id) => {
  const { rows } = await query('SELECT * from energys where id=$1;', [id]);
  return rows;
};
const dbAddImg = async (id, file) => {
  await query('INSERT INTO images (id,image) VALUES ($1,$2) returning *', [id, file]);
};
export { dbgetData, dbgetDetail, dbAddImg };
