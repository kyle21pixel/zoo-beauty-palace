import { query } from '../db/connection';
import type { Service } from '@zoo/types';

export class ServiceRepository {
  // Create a new service
  async create(serviceData: {
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    providerId: string;
    images?: string[];
    tags?: string[];
    available?: boolean;
  }): Promise<Service> {
    const result = await query(
      `INSERT INTO services (name, description, category, price, duration, provider_id, images, tags, available)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        serviceData.name,
        serviceData.description,
        serviceData.category,
        serviceData.price,
        serviceData.duration,
        serviceData.providerId,
        serviceData.images || [],
        serviceData.tags || [],
        serviceData.available !== undefined ? serviceData.available : true,
      ]
    );

    return this.mapToService(result.rows[0]);
  }

  // Get service by ID
  async findById(id: string): Promise<Service | null> {
    const result = await query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0] ? this.mapToService(result.rows[0]) : null;
  }

  // Get all services with filters
  async findAll(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    providerId?: string;
    available?: boolean;
  }): Promise<Service[]> {
    let sql = 'SELECT * FROM services WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.category && filters.category !== 'all') {
      sql += ` AND category = $${paramIndex++}`;
      params.push(filters.category);
    }

    if (filters?.minPrice !== undefined) {
      sql += ` AND price >= $${paramIndex++}`;
      params.push(filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      sql += ` AND price <= $${paramIndex++}`;
      params.push(filters.maxPrice);
    }

    if (filters?.search) {
      sql += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    if (filters?.providerId) {
      sql += ` AND provider_id = $${paramIndex++}`;
      params.push(filters.providerId);
    }

    if (filters?.available !== undefined) {
      sql += ` AND available = $${paramIndex++}`;
      params.push(filters.available);
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return result.rows.map(row => this.mapToService(row));
  }

  // Update service
  async update(id: string, serviceData: Partial<{
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    images: string[];
    tags: string[];
    available: boolean;
  }>): Promise<Service | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (serviceData.name) {
      fields.push(`name = $${paramIndex++}`);
      values.push(serviceData.name);
    }
    if (serviceData.description) {
      fields.push(`description = $${paramIndex++}`);
      values.push(serviceData.description);
    }
    if (serviceData.category) {
      fields.push(`category = $${paramIndex++}`);
      values.push(serviceData.category);
    }
    if (serviceData.price !== undefined) {
      fields.push(`price = $${paramIndex++}`);
      values.push(serviceData.price);
    }
    if (serviceData.duration !== undefined) {
      fields.push(`duration = $${paramIndex++}`);
      values.push(serviceData.duration);
    }
    if (serviceData.images) {
      fields.push(`images = $${paramIndex++}`);
      values.push(serviceData.images);
    }
    if (serviceData.tags) {
      fields.push(`tags = $${paramIndex++}`);
      values.push(serviceData.tags);
    }
    if (serviceData.available !== undefined) {
      fields.push(`available = $${paramIndex++}`);
      values.push(serviceData.available);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const result = await query(
      `UPDATE services SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );

    return result.rows[0] ? this.mapToService(result.rows[0]) : null;
  }

  // Delete service
  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM services WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Get services by provider
  async findByProvider(providerId: string): Promise<Service[]> {
    const result = await query(
      'SELECT * FROM services WHERE provider_id = $1 ORDER BY created_at DESC',
      [providerId]
    );
    return result.rows.map(row => this.mapToService(row));
  }

  // Get popular services (by rating and review count)
  async findPopular(limit: number = 10): Promise<Service[]> {
    const result = await query(
      `SELECT * FROM services 
       WHERE available = true 
       ORDER BY rating DESC, review_count DESC 
       LIMIT $1`,
      [limit]
    );
    return result.rows.map(row => this.mapToService(row));
  }

  // Helper method to map database row to Service type
  private mapToService(row: any): Service {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      price: parseFloat(row.price),
      duration: row.duration,
      providerId: row.provider_id,
      images: row.images || [],
      tags: row.tags || [],
      available: row.available,
      rating: parseFloat(row.rating),
      reviewCount: row.review_count,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const serviceRepository = new ServiceRepository();
