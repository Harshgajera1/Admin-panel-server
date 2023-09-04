import mongoose from 'mongoose'
import { resMessages, statusMessages } from './Config.js'

const Methods = {
    async createModel (collection, schema) {
        try {
            let Model
            if(mongoose.models[collection]){
                Model = mongoose.models[collection]
            }else{
                Model = mongoose.model(collection, schema, collection)
            }
            return Model
        } catch (e) {
            console.log(e)
        }
    },

    async performCRUD (action, collection, schema, data) {
        try {
            let response = {
                status : 400,
                message : statusMessages['400']
            }

            const Model = await this.createModel(collection, schema)
            if(action == "i"){
                const insert = new Model(data)
                insert.validateSync()
                let insertData = await insert.save()

                response.status = 200
                // response.data = insertData
                response.message = resMessages['insert']
            }else if(action == "u"){
                await Model.findByIdAndUpdate(data._id,data)

                response.status = 200
                response.data = data
                response.message = resMessages['update']
            }else if(action == "d"){
                await Model.findOneAndDelete({_id: data._id})

                response.status = 200
                response.message = resMessages['delete']
            }
            return response
        } catch (e) {
            console.log(e)
            if(e.code == 11000){
                return { status : 409, message : statusMessages['409'] }
            }else{
                return { status : 500, message : e}
            }
        }
    },

    async getData(collectionName, schema, pipeline, pagination) {
        try {

            if(pagination){
                var pageno = parseInt(pagination.pageno)
                var pagelimit = parseInt(pagination.pagelimit)
                var skip = (pageno - 1) * pagelimit
                pipeline.push({ $skip : skip })
                pipeline.push({ $limit : pagelimit })
            }

            let response = {
                status : 200,
                pageno,
                pagelimit,
            }

            const Model = await this.createModel(collectionName, schema)
            let data = await Model.aggregate(pipeline)
            response.data = data

            if(data.length){
                response.nextpage = data.length >= pagelimit ? 1 : 0
            }

            return response
        } catch (e) {
            console.log(e)
            return { status : 500, message : e }
        }
    }
}

export default Methods