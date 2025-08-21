import { Request, Response } from 'express';
import db from '../db/index';
import { Order } from '../models/order.model';

export const getOrders = async (req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM orders');
  res.json(rows);
};

export const createOrder = async (req: Request, res: Response) => {
  const { user_id, restaurant_id, menu, status } = req.body as Order;
  const [result] = await db.query(
    'INSERT INTO orders (user_id, restaurant_id, menu, status) VALUES (?, ?, ?, ?)',
    [user_id, restaurant_id, menu, status]
  );
  res.json({ id: (result as any).insertId, ...req.body });
};