import { pool } from './connection';
import { userRepository } from '../repositories/UserRepository';
import { serviceRepository } from '../repositories/ServiceRepository';
import { bookingRepository } from '../repositories/BookingRepository';
import { reviewRepository } from '../repositories/ReviewRepository';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...\n');
  
  try {
    // Create Users
    console.log('👥 Creating users...');
    
    const customer = await userRepository.create({
      email: 'sarah@example.com',
      password: 'password123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1-555-0101',
      avatar: '👩',
      role: 'customer',
    });
    console.log(`  ✓ Customer created: ${customer.firstName} ${customer.lastName}`);
    
    const provider = await userRepository.create({
      email: 'contact@glamour.com',
      password: 'password123',
      firstName: 'Glamour',
      lastName: 'Studio',
      phone: '+1-555-0102',
      avatar: '💇‍♀️',
      role: 'provider',
    });
    console.log(`  ✓ Provider created: ${provider.firstName} ${provider.lastName}`);
    
    const beautician = await userRepository.create({
      email: 'emily@example.com',
      password: 'password123',
      firstName: 'Emily',
      lastName: 'Chen',
      phone: '+1-555-0103',
      avatar: '💅',
      role: 'beautician',
    });
    console.log(`  ✓ Beautician created: ${beautician.firstName} ${beautician.lastName}\n`);
    
    // Create provider profile
    await pool.query(
      `INSERT INTO providers (user_id, business_name, description, address_street, address_city, address_state, address_zip_code, address_country, verified)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        provider.id,
        'Glamour Studio',
        'Premier beauty salon offering luxury services',
        '123 Beauty Lane',
        'New York',
        'NY',
        '10001',
        'USA',
        true,
      ]
    );
    
    // Create beautician profile
    await pool.query(
      `INSERT INTO beauticians (user_id, provider_id, bio, specialties, experience, available)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        beautician.id,
        provider.id,
        'Experienced beautician with 5+ years in the industry',
        ['nails', 'hair', 'makeup'],
        5,
        true,
      ]
    );
    
    // Create customer profile
    await pool.query(
      `INSERT INTO customers (user_id, address_street, address_city, address_state, address_zip_code, address_country)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        customer.id,
        '456 Customer St',
        'New York',
        'NY',
        '10002',
        'USA',
      ]
    );
    
    // Create Services
    console.log('💅 Creating services...');
    
    const hairService = await serviceRepository.create({
      name: 'Luxury Hair Treatment',
      description: 'Deep conditioning treatment with premium products for silky smooth hair',
      category: 'hair',
      price: 150,
      duration: 90,
      providerId: provider.id,
      images: ['🎨'],
      tags: ['luxury', 'conditioning', 'treatment'],
      available: true,
    });
    console.log(`  ✓ Service created: ${hairService.name}`);
    
    const nailService = await serviceRepository.create({
      name: 'Classic Manicure & Pedicure',
      description: 'Complete nail care with polish, shaping, and cuticle treatment',
      category: 'nails',
      price: 75,
      duration: 60,
      providerId: provider.id,
      images: ['💅'],
      tags: ['manicure', 'pedicure', 'classic'],
      available: true,
    });
    console.log(`  ✓ Service created: ${nailService.name}`);
    
    const makeupService = await serviceRepository.create({
      name: 'Bridal Makeup Package',
      description: 'Complete bridal makeup with trial session and hair styling',
      category: 'makeup',
      price: 250,
      duration: 120,
      providerId: provider.id,
      images: ['💄'],
      tags: ['bridal', 'makeup', 'special'],
      available: true,
    });
    console.log(`  ✓ Service created: ${makeupService.name}`);
    
    const facialService = await serviceRepository.create({
      name: 'Hydrating Facial',
      description: 'Deep cleansing and hydrating facial for glowing skin',
      category: 'skincare',
      price: 120,
      duration: 75,
      providerId: provider.id,
      images: ['✨'],
      tags: ['facial', 'hydrating', 'skincare'],
      available: true,
    });
    console.log(`  ✓ Service created: ${facialService.name}`);
    
    const massageService = await serviceRepository.create({
      name: 'Swedish Massage',
      description: 'Relaxing full-body massage to relieve stress and tension',
      category: 'massage',
      price: 100,
      duration: 60,
      providerId: provider.id,
      images: ['💆‍♀️'],
      tags: ['massage', 'relaxation', 'wellness'],
      available: true,
    });
    console.log(`  ✓ Service created: ${massageService.name}\n`);
    
    // Create Bookings
    console.log('📅 Creating bookings...');
    
    const booking1 = await bookingRepository.create({
      customerId: customer.id,
      serviceId: hairService.id,
      beauticianId: beautician.id,
      providerId: provider.id,
      date: new Date('2024-12-26'),
      startTime: '10:00',
      endTime: '11:30',
      location: {
        street: '123 Beauty Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      price: 150,
      paymentStatus: 'completed',
    });
    console.log(`  ✓ Booking created: ${booking1.id}`);
    
    await bookingRepository.update(booking1.id, { status: 'completed' });
    
    const booking2 = await bookingRepository.create({
      customerId: customer.id,
      serviceId: nailService.id,
      beauticianId: beautician.id,
      providerId: provider.id,
      date: new Date('2024-12-27'),
      startTime: '14:00',
      endTime: '15:00',
      location: {
        street: '123 Beauty Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      price: 75,
      paymentStatus: 'pending',
    });
    console.log(`  ✓ Booking created: ${booking2.id}\n`);
    
    // Create Reviews
    console.log('⭐ Creating reviews...');
    
    const review1 = await reviewRepository.create({
      bookingId: booking1.id,
      customerId: customer.id,
      serviceId: hairService.id,
      beauticianId: beautician.id,
      providerId: provider.id,
      rating: 5,
      comment: 'Amazing service! My hair feels incredible. Emily was professional and friendly.',
      images: [],
    });
    console.log(`  ✓ Review created for booking ${booking1.id}\n`);
    
    console.log('✅ Database seeding complete!');
    console.log('\n📊 Summary:');
    console.log(`  - Users: 3 (1 customer, 1 provider, 1 beautician)`);
    console.log(`  - Services: 5`);
    console.log(`  - Bookings: 2`);
    console.log(`  - Reviews: 1`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n✅ Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
