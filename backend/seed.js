require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log('MongoDB connected for seeding...');
  
  // Clear existing users to prevent duplicates if run multiple times
  await User.deleteMany({ email: 'admin@example.com' });
  
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const adminUser = new User({
    email: 'admin@example.com',
    password: hashedPassword,
    name: 'Admin User',
    role: 'admin'
  });
  
  await adminUser.save();
  console.log('Admin user seeded successfully!');
  
  mongoose.disconnect();
})
.catch(err => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
