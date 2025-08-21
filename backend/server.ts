import express, { Request, Response } from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';

// ------------------- 앱 초기화 -------------------
const app = express();
app.use(express.json());
app.use(cors());

// ------------------- DB 초기화 -------------------
const dbPath = path.join(__dirname, '../db/local.db'); // DB 경로
const db = new Database(dbPath);

// 테이블 생성
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )
`).run();

// ------------------- 라우트 -------------------

// 모든 사용자 조회
app.get('/api/users', (req: Request, res: Response) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'DB 조회 실패' });
  }
});

// 새 사용자 생성
app.post('/api/users', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const info = db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
    res.json({ id: info.lastInsertRowid, name });
  } catch (err) {
    res.status(500).json({ error: '사용자 생성 실패' });
  }
});

// ------------------- 서버 시작 -------------------
const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
