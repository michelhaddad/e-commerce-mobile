import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../utils/Colors';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { EditInfo } from '../../reducers';
//Loader
import Loader from '../../components/Loaders/Loader';

export const EditProfileScreen = (props) => {
  const { user } = props.route.params;
  const loading = useSelector((state) => state.auth.isLoading);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);

  const [disableButton, setDisableBotton] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      user.phoneNumber !== phoneNumber ||
      user.firstName !== firstName ||
      user.lastName !== lastName
    ) {
      setDisableBotton(false);
    }
  }, [phoneNumber, firstName, lastName]);

  const updateInfoHandler = async () => {
    if (
      phoneNumber.length >= 8 &&
      firstName.length >= 2 &&
      lastName.length >= 2
    ) {
      try {
        await dispatch(EditInfo(phoneNumber, firstName, lastName));
        props.navigation.navigate('Profile');
      } catch (err) {
        alert(err);
      }
    } else {
      return Alert.alert('Error', 'Invalid information, please retry', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : <></>}
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.infoContainer}>
          <TextInput
            label="Email"
            value={user.email}
            disabled
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            style={{ marginVertical: 10 }}
          />
          <TextInput
            label="FirstName"
            value={firstName}
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            onChangeText={(text) => setfirstName(text)}
            style={{ marginVertical: 10 }}
            autoCapitalize="words"
          />
          <TextInput
            label="LastName"
            value={lastName}
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            onChangeText={(text) => setlastName(text)}
            style={{ marginVertical: 10 }}
            autoCapitalize="words"
          />
          <TextInput
            label="Phone"
            value={phoneNumber}
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            onChangeText={(text) => setPhoneNumber(text)}
            style={{ marginVertical: 10 }}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
        <View style={styles.button}>
          <Button
            icon="update"
            mode="contained"
            loading={loading}
            disabled={disableButton}
            onPress={updateInfoHandler}
            style={{
              height: 50,
              justifyContent: 'center',
              backgroundColor: Colors.leave_green,
              marginHorizontal: 10,
            }}
          >
            Update Your Information
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
  },
});
