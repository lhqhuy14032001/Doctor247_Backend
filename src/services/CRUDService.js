import bcrypt from 'bcryptjs';
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordHash = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.sex === "1" ? true : false,
                roleId: data.roleId === "1" ? "1" : "2"
            })
            resolve('OK, Done new user');
        } catch (e) {
            reject(e)
        }
    })
}

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

let getALLUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}

let getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            })
            if (user) {
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve();
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDelete = await db.User.findOne({
                where: { id: id }
            })
            if (userDelete) {
                userDelete.destroy();
                resolve('User was deleted !')
            } else {
                resolve('User not found !')
            }
        } catch (e) {
            reject(e);
        }

    })
}


module.exports = {
    createNewUser,
    getALLUser,
    getUser,
    updateUser,
    deleteUser
}