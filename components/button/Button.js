import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: 'rgba(102, 42, 178, 1)',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
      }}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;