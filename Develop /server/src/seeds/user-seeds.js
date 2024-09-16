import { User } from '../models/user.js'; // Adjust the path as necessary

export const seedUsers = async () => {
  const users = [
    {
      username: 'john_doe',
      password: 'password123', // Remember, in production this should be hashed
    },
    {
      username: 'jane_smith',
      password: 'password456',
    },
  ];

  // Bulk insert the users into the User table
  await User.bulkCreate(users, {
    individualHooks: true, // If you're using hooks to hash passwords
  });

  console.log('Users seeded!');
};
