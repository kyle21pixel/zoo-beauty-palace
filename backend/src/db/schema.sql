-- Zoo Beauty Palace Database Schema
-- PostgreSQL Database Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    avatar TEXT,
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'provider', 'beautician', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Customers Table (extends users)
CREATE TABLE customers (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(50),
    address_zip_code VARCHAR(20),
    address_country VARCHAR(100),
    address_latitude DECIMAL(10, 8),
    address_longitude DECIMAL(11, 8)
);

-- Customer Favorites
CREATE TABLE customer_favorites (
    customer_id UUID REFERENCES customers(user_id) ON DELETE CASCADE,
    service_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (customer_id, service_id)
);

-- Providers Table (extends users)
CREATE TABLE providers (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    description TEXT,
    address_street VARCHAR(255) NOT NULL,
    address_city VARCHAR(100) NOT NULL,
    address_state VARCHAR(50) NOT NULL,
    address_zip_code VARCHAR(20) NOT NULL,
    address_country VARCHAR(100) NOT NULL,
    address_latitude DECIMAL(10, 8),
    address_longitude DECIMAL(11, 8),
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    images TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Beauticians Table (extends users)
CREATE TABLE beauticians (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES providers(user_id) ON DELETE SET NULL,
    bio TEXT,
    specialties TEXT[],
    experience INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT TRUE,
    location_latitude DECIMAL(10, 8),
    location_longitude DECIMAL(11, 8),
    certifications TEXT[],
    images TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins Table (extends users)
CREATE TABLE admins (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    permissions TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('hair', 'nails', 'makeup', 'skincare', 'massage', 'waxing', 'eyelashes', 'eyebrows', 'spa', 'other')),
    price DECIMAL(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    provider_id UUID REFERENCES providers(user_id) ON DELETE CASCADE,
    images TEXT[],
    tags TEXT[],
    available BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_price CHECK (price > 0),
    CONSTRAINT positive_duration CHECK (duration > 0)
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(user_id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    beautician_id UUID REFERENCES beauticians(user_id) ON DELETE SET NULL,
    provider_id UUID REFERENCES providers(user_id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show')),
    location_street VARCHAR(255) NOT NULL,
    location_city VARCHAR(100) NOT NULL,
    location_state VARCHAR(50) NOT NULL,
    location_zip_code VARCHAR(20) NOT NULL,
    location_country VARCHAR(100) NOT NULL,
    location_latitude DECIMAL(10, 8),
    location_longitude DECIMAL(11, 8),
    notes TEXT,
    price DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_id UUID,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_time CHECK (end_time > start_time),
    CONSTRAINT positive_booking_price CHECK (price > 0)
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(user_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(20) NOT NULL CHECK (method IN ('card', 'cash', 'wallet', 'bank_transfer')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_payment_amount CHECK (amount > 0)
);

-- Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('payment', 'refund', 'payout', 'commission')),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    description TEXT NOT NULL,
    related_id UUID, -- booking or payment ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(user_id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    beautician_id UUID REFERENCES beauticians(user_id) ON DELETE SET NULL,
    provider_id UUID REFERENCES providers(user_id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    images TEXT[],
    response TEXT, -- provider response
    helpful INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (booking_id) -- One review per booking
);

-- Indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_services_provider ON services(provider_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_available ON services(available);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_provider ON bookings(provider_id);
CREATE INDEX idx_bookings_beautician ON bookings(beautician_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_reviews_service ON reviews(service_id);
CREATE INDEX idx_reviews_beautician ON reviews(beautician_id);
CREATE INDEX idx_reviews_provider ON reviews(provider_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beauticians_updated_at BEFORE UPDATE ON beauticians
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update service ratings
CREATE OR REPLACE FUNCTION update_service_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE services
    SET 
        rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE service_id = NEW.service_id),
        review_count = (SELECT COUNT(*) FROM reviews WHERE service_id = NEW.service_id)
    WHERE id = NEW.service_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_service_rating();

-- Function to update beautician ratings
CREATE OR REPLACE FUNCTION update_beautician_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE beauticians
    SET 
        rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE beautician_id = NEW.beautician_id),
        review_count = (SELECT COUNT(*) FROM reviews WHERE beautician_id = NEW.beautician_id)
    WHERE user_id = NEW.beautician_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_beautician_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_beautician_rating();

-- Function to update provider ratings
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE providers
    SET 
        rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE provider_id = NEW.provider_id),
        review_count = (SELECT COUNT(*) FROM reviews WHERE provider_id = NEW.provider_id)
    WHERE user_id = NEW.provider_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_provider_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_provider_rating();
