import { axiosInstance } from "../axios"
// const hubspot = require('@hubspot/api-client')
// //import {hubspot} from '@hubspot/api-client'
// const hubspotClient = new hubspot.Client({ "accessToken": "pat-na1-4fd9314a-f632-4b8a-b65f-b115529c91a6" })
import { getFireBaseData, addFireBaseData, updateFireBaseData, deleteFireBaseData, getDocId } from '../firebase/index';




export const getMeetings = async (after) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/meetings${after !== undefined ? '?after=' + after : ''}`)
            .then(res => {
                if (res?.data?.results) {
                    res.data.results.map(val => {
                        getDocId(val.properties.hs_object_id).then(result => {
                            if (result && result.length == 0) {
                                addFireBaseData(val.properties)
                            }
                        })
                    })
                }
                return resolve(res)
            })
            .catch(err => reject(err))
    })

}

export const getMeetingsById = (id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/crm/v3/objects/meetings/${id}`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export const deleteMeeting = (id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.delete(`/meetings/${id}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

export const editMeeting = (data, id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.patch(`/meetings/${id}`, data)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}


export const getOwnerDetails = async (id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/owners/${id}`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

