import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Dimensions, Keyboard } from "react-native";

// custom fonts
import { AppLoading } from 'expo';
import { useFonts } from '@expo-google-fonts/capriola';

import { FontAwesome } from '@expo/vector-icons'; 



// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#0469c1'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'

const ToggleButton = ({ onPress, title, checkedStatus }) => (
    <TouchableOpacity onPress={onPress} style={checkedStatus?toggleBtnSelected:toggleBtn} activeOpacity={0.8} >
        <Text style={checkedStatus?buttonTextSelected:buttonText}>
            {title}
            {checkedStatus?
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesome name="check" size={16} color="white" /></Text>
            :
            <Text></Text>}
        </Text>
    </TouchableOpacity>
  )

const toggleBtn = {
    backgroundColor: 'white',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: grayMedium,
}
const toggleBtnSelected = {
   ...toggleBtn,
   backgroundColor: mint,
   borderColor: mint,
}
const buttonText = {
    fontSize: 16,
    color: grayMedium,
    alignSelf: "center",
    letterSpacing: -0.7
}
const buttonTextSelected = {
    ...buttonText,
    color: 'white'
}


export {ToggleButton};