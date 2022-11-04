import userServive from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs prams'
        })
    }
    let userData = await userServive.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // ALL or id
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameters !!!',
            users: []
        });
    }
    let users = await userServive.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    });
}

let handleCreateNewUser = async (req, res) => {
    let data = req.body;
    let message = await userServive.createNewUser(data);
    let resMessage = {
        errCode: message.errCode
    };
    if (message !== 0) {
        resMessage.errMessage = message.errMessage
    }
    return res.status(200).json(
        resMessage
    )
}


let handleUpdatetUser = async (req, res) => {
    let data = req.body;
    let id = req.body.id;
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing parameter!'
        })
    }
    let message = await userServive.updateUser(data);
    if (message.errCode === 0) {
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errorMessage
        })
    }
    return res.status(500).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}
let handleDeletetUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter !'
        })
    }
    let message = await userServive.deleteUser(id);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.message
    })
}

let getAllCode = async (req, res) => {
    try {
        let type = req.query.type;
        let data = await userServive.getAllCode(type);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json(
            {
                errCode: -1,
                errMessage: 'Error from server!'
            }
        )
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleUpdatetUser: handleUpdatetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdatetUser: handleUpdatetUser,
    handleDeletetUser: handleDeletetUser,
    getAllCode: getAllCode
} 