import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import MapPreview from './MapPreview'

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    const { onLocationPicked } = props

    //set value of the route param to the state variable
    useEffect(() => {
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation)

            props.onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if(result.status !== 'granted'){
          Alert-alert('Insufficient permissions', 'You must grant location permissions to use this app',
          [
            { text: 'Okay' }
          ])
          return false
        }
        return true
      }

    const getLocationHandler = async () => {
        setIsFetching(true)

        const hasPermission = await verifyPermissions()

        //stop if we dont get permission
        if(!hasPermission){
            return
        }

        try{
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })

            //console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        }
        catch(err){
            Alert.alert(
                'Could not fetch location',
                'Try again or pick a location on the map',
                [
                    { text: 'Okay' }
                ]
            )
        }
        setIsFetching(false)
    }

    pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

  return (
    <View style={styles.locationPicker}>
        <MapPreview style={styles.mapPreview}
        location={pickedLocation}
        onPressMap={pickOnMapHandler}>
            {isFetching ? (
                <ActivityIndicator size="large"
                color={Colors.primary}>
                </ActivityIndicator>
            ) : (
                <Text>No location chosen yet</Text>
            )}
        </MapPreview>
        <View style={styles.actions}>
        <Button title="Get location"
            color={Colors.primary}
            onPress={getLocationHandler}></Button>

            <Button
            title="Pick on map"
            onPress={pickOnMapHandler}
            color={Colors.primary}></Button>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker:{
      marginBottom: 15
  },
  mapPreview:{
      marginBottom: 10,
      width: '100%',
      height: 150,
      borderColor: '#ccc',
      borderWidth: 1
  },
  actions:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%'
  }
});

export default LocationPicker;
