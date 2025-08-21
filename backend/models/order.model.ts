import pool from '../db';

export interface Order {
  id?: number;
  userId: number;
  product: string;
  amount: number;
}

export const getAllOrders = async (): Promise<Order[]> => {
  const [rows] = await pool.query('SELECT * FROM orders');
  return rows as Order[];
};

export const createOrder = async (order: Order): Promise<number> => {
  const [result] = await pool.query(
    'INSERT INTO orders (userId, product, amount) VALUES (?, ?, ?)',
    [order.userId, order.product, order.amount]
  );
  const insertResult = result as any;
  return insertResult.insertId;
};

export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const [rows] = await pool.query('SELECT * FROM orders WHERE userId = ?', [userId]);
  return rows as Order[];
};
