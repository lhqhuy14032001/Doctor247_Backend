import doctorServices from "../services/doctorServices"

let getTopDoctorHome = async (req, res) => {
    try {
        let limit = req.query.limit
        if (!limit) limit = 10
        let response = await doctorServices.getTopDoctorHome(+limit)
        return res.status(200).json({
            errCode: response.errCode,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}
let getAllDoctor = async (req, res) => {
    try {
        let response = await doctorServices.getAllDoctors();
        return res.status(200).json({
            errCode: response.errCode,
            data: response.data
        })
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
        console.log(error);
    }
}
let saveDetailInforDoctor = async (req, res) => {
    try {
        let data = req.body
        if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
            return res.status(200).json({
                errMessage: 'Missing parameter...'
            })
        }
        let response = await doctorServices.saveDetailInforDoctor(data)
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveDetailInforDoctor: saveDetailInforDoctor
}