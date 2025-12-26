import { query, getClient } from '../db/connection';
import type { User } from '@zoo/types';
import bcrypt from 'bcrypt';

export class UserRepository {
  // Create a new user
  async create(userData: {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar?: string;
    role: 'customer' | 'provider' | 'beautician' | 'admin';
  }): Promise<User> {
    const passwordHash = userData.password 
      ? await bcrypt.hash(userData.password, 10) 
      : null;

    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, avatar, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, first_name, last_name, phone, avatar, role, created_at, updated_at`,
      [userData.email, passwordHash, userData.firstName, userData.lastName, 
       userData.phone, userData.avatar, userData.role]
    );

    return this.mapToUser(result.rows[0]);
  }

  // Get user by ID
  async findById(id: string): Promise<User | null> {
    const result = await query(
      'SELECT id, email, first_name, last_name, phone, avatar, role, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );

    return result.rows[0] ? this.mapToUser(result.rows[0]) : null;
  }

  // Get user by email
  async findByEmail(email: string): Promise<User | null> {
    const result = await query(
      'SELECT id, email, first_name, last_name, phone, avatar, role, created_at, updated_at FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0] ? this.mapToUser(result.rows[0]) : null;
  }

  // Get all users with optional role filter
  async findAll(role?: string): Promise<User[]> {
    let sql = 'SELECT id, email, first_name, last_name, phone, avatar, role, created_at, updated_at FROM users';
    const params: any[] = [];

    if (role) {
      sql += ' WHERE role = $1';
      params.push(role);
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return result.rows.map(row => this.mapToUser(row));
  }

  // Update user
  async update(id: string, userData: Partial<{
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string;
  }>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (userData.email) {
      fields.push(`email = $${paramIndex++}`);
      values.push(userData.email);
    }
    if (userData.firstName) {
      fields.push(`first_name = $${paramIndex++}`);
      values.push(userData.firstName);
    }
    if (userData.lastName) {
      fields.push(`last_name = $${paramIndex++}`);
      values.push(userData.lastName);
    }
    if (userData.phone) {
      fields.push(`phone = $${paramIndex++}`);
      values.push(userData.phone);
    }
    if (userData.avatar !== undefined) {
      fields.push(`avatar = $${paramIndex++}`);
      values.push(userData.avatar);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const result = await query(
      `UPDATE users SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, email, first_name, last_name, phone, avatar, role, created_at, updated_at`,
      values
    );

    return result.rows[0] ? this.mapToUser(result.rows[0]) : null;
  }

  // Delete user
  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Verify password
  async verifyPassword(email: string, password: string): Promise<User | null> {
    const result = await query(
      'SELECT id, email, password_hash, first_name, last_name, phone, avatar, role, created_at, updated_at FROM users WHERE email = $1',
      [email]
    );

    if (!result.rows[0]) {
      return null;
    }

    const isValid = await bcrypt.compare(password, result.rows[0].password_hash);
    if (!isValid) {
      return null;
    }

    return this.mapToUser(result.rows[0]);
  }

  // Helper method to map database row to User type
  private mapToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      avatar: row.avatar,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const userRepository = new UserRepository();
