import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';

import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

import Colors from '../constants/Colors'

//redux
import { useDispatch } from 'react-redux'
import * as placesActions from '../store/places-actions'
import ImgPicker from '../components/ImagePicker';

const NewPlaceScreen = props => {

  const [titleValue, setTitleValue] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitleValue(text)
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const locationPickedHandler = useCallback((location) => {
    //console.log(location)
    setSelectedLocation(location)
  }, [])

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={titleChangeHandler} value={titleValue} style={styles.textInput}></TextInput>
        <ImagePicker onImageTaken={imageTakenHandler}></ImagePicker>
        <LocationPicker navigation={props.navigation}
        onLocationPicked={locationPickedHandler}></LocationPicker>
        <Button title="Save place"
        color={Colors.primary}
        onPress={savePlaceHandler}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form:{
    margin: 30
  },
  label:{
    fontSize: 18,
    marginBottom: 15
  },
  textInput:{
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add place'
}

export default NewPlaceScreen;
