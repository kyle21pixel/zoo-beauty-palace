import { query } from '../db/connection';
import type { Booking } from '@zoo/types';

export class BookingRepository {
  // Create a new booking
  async create(bookingData: {
    customerId: string;
    serviceId: string;
    beauticianId: string;
    providerId: string;
    date: Date;
    startTime: string;
    endTime: string;
    location: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    notes?: string;
    price: number;
    paymentStatus?: string;
  }): Promise<Booking> {
    const result = await query(
      `INSERT INTO bookings (
        customer_id, service_id, beautician_id, provider_id,
        booking_date, start_time, end_time, status,
        location_street, location_city, location_state, location_zip_code, location_country,
        notes, price, payment_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        bookingData.customerId,
        bookingData.serviceId,
        bookingData.beauticianId,
        bookingData.providerId,
        bookingData.date,
        bookingData.startTime,
        bookingData.endTime,
        'pending',
        bookingData.location.street,
        bookingData.location.city,
        bookingData.location.state,
        bookingData.location.zipCode,
        bookingData.location.country,
        bookingData.notes,
        bookingData.price,
        bookingData.paymentStatus || 'pending',
      ]
    );

    return this.mapToBooking(result.rows[0]);
  }

  // Get booking by ID
  async findById(id: string): Promise<Booking | null> {
    const result = await query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0] ? this.mapToBooking(result.rows[0]) : null;
  }

  // Get all bookings with filters
  async findAll(filters?: {
    status?: string;
    customerId?: string;
    beauticianId?: string;
    providerId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Booking[]> {
    let sql = 'SELECT * FROM bookings WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      sql += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
    }

    if (filters?.customerId) {
      sql += ` AND customer_id = $${paramIndex++}`;
      params.push(filters.customerId);
    }

    if (filters?.beauticianId) {
      sql += ` AND beautician_id = $${paramIndex++}`;
      params.push(filters.beauticianId);
    }

    if (filters?.providerId) {
      sql += ` AND provider_id = $${paramIndex++}`;
      params.push(filters.providerId);
    }

    if (filters?.startDate) {
      sql += ` AND booking_date >= $${paramIndex++}`;
      params.push(filters.startDate);
    }

    if (filters?.endDate) {
      sql += ` AND booking_date <= $${paramIndex++}`;
      params.push(filters.endDate);
    }

    sql += ' ORDER BY booking_date DESC, start_time DESC';

    const result = await query(sql, params);
    return result.rows.map(row => this.mapToBooking(row));
  }

  // Update booking
  async update(id: string, bookingData: Partial<{
    status: string;
    date: Date;
    startTime: string;
    endTime: string;
    notes: string;
    paymentStatus: string;
    paymentId: string;
    rating: number;
    review: string;
  }>): Promise<Booking | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (bookingData.status) {
      fields.push(`status = $${paramIndex++}`);
      values.push(bookingData.status);
    }
    if (bookingData.date) {
      fields.push(`booking_date = $${paramIndex++}`);
      values.push(bookingData.date);
    }
    if (bookingData.startTime) {
      fields.push(`start_time = $${paramIndex++}`);
      values.push(bookingData.startTime);
    }
    if (bookingData.endTime) {
      fields.push(`end_time = $${paramIndex++}`);
      values.push(bookingData.endTime);
    }
    if (bookingData.notes !== undefined) {
      fields.push(`notes = $${paramIndex++}`);
      values.push(bookingData.notes);
    }
    if (bookingData.paymentStatus) {
      fields.push(`payment_status = $${paramIndex++}`);
      values.push(bookingData.paymentStatus);
    }
    if (bookingData.paymentId !== undefined) {
      fields.push(`payment_id = $${paramIndex++}`);
      values.push(bookingData.paymentId);
    }
    if (bookingData.rating !== undefined) {
      fields.push(`rating = $${paramIndex++}`);
      values.push(bookingData.rating);
    }
    if (bookingData.review !== undefined) {
      fields.push(`review = $${paramIndex++}`);
      values.push(bookingData.review);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const result = await query(
      `UPDATE bookings SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );

    return result.rows[0] ? this.mapToBooking(result.rows[0]) : null;
  }

  // Cancel booking
  async cancel(id: string): Promise<Booking | null> {
    return this.update(id, { status: 'cancelled' });
  }

  // Delete booking
  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM bookings WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Get upcoming bookings for a customer
  async findUpcomingByCustomer(customerId: string): Promise<Booking[]> {
    const result = await query(
      `SELECT * FROM bookings 
       WHERE customer_id = $1 
       AND booking_date >= CURRENT_DATE
       AND status NOT IN ('cancelled', 'completed')
       ORDER BY booking_date ASC, start_time ASC`,
      [customerId]
    );
    return result.rows.map(row => this.mapToBooking(row));
  }

  // Get upcoming bookings for a beautician
  async findUpcomingByBeautician(beauticianId: string): Promise<Booking[]> {
    const result = await query(
      `SELECT * FROM bookings 
       WHERE beautician_id = $1 
       AND booking_date >= CURRENT_DATE
       AND status NOT IN ('cancelled', 'completed')
       ORDER BY booking_date ASC, start_time ASC`,
      [beauticianId]
    );
    return result.rows.map(row => this.mapToBooking(row));
  }

  // Get bookings statistics
  async getStatistics(filters?: {
    providerId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    let sql = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled,
        COALESCE(SUM(price) FILTER (WHERE status = 'completed'), 0) as total_revenue
      FROM bookings
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.providerId) {
      sql += ` AND provider_id = $${paramIndex++}`;
      params.push(filters.providerId);
    }

    if (filters?.startDate) {
      sql += ` AND booking_date >= $${paramIndex++}`;
      params.push(filters.startDate);
    }

    if (filters?.endDate) {
      sql += ` AND booking_date <= $${paramIndex++}`;
      params.push(filters.endDate);
    }

    const result = await query(sql, params);
    const row = result.rows[0];

    return {
      total: parseInt(row.total),
      pending: parseInt(row.pending),
      confirmed: parseInt(row.confirmed),
      completed: parseInt(row.completed),
      cancelled: parseInt(row.cancelled),
      totalRevenue: parseFloat(row.total_revenue),
    };
  }

  // Helper method to map database row to Booking type
  private mapToBooking(row: any): Booking {
    return {
      id: row.id,
      customerId: row.customer_id,
      serviceId: row.service_id,
      beauticianId: row.beautician_id,
      providerId: row.provider_id,
      date: new Date(row.booking_date),
      startTime: row.start_time,
      endTime: row.end_time,
      status: row.status,
      location: {
        street: row.location_street,
        city: row.location_city,
        state: row.location_state,
        zipCode: row.location_zip_code,
        country: row.location_country,
      },
      notes: row.notes,
      price: parseFloat(row.price),
      paymentStatus: row.payment_status,
      paymentId: row.payment_id,
      rating: row.rating,
      review: row.review,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const bookingRepository = new BookingRepository();
