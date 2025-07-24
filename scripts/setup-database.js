#!/usr/bin/env node

/**
 * Database Setup Script for Tony's Toolbox
 * 
 * This script helps set up the database for development.
 * Make sure you have a PostgreSQL database running and 
 * the correct DATABASE_URL in your .env file.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Tony\'s Toolbox Database...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Error: .env file not found!');
  console.log('📝 Please copy .env.example to .env and configure your database connection.');
  console.log('💡 Make sure to set DATABASE_URL to your PostgreSQL connection string.');
  process.exit(1);
}

// Check if DATABASE_URL is set
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('DATABASE_URL=') || envContent.includes('DATABASE_URL=postgresql://postgres:your_password')) {
  console.log('⚠️  Warning: DATABASE_URL might not be properly configured in .env');
  console.log('🔧 Please ensure DATABASE_URL points to your PostgreSQL database.');
  console.log('📖 Example: DATABASE_URL=postgresql://postgres:password@localhost:5432/tonystoolbox\n');
}

try {
  // Generate Prisma client
  console.log('1️⃣ Generating Prisma client...');
  execSync('npm run db:generate', { stdio: 'inherit' });
  
  // Push database schema
  console.log('\n2️⃣ Creating database tables...');
  execSync('npm run db:push', { stdio: 'inherit' });
  
  // Seed database
  console.log('\n3️⃣ Seeding database with sample data...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  
  console.log('\n✅ Database setup completed successfully!');
  console.log('\n📊 Your database now includes:');
  console.log('   • Sample users (admin and test user)');
  console.log('   • AI tools directory entries');
  console.log('   • Project showcases');
  console.log('   • Reviews and ratings');
  console.log('   • Short links');
  console.log('   • System configuration');
  
  console.log('\n🎯 Next steps:');
  console.log('   • Run "npm run dev" to start the development server');
  console.log('   • Visit "npm run db:studio" to browse your database');
  console.log('   • Configure Clerk authentication in your .env file');
  
} catch (error) {
  console.error('\n❌ Database setup failed:', error.message);
  console.log('\n🔧 Troubleshooting tips:');
  console.log('   • Ensure PostgreSQL is running');
  console.log('   • Check your DATABASE_URL in .env');
  console.log('   • Verify database exists and is accessible');
  console.log('   • Check network connectivity to your database');
  process.exit(1);
}