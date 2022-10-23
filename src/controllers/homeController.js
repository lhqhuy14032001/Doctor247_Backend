import { json } from 'body-parser'
import db from '../models/index'
import CRUD from "../services/CRUDService"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log('---------------')
        console.log(data)
        console.log('---------------')
        return res.render("homepage.ejs", { data: JSON.stringify(data) })
    } catch (e) {
        console.log(e);
    }
}

//render view to take data to create a new user
let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

//insert data to db -> create acc
let postCRUD = async (req, res) => {
    let data = req.body;
    let msg = await CRUD.createNewUser(data);
    if (msg) {
        res.redirect('/get-crud')
    } else {
        res.redirect('/crud')
    }
    return;
}

//display user list
let displayCRUD = async (req, res) => {
    let data = await CRUD.getALLUser();
    return res.render('displayCRUD', {
        user: data
    })
}

//display user infor to edit
let editCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let user = await CRUD.getUser(id);
        if (user) {
            res.render('editCRUD', {
                user: user
            });
        }
    }
    else {
        res.send('User not found !!!');
    }

    return;
}

//update user infor from view to db
let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUD.updateUser(data);
    return res.redirect('/get-crud');
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let msg = await CRUD.deleteUser(id);
    }
    return res.redirect('/get-crud')
}



module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayCRUD,
    deleteCRUD,
    editCRUD,
    putCRUD
};