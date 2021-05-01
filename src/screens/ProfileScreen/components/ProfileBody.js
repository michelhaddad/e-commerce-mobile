import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../components/UI/CustomText';
import UploadButton from './UploadButton';
import Detail from './Detail';
//PropTypes check
import PropTypes from 'prop-types';

export const ProfileBody = ({
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
        <CustomText style={styles.title}>Personal information</CustomText>
      </View>
      <Detail icon="person" content={user.firstName} />
      <Detail icon="email-outline" content={user.email} />
      <Detail
        icon="phone"
        content={
          user.phone && user.phone.length !== 0 ? user.phone : 'Not added yet'
        }
      />
      <Detail
        icon="location-on"
        content={
          user.address && user.address.length !== 0
            ? user.address
            : 'Not added yet'
        }
      />
      <UploadButton
        uploadButton={uploadButton}
        setUploadButton={setUploadButton}
        setImageUri={setImageUri}
        UploadProfile={UploadProfile}
      />
    </View>
  );
};

ProfileBody.propTypes = {
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
});
