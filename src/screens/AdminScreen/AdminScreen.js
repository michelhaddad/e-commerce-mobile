import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { AddProduct } from '../../reducers';
import { ItemPic, ItemBody } from './components';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
//Loader
import Loader from '../../components/Loaders/Loader';

const { width, height } = Dimensions.get('window');

export const AdminScreen = (props) => {
  const loading = useSelector((state) => state.store.isLoading);
  const [imageUri, setImageUri] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [uploadButton, setUploadButton] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState('');

  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const isValid = () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please upload an image', [
        {
          text: 'Ok',
        },
      ]);
      return false;
    }
    if (
      !title ||
      !description ||
      !price ||
      !quantity ||
      categories.length === 0
    ) {
      Alert.alert('Error', 'Please fill all the fields', [
        {
          text: 'Ok',
        },
      ]);
      return false;
    }
    return true;
  };
  const onAddProduct = async () => {
    try {
      // await dispatch(UploadProfilePic(imageUri, filename, type));
      // setUploadButton(true);
      // if (!unmounted.current) {
      //   Alert.alert('Update', 'Update was successful', [
      //     {
      //       text: 'Ok',
      //     },
      //   ]);
      // }
      if (!isValid()) {
        return;
      }
      const categoriesArray = categories
        .split(',')
        .map((category) => category.trim());
      const productInfo = {
        title,
        description,
        price,
        categories: categoriesArray,
        rating: 5,
        remainingQuantity: quantity,
      };

      await dispatch(AddProduct(productInfo, imageUri, filename, type));
      Alert.alert('Success', 'Product was updated');

      setCategories('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setTitle('');
      setImageUri('');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <View style={styles.header} />
        {loading ? <Loader /> : <></>}
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            <ItemPic
              imageUri={imageUri}
              setImageUri={setImageUri}
              setType={setType}
              setFilename={setFilename}
              setUploadButton={setUploadButton}
            />
            <ItemBody
              uploadButton={uploadButton}
              setUploadButton={setUploadButton}
              setImageUri={setImageUri}
              loading={loading}
              onAddProduct={onAddProduct}
              setCategories={setCategories}
              setDescription={setDescription}
              setPrice={setPrice}
              setQuantity={setQuantity}
              setTitle={setTitle}
              title={title}
              description={description}
              price={price}
              quantity={quantity}
              categories={categories}
            />
          </View>
        </View>
      </View>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 0.15 * height,
    justifyContent: 'center',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
});
