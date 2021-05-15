import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import CustomText from '../../../components/UI/CustomText';
import UploadButton from './UploadButton';
import Colors from '../../../utils/Colors';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
//PropTypes check
import PropTypes from 'prop-types';

export const ItemBody = ({
  uploadButton,
  setUploadButton,
  setImageUri,
  setTitle,
  setDescription,
  setPrice,
  setQuantity,
  setCategories,
  UploadProfile,
  categories,
  quantity,
  price,
  description,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Food', value: 'Food' },
    { label: 'Fish', value: 'Fish' },
    { label: 'Meat', value: 'Meat' },
    { label: 'Beverages', value: 'Beverages' },
    { label: 'Fruit', value: 'Fruit' },
    { label: 'Vegetable', value: 'Vegetable' },
    { label: 'Other', value: 'Other' },
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.footer}>
        <View style={styles.titleContainer}>
          <CustomText style={styles.title}>Add a new product</CustomText>
        </View>
        <View style={styles.detailTextContainer}>
          <CustomText style={styles.detailText}>
            Please upload a picture and fill the fields with the details of the
            new product and then submit it
          </CustomText>
        </View>

        <TextInput
          label="Title"
          value={title}
          mode="outlined"
          theme={{ colors: { primary: Colors.leave_green } }}
          selectionColor={Colors.leave_green}
          onChangeText={(text) => setTitle(text)}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          label="Description"
          value={description}
          mode="outlined"
          theme={{ colors: { primary: Colors.leave_green } }}
          selectionColor={Colors.leave_green}
          onChangeText={(text) => setDescription(text)}
          style={{ marginVertical: 10 }}
        />
        <View style={styles.priceContainer}>
          <TextInput
            label="Price"
            value={price}
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            onChangeText={(text) => setPrice(text)}
            style={{ marginVertical: 10, width: '73%' }}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <TextInput
            label="currency"
            value="LBP"
            disabled
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            style={{ marginVertical: 10, width: '25%' }}
          />
        </View>
        <TextInput
          label="Quantity"
          value={quantity}
          mode="outlined"
          theme={{ colors: { primary: Colors.leave_green } }}
          selectionColor={Colors.leave_green}
          onChangeText={(text) => setQuantity(text)}
          style={{ marginVertical: 10 }}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <DropDownPicker
            multiple
            min={1}
            open={open}
            value={categories}
            items={items}
            setOpen={setOpen}
            setValue={setCategories}
            setItems={setItems}
            style={{ marginVertical: 10 }}
            placeholder="Categories"
            mode="BADGE"
          />
        </SafeAreaView>

        <UploadButton
          uploadButton={uploadButton}
          setUploadButton={setUploadButton}
          setImageUri={setImageUri}
          UploadProfile={UploadProfile}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

ItemBody.propTypes = {
  uploadButton: PropTypes.bool.isRequired,
  setUploadButton: PropTypes.func.isRequired,
  setImageUri: PropTypes.func.isRequired,
  UploadProfile: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
  setQuantity: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    paddingHorizontal: 20,
    minHeight: 500,
  },
  titleContainer: {
    height: 30,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  detailTextContainer: {
    marginBottom: 50,
  },
  detailText: {
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
