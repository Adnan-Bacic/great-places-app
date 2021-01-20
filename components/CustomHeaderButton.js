import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/Colors'

import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'

const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : Colors.primary}></HeaderButton>
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
