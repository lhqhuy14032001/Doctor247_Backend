import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.displayCRUD),
        router.get("/crud", homeController.getCRUD),
        router.post("/post-crud", homeController.postCRUD),
        router.get('/get-crud', homeController.displayCRUD),
        router.get('/delete-crud', homeController.deleteCRUD),
        router.get('/edit-crud', homeController.editCRUD),
        router.post('/put-crud', homeController.putCRUD)

    //API for Booking Care
    router.post('/api/login', userController.handleLogin)//Login
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.get('/api/get-all-users', userController.handleGetAllUsers)//get user
    router.put('/api/update-user', userController.handleUpdatetUser);
    router.delete('/api/delete-user', userController.handleDeletetUser);
    router.get('/api/allcode', userController.getAllCode);
    //API for doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-infor-doctor', doctorController.saveDetailInforDoctor);


    return app.use("/", router)
}

module.exports = initWebRoutes