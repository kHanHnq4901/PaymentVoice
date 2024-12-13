import React from 'react';
import { View, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../../Text';
import { Divider } from 'react-native-paper';
import { Colors, scale } from '../../../theme/index';
import Theme, { normalize } from '../../../theme';

type Props = {
  colorLabel?: string; // Updated to be optional
  label: string;
  icon: string;
  onPress: () => void;
  style?: TextStyle;
  colorIcon?: string;
};

export const DrawerItem = (props: Props) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Icon
          name={props.icon}
          size={ scale *18}
          color={props.colorIcon ? props.colorIcon : Theme.Colors.colorIcon}
        />
        <Text
          style={
            props.style ? { ...styles.label, ...props.style, color: props.colorLabel } : { ...styles.label, color: props.colorLabel }
          }>
          {props.label}
        </Text>
        <View style={{ flex: 1 }} />
        <AntDesign name="right" size={ scale *10} color={Theme.Colors.cyan} />
      </TouchableOpacity>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal:  scale *10,
    marginVertical:  scale *15,
    alignItems: 'center',
  },
  label: {
    marginLeft:  scale *10,
    fontSize: normalize(16),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
