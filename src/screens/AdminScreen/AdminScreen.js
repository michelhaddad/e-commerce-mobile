import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { UploadProfilePic } from '../../reducers';
import { ItemPic, ItemBody } from './components';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
//Loader
import Loader from '../../components/Loaders/Loader';

const { width, height } = Dimensions.get('window');

export const AdminScreen = (props) => {
  const loading = useSelector((state) => state.auth.isLoading);
  const [imageUri, setImageUri] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [uploadButton, setUploadButton] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const UploadProfile = async () => {
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
      if (!imageUri) {
        Alert.alert('Error', 'Please upload an image', [
          {
            text: 'Ok',
          },
        ]);
        return;
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
        return;
      }
      console.log(
        'title',
        title,
        'description',
        description,
        'price',
        price,
        'quantity',
        quantity,
        'categories',
        categories,
      );
      console.log(
        'image uri',
        imageUri,
        'filename',
        filename,
        'file type',
        type,
      );
      setCategories([]);
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
              UploadProfile={UploadProfile}
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
    width,
    flexDirection: 'row',
    height: 0.15 * height,
    justifyContent: 'center',
  },
  profileContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width,
    alignItems: 'center',
  },
});
