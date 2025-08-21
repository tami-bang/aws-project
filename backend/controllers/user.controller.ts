import { Request, Response } from 'express';
import db from '../db/index';
import { User } from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.json(rows);
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body as User;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.json({ id: (result as any).insertId, name });
};