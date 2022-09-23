import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';

const ChecboxWithLabel = (props) => {
	return (
		<View style = {{ flexDirection: 'row' }}>
			<Text>{props.label}</Text>
			<Checkbox {...props}></Checkbox>
		</View>
	);
};

const CountSelector = () => {
	
	
	return (
		<View>
			<ChecboxWithLabel></ChecboxWithLabel>
		</View>
	);
};

export default CountSelector;