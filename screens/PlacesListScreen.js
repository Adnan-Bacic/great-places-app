import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/CustomHeaderButton'

//redux
import { useSelector, useDispatch } from 'react-redux'
import * as placesActions from '../store/places-actions'

import PlaceItem from '../components/PlaceItem'

const PlacesListScreen = props => {

  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList data={places}
    keyExtractor={item => item.id}
    renderItem={itemData => <PlaceItem image={itemData.item.imageUri}
    title={itemData.item.title}
    address={itemData.item.address}
    onSelect={() => {
      props.navigation.navigate('PlaceDetail', {
      placeTitle: itemData.item.title,
      placeId: itemData.item.id
    })}}></PlaceItem>}>
    </FlatList>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
    return{
      headerTitle: 'All Places',
      headerRight: <HeaderButtons HeaderButtonsComponent={CustomHeaderButton}>
        <Item title="Add place"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => navData.navigation.navigate('NewPlace')}></Item>
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
