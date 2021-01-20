import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';

import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

const MapScreen = props => {

  const initialLocation = props.navigation.getParam('initialLocation')
  const readOnly = props.navigation.getParam('readOnly')

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = (event) => {
    if(readOnly){
      return
    }

    //console.log(event)
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if(!selectedLocation){
      Alert.alert('No location set', 'You cannot save without a location',
      [
        { text: 'Cancel', style: "cancel" }
      ])
    }

    props.navigation.navigate('NewPlace', {
      pickedLocation: selectedLocation
    })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler
    })
  }, [savePickedLocationHandler])

  let markerCoordinates
  if(selectedLocation){
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  return (
    <MapView region={mapRegion}
    style={styles.map}
    onPress={selectLocationHandler}>
      {markerCoordinates && (
        <Marker title="Picked location"
        coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation')
  const readOnly = navData.navigation.getParam('readOnly')

  if(readOnly){
    return{}
  }
  
  return{
    headerRight: (
    <TouchableOpacity onPress={saveFn} style={styles.headerButton}>
      <Text style={styles.headerButtonText}>Save</Text>
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  map:{
    flex: 1
  },
  headerButton:{
    marginHorizontal: 20,
  },
  headerButtonText:{
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
