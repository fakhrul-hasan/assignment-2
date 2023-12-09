import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

const getUsersFromDB = async () => {
  const result = await User.find(
    {},
    {
      _id: 0,
      userId: 0,
      password: 0,
      'fullName._id': 0,
      isActive: 0,
      hobbies: 0,
      'address._id': 0,
      orders: 0,
      __v: 0,
    },
  );
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne(
    { userId: id },
    {
      _id: 0,
      userId: 0,
      password: 0,
      'fullName._id': 0,
      'address._id': 0,
      orders: 0,
      __v: 0,
    },
  );
  return result;
};

const updateDataFromDB = async (userId: string, payload: TUser) => {
  
  const result = await User.findOneAndUpdate({ userId: userId }, payload, {
    new: true,
    projection: {
      _id: 0,
      password: 0,
      orders: 0,
      'fullName._id': 0,
      'address._id': 0,
    },
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.deleteOne({ userId: userId });
  return result;
};

const addProductIntoDB = async (userId: string, newOrder: object) => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    { $push: { orders: newOrder } },
    { new: true },
  );
  return result;
};

const getSingleUserOrderFromDB = async (id: string) => {
  const result = await User.findOne({ userId: id }, { orders: 1 });
  return result;
};

const totalPriceOfSingleUser = async (id: string) => {
  const result = await User.aggregate([
    { $match: { userId: parseInt(id) } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  const totalSum = result.length > 0 ? result[0] : 0;
  return totalSum;
};

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateDataFromDB,
  deleteUserFromDB,
  addProductIntoDB,
  getSingleUserOrderFromDB,
  totalPriceOfSingleUser,
};
