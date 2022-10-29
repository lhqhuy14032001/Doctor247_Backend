import db from "../models/index"
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpassword = await bcrypt.hashSync(password, salt);
            resolve(hashpassword);
        } catch (e) {
            reject(e);
        }
    })
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                //user existed
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email is not exist in our system. Please try other email`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })

}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let message = [];
            let check = await checkEmail(data.email);
            if (check === true) {
                message.errCode = 1;
                message.errMessage = 'Your email existed. Please, try other email !';
            } else {
                let passwordHash = await hashUserPassword(data.password);
                let userInfor = {
                    email: data.email,
                    password: passwordHash,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.sex === "1" ? true : false,
                    roleId: data.roleId === "1" ? "1" : "2"
                }
                await db.User.create(userInfor)
                message.errCode = 0;
                message.errMessage = ''
            }
            resolve(message);
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = [];
            let userDelete = await db.User.findOne({
                where: { id: id }
            })
            if (!userDelete) {
                response.errCode = 1;
                response.message = 'User not found !';
            } else {
                await db.User.destroy({
                    where: { id: id }
                });
                response.errCode = 0;
                response.message = 'User was deleted !';
            }
            resolve(response)
        } catch (error) {
            reject(error);
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = [];
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })              
            if (user) {
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                await user.save();
                userData.errCode = 0;
                userData.errorMessage = 'Update user succeed!';
            } else {
                userData.errCode = 4;
                userData.errorMessage = 'User not found!'
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    }
    )
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}