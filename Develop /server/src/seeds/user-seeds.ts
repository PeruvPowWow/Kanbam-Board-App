import { User } from '../models/user.js'; // Import the User model

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      username: 'john_doe',
      password: 'password123',
    },
    {
      username: 'jane_smith',
      password: 'password456',
    },
    {
      username: 'admin_user',
      password: 'adminpass789',
    },
  ], {
    individualHooks: true, // Ensure password hashing hooks are run
  });

  console.log('Users seeded!');
};
