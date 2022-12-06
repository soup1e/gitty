const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM posts
        `
    );
    return rows.map((row) => new Post(row));
  }

  static async insert(post) {
    const { rows } = await pool.query(
      `
        INSERT INTO posts (text)
        VALUES ($1)
        RETURNING *
        `,
      [post.text]
    );
    return rows.map((row) => new Post(row));
  }
};
