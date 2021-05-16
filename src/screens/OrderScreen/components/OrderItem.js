import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
//Colors
import Colors from '../../../utils/Colors';
//Item
import ItemList from '../../PreOrderScreen/components/PreOrderItem';

//Number format
import NumberFormat from '../../../components/UI/NumberFormat';
//Moment
import moment from 'moment';
import 'moment/min/locales';
//PropTypes check
import PropTypes from 'prop-types';
import CustomText from '../../../components/UI/CustomText';
import Steps from '../../../components/UI/Steps';

moment.locale('vi');

export const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const status = () => {
    switch (order.status) {
      case 'ordered':
        return 0;
      case 'confirmed':
        return 1;
      case 'delivered':
        return 2;
      default:
        return 3;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Order code: </CustomText>
          <CustomText style={styles.detail}>
            CT-{order._id.substr(order._id.length - 10)}
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Date of order: </CustomText>
          <CustomText style={styles.detail}>
            {moment(order.dateCreated).format('DD-MM-YYYY')}
          </CustomText>
        </View>
        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
            <CustomText style={{ fontSize: 15, color: '#fff' }}>
              {showDetails ? 'Hide your order' : 'Order details'}
            </CustomText>
          </TouchableOpacity>
        </View>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>
                Recipient's Full Name:{' '}
              </CustomText>
              <CustomText style={styles.detail}>
                {order.shippingAddress.firstName +
                  ' ' +
                  order.shippingAddress.lastName}
              </CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Phone Number: </CustomText>
              <CustomText style={styles.detail}>
                {order.shippingAddress.phoneNumber}
              </CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Full Address: </CustomText>
              <CustomText style={styles.detail}>
                {order.shippingAddress.addressLine1 +
                  ', ' +
                  order.shippingAddress.city +
                  ', ' +
                  order.shippingAddress.district}
              </CustomText>
            </View>

            <View style={styles.steps}>
              <Steps position={status()} />
            </View>

            <CustomText style={styles.text}>Ordered Products:</CustomText>
            <FlatList
              data={order.orderItems}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <ItemList item={item} />;
              }}
            />

            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: 'space-between',
              }}
            >
              <CustomText style={styles.text}>Total:</CustomText>
              <NumberFormat
                price={order.totalPrice.toString()}
                style={{ fontSize: 15 }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: Colors.lighter_green,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detail: {
    color: Colors.lighter_green,
  },
  steps: {
    width: '100%',
    height: 100,
  },
});

export default OrderItem;
