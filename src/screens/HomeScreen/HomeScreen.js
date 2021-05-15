import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  AsyncStorage,
} from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorite, fetchProducts } from '../../reducers';
//Colors
import Colors from '../../utils/Colors';
//Animation
import Animated from 'react-native-reanimated';
//Components
import {
  Carousel,
  Header,
  CategorySection,
  FloatButton,
  categories,
} from './components';
import Skeleton from '../../components/Loaders/SkeletonLoading';
import Snackbar from '../../components/Notification/Snackbar';
//FloatButton
import { Portal, Provider } from 'react-native-paper';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
//height
const { height } = Dimensions.get('window');

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const logo = () => console.log('Refresh triggered');
  //Header Animation
  let scrollY = new Animated.Value(0);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const collections = useSelector((state) => state.store.collections);
  const isLoading = useSelector((state) => state.store.isLoading);
  const notification = useSelector((state) => state.auth.notification);
  const [isRefreshing, setRefresh] = useState(false);

  const loadProductsAndCollections = () => {
    setRefresh(true);
    dispatch(fetchProducts());
    setRefresh(false);
  };

  //fetch Api
  useEffect(() => {
    // AsyncStorage.removeItem("isFirstTime");
    loadProductsAndCollections();
  }, [user._id]);

  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
          />
          <Portal>
            <FloatButton />
          </Portal>
          <AnimatedFlatList
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onRefresh={loadProductsAndCollections}
            refreshing={isRefreshing}
            ListHeaderComponent={() => (
              <View style={styles.banner}>
                <Carousel />
              </View>
            )}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              { useNativeDriver: true },
            )}
            data={collections}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CategorySection
                name={item.name}
                bg={item.bg}
                data={item.items}
                navigation={navigation}
              />
            )}
          />
          {Object.keys(notification).length === 0 ? (
            <View />
          ) : (
            <Snackbar
              checkVisible={true}
              message={
                Object.keys(user).length === 0
                  ? notification
                  : notification + ' ' + user.firstName
              }
            />
          )}
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list: {
    width: '100%',
    marginTop: 50,
    paddingBottom: 20,
  },
});
