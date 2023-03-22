import { query } from '../db/index.js';

export const dbgetData = async () => {
  const { rows } = await query(
    'select id,name, (select array_agg(image) as "image" from images where id = e.id),cal,price,trating,arating from energys e;',
  );
  return rows;
};

export const dbgetallRevs = async () => {
  const { rows } = await query(
    'select * from images ;',
  );
  return rows;
};

export const dbgetDetail = async (id) => {
  const { rows } = await query(
    `select id,name, (select json_agg(json_build_object('image', image, 'title', title,'review',review,'taste',trating,'overall'
    ,arating,'userid',userid,'revid',revid)) AS "reviews" from images where id = e.id)
    from energys e join images i using(id) where id = $1; `,
    [id],
  );
  return rows[0];
};
export const dbAddImg = async (id, file, body) => {
  await query(
    'INSERT INTO images (id,image,userid,review,title,trating,arating) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *',
    [id, file, body.userid, body.review, body.title, body.trating, body.arating],
  );
};

export const dbAddUser = async (obj) => {
  const { rows } = await query(
    'INSERT INTO accounts (firstname,username,pwd,salt) VALUES ($1,$2,$3,$4) returning *',
    [obj.firstname, obj.username, obj.pwd, obj.salt],
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

export const delrev = async (id) => {
  const { rows } = await query('DELETE FROM images WHERE revid=$1 returning *', [id]);
  return rows;
};

export const getsalt = async (obj) => {
  const { rows } = await query('select salt from accounts where username = $1;', [obj]);
  return rows[0];
};
