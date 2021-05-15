import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../components/UI/CustomText';
import UploadButton from './UploadButton';
import Detail from './Detail';
import { TextInput, Button } from 'react-native-paper';
//PropTypes check
import PropTypes from 'prop-types';

export const ItemBody = ({
  user,
  uploadButton,
  setUploadButton,
  setImageUri,
  UploadProfile,
}) => {
  // console.log('user', user);
  return (
    <View style={styles.footer}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Add a new product</CustomText>
      </View>
      {/* <View style={styles.titleContainer}>
        <CustomText style={styles.detailText}>
          Please upload a picture and fill the fields with the details of the new
          product and then submit it
        </CustomText>
      </View> */}
      {/* <Detail icon="person" content={user.firstName} />
      <Detail icon="email-outline" content={user.email} />
      <Detail
        icon="phone"
        content={
          user.phoneNumber && user.phoneNumber.length !== 0
            ? user.phoneNumber
            : 'Not added yet'
        }
      /> */}
      <UploadButton
        uploadButton={uploadButton}
        setUploadButton={setUploadButton}
        setImageUri={setImageUri}
        UploadProfile={UploadProfile}
      />
    </View>
  );
};

ItemBody.propTypes = {
  user: PropTypes.object.isRequired,
  uploadButton: PropTypes.bool.isRequired,
  setUploadButton: PropTypes.func.isRequired,
  setImageUri: PropTypes.func.isRequired,
  UploadProfile: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 30,
  },

  title: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailText: {
    fontWeight: '500',
    color: Colors.text,
  },
});
