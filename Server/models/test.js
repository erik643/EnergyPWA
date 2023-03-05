import { query } from '../db/index.js';

export const dbgetData = async () => {
  const { rows } = await query(
    'select id,name, (select array_agg(image) as "image" from images where id = e.id),cal,price,trating,arating from energys e;',
  );
  return rows;
};
export const dbgetDetail = async (id) => {
  const { rows } = await query(
    'select id,name, (select array_agg(image) as "image" from images where id = e.id),cal,price,trating,arating from energys e where id=$1;',
    [id],
  );
  return rows[0];
};
export const dbAddImg = async (id, file) => {
  await query('INSERT INTO images (id,image) VALUES ($1,$2) returning *', [id, file]);
};

export const dbAddUser = async (obj) => {
  const { rows } = await query(
    'INSERT INTO accounts (firstname,username,pwd) VALUES ($1,$2,$3) returning *',
    [obj.firstname, obj.username, obj.pwd],
  );
  return rows[0];
};
export const dbgetUser = async (obj) => {
  const { rows } = await query('select * from accounts where username = $1 AND pwd=$2;', [
    obj.username,
    obj.pwd,
  ]);
  return rows[0];
};
export const dbgetAllUsers = async () => {
  const { rows } = await query('select username from accounts;');
  return rows;
};
