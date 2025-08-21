import pool from '../db';

export interface User {
  id?: number;
  name: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows as User[];
};

export const createUser = async (name: string): Promise<number> => {
  const [result] = await pool.query('INSERT INTO users (name) VALUES (?)', [name]);
  const insertResult = result as any;
  return insertResult.insertId;
};
