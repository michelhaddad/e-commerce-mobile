import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import renderField from './RenderField';
//Colors
import Colors from '../../../utils/Colors';
import CustomText from '../../../components/UI/CustomText';
//PropTypes check
import PropTypes from 'prop-types';

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name cannot be left blank';
  } else if (values.firstName.length <=2) {
    errors.firstName = 'First name must be 2 characters or more';
  } else {
    errors.firstName = '';
  }
  if (!values.lastName) {
    errors.lastName = 'Last name cannot be left blank';
  } else if (values.lastName.length <=2) {
    errors.lastName = 'Last name must be 2 characters or more';
  } else {
    errors.lastName = '';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number cannot be left blank';
  } else if (values.phoneNumber.length !== 10) {
    errors.phoneNumber = 'Phone number must be 8 digits or more';
  } else {
    errors.phoneNumber = '';
  }
  if (!values.addressLine1) {
    errors.addressLine1 = 'Address Line 1 can not be vacant';
  } else if (values.addressLine1.length <= 4) {
    errors.addressLine1 = 'The address line 1 must be 4 characters or more';
  } else {
    errors.addressLine1 = '';
  }
  if (!values.city) {
    errors.city = 'City can not be vacant';
  } else if (values.city.length <= 4) {
    errors.city = 'The city must be 4 characters or more';
  } else {
    errors.city = '';
  }
  if (!values.district) {
    errors.district = 'District can not be vacant';
  } else if (values.district.length <= 4) {
    errors.district = 'The district must be 4 characters or more';
  } else {
    errors.district = '';
  }

  return errors;
};

const User = ({ getReceiver, checkValidation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  useEffect(() => {
    getReceiver(firstName, lastName, phoneNumber, addressLine1, city, district);
  }, [firstName, lastName, phoneNumber, addressLine1, city, district]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Shipment Details</CustomText>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Field
            name="First Name"
            maxLength={35}
            label="First Name"
            keyboardType="default"
            component={renderField}
            onChangeText={(value) => setFirstName(value)}
            checkValidation={checkValidation}
          />

          <Field
            name="Last Name"
            maxLength={35}
            label="Last Name"
            keyboardType="default"
            component={renderField}
            onChangeText={(value) => setlastName(value)}
            checkValidation={checkValidation}
          />

          <Field
            name="Phone Number"
            maxLength={10}
            label="Phone Number"
            component={renderField}
            onChangeText={(value) => setPhoneNumber(value)}
            keyboardType="numeric"
            returnKeyType="done"
            checkValidation={checkValidation}
          />

          <Field
            name="Address Line 1"
            maxLength={35}
            label="Address Line 1"
            component={renderField}
            onChangeText={(value) => setAddressLine1(value)}
            keyboardType="default"
            checkValidation={checkValidation}
          />

          <Field
            name="City"
            maxLength={35}
            label="City"
            component={renderField}
            onChangeText={(value) => setCity(value)}
            keyboardType="default"
            checkValidation={checkValidation}
          />

          <Field
            name="District"
            maxLength={35}
            label="District"
            component={renderField}
            onChangeText={(value) => setDistrict(value)}
            keyboardType="default"
            checkValidation={checkValidation}
          />
          
        </View>
      </View>
    </View>
  );
};

User.propTypes = {
  getReceiver: PropTypes.func.isRequired,
  checkValidation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});
export const UserForm = reduxForm({
  form: 'user', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(User);
