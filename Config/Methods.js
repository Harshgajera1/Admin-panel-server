const mongoose = require('mongoose');
const { resMessages, statusMessages } = require('./Config');

const Methods = {
    async createModel (tblname, tblschema) {
        try {
            let modelDate = {}

            let collections  = await mongoose.connection.db.listCollections().toArray()
            let check = collections.find((collection) => collection.name === tblname)
            // console.log(await mongoose.connection, check)
            const modelNames = mongoose.modelNames();
            const modelsWithSchemas = {};
            if(check){
                modelNames.forEach((modelName) => {
                    const model = mongoose.model(modelName);
                    console.log(model.schema)
                    modelsWithSchemas[modelName] = model.schema;
                });
                // console.log(modelsWithSchemas)
                // modelDate['schema'] = new mongoose.model(tblname).schema
                // console.log(new mongoose.model(tblname))
                // modelDate['schema'] = new mongoose.model(tblname)
                // modelDate['tblname'] =  tblname
            }else{
                modelDate['schema'] = new mongoose.model(tblname,tblschema)
                modelDate['tblname'] =  tblname
            }

            return modelDate
        } catch (e) {
            console.log(e)
        }
    },

    async performCRUD (action, collectionName, schema, data) {
        try {
            let res = {
                status : 400,
                message : statusMessages['400']
            }

            const Model = mongoose.model(collectionName, schema)
            if(action == "i"){
                const insert = new Model(data)
                insert.validateSync()
                let insertData = await insert.save()

                res.status = 200
                res.data = insertData
                res.message = resMessages['insert']
            }else if(action == "u"){
                await Model.findByIdAndUpdate(data._id,data)

                res.status = 200
                res.data = data
                res.message = resMessages['update']
            }else if(action == "d"){
                await Model.findOneAndDelete({_id: data._id})

                res.status = 200
                res.message = resMessages['delete']
            }
            return res
        } catch (e) {
            console.log(e)
            return { status : 500, message : e }
        }
    },

    async getDate(collectionName, schema, pipeline) {
        try {
            let res = {
                status : 200
            }

            const Model = mongoose.model(collectionName, schema)
            let data = await Model.find()
            res.data = data

            return res
        } catch (e) {
            console.log(e)
            return { status : 500, message : e }
        }
    }
}

module.exports = Methods