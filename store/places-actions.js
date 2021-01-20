import * as FileSystem from 'expo-file-system'

import { insertPlace, fetchPlaces } from '../helpers/db'

import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const googleReverseGeoApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleMapsApiKey}`
        const response = await fetch(googleReverseGeoApiUrl)

        if(!response.ok){
            throw new Error('Something went wrong')
        }

        const resData = await response.json()
        //console.log(resData)

        if(!resData.results){
            throw new Error('Something went wrong')
        }

        //get the address
        const address = resData.results[0].formatted_address

        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName

        //actually move the file
        try{
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            //insert other data to db
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng
            )
            //console.log('add place: ', dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords:{
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            })
        }
        catch(err){
            console.log(err)
            throw err
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces()
            //console.log('load places: ', dbResult)

            dispatch({ type: SET_PLACES, places: dbResult.rows._array })
        }
        catch(err){
            throw err
        }
    }
}