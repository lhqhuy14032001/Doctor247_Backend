import db from "../models/index"
let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.ALLCODES, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.ALLCODES, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })

}
let saveDetailInforDoctor = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Markdown.create({
                contentHTML: dataInput.contentHTML,
                contentMarkdown: dataInput.contentMarkdown,
                doctorId: dataInput.doctorId,
                decription: dataInput.description
            })
            resolve({
                errCode: 0,
                errMessage: 'Saving success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor
}