import { query } from '../db/connection';
import type { Review } from '@zoo/types';

export class ReviewRepository {
  // Create a new review
  async create(reviewData: {
    bookingId: string;
    customerId: string;
    serviceId: string;
    beauticianId: string;
    providerId: string;
    rating: number;
    comment: string;
    images?: string[];
  }): Promise<Review> {
    const result = await query(
      `INSERT INTO reviews (
        booking_id, customer_id, service_id, beautician_id, provider_id,
        rating, comment, images
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        reviewData.bookingId,
        reviewData.customerId,
        reviewData.serviceId,
        reviewData.beauticianId,
        reviewData.providerId,
        reviewData.rating,
        reviewData.comment,
        reviewData.images || [],
      ]
    );

    return this.mapToReview(result.rows[0]);
  }

  // Get review by ID
  async findById(id: string): Promise<Review | null> {
    const result = await query('SELECT * FROM reviews WHERE id = $1', [id]);
    return result.rows[0] ? this.mapToReview(result.rows[0]) : null;
  }

  // Get review by booking ID
  async findByBookingId(bookingId: string): Promise<Review | null> {
    const result = await query('SELECT * FROM reviews WHERE booking_id = $1', [bookingId]);
    return result.rows[0] ? this.mapToReview(result.rows[0]) : null;
  }

  // Get all reviews with filters
  async findAll(filters?: {
    customerId?: string;
    serviceId?: string;
    beauticianId?: string;
    providerId?: string;
    minRating?: number;
    maxRating?: number;
  }): Promise<Review[]> {
    let sql = 'SELECT * FROM reviews WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.customerId) {
      sql += ` AND customer_id = $${paramIndex++}`;
      params.push(filters.customerId);
    }

    if (filters?.serviceId) {
      sql += ` AND service_id = $${paramIndex++}`;
      params.push(filters.serviceId);
    }

    if (filters?.beauticianId) {
      sql += ` AND beautician_id = $${paramIndex++}`;
      params.push(filters.beauticianId);
    }

    if (filters?.providerId) {
      sql += ` AND provider_id = $${paramIndex++}`;
      params.push(filters.providerId);
    }

    if (filters?.minRating !== undefined) {
      sql += ` AND rating >= $${paramIndex++}`;
      params.push(filters.minRating);
    }

    if (filters?.maxRating !== undefined) {
      sql += ` AND rating <= $${paramIndex++}`;
      params.push(filters.maxRating);
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return result.rows.map(row => this.mapToReview(row));
  }

  // Update review
  async update(id: string, reviewData: Partial<{
    rating: number;
    comment: string;
    images: string[];
    response: string;
  }>): Promise<Review | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (reviewData.rating !== undefined) {
      fields.push(`rating = $${paramIndex++}`);
      values.push(reviewData.rating);
    }
    if (reviewData.comment !== undefined) {
      fields.push(`comment = $${paramIndex++}`);
      values.push(reviewData.comment);
    }
    if (reviewData.images !== undefined) {
      fields.push(`images = $${paramIndex++}`);
      values.push(reviewData.images);
    }
    if (reviewData.response !== undefined) {
      fields.push(`response = $${paramIndex++}`);
      values.push(reviewData.response);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const result = await query(
      `UPDATE reviews SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );

    return result.rows[0] ? this.mapToReview(result.rows[0]) : null;
  }

  // Increment helpful count
  async incrementHelpful(id: string): Promise<Review | null> {
    const result = await query(
      'UPDATE reviews SET helpful = helpful + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] ? this.mapToReview(result.rows[0]) : null;
  }

  // Delete review
  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM reviews WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Get recent reviews for a service
  async findRecentByService(serviceId: string, limit: number = 10): Promise<Review[]> {
    const result = await query(
      'SELECT * FROM reviews WHERE service_id = $1 ORDER BY created_at DESC LIMIT $2',
      [serviceId, limit]
    );
    return result.rows.map(row => this.mapToReview(row));
  }

  // Get average rating for a service
  async getAverageRatingByService(serviceId: string): Promise<number> {
    const result = await query(
      'SELECT AVG(rating)::DECIMAL(3,2) as avg_rating FROM reviews WHERE service_id = $1',
      [serviceId]
    );
    return result.rows[0]?.avg_rating ? parseFloat(result.rows[0].avg_rating) : 0;
  }

  // Get review statistics for a provider
  async getProviderStatistics(providerId: string): Promise<{
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { rating: number; count: number }[];
  }> {
    const totalResult = await query(
      `SELECT COUNT(*) as total, AVG(rating)::DECIMAL(3,2) as avg_rating 
       FROM reviews WHERE provider_id = $1`,
      [providerId]
    );

    const distributionResult = await query(
      `SELECT rating, COUNT(*) as count 
       FROM reviews 
       WHERE provider_id = $1 
       GROUP BY rating 
       ORDER BY rating DESC`,
      [providerId]
    );

    return {
      totalReviews: parseInt(totalResult.rows[0]?.total || '0'),
      averageRating: parseFloat(totalResult.rows[0]?.avg_rating || '0'),
      ratingDistribution: distributionResult.rows.map(row => ({
        rating: row.rating,
        count: parseInt(row.count),
      })),
    };
  }

  // Helper method to map database row to Review type
  private mapToReview(row: any): Review {
    return {
      id: row.id,
      bookingId: row.booking_id,
      customerId: row.customer_id,
      serviceId: row.service_id,
      beauticianId: row.beautician_id,
      providerId: row.provider_id,
      rating: row.rating,
      comment: row.comment,
      images: row.images || [],
      response: row.response,
      helpful: row.helpful,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const reviewRepository = new ReviewRepository();
