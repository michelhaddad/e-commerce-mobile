import React, { useState, useRef, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
//Colors
import Colors from '../../../utils/Colors';
import CustomText from '../../../components/UI/CustomText';
import { Ionicons } from '@expo/vector-icons';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { SignUp as SignUpAct } from '../../../reducers';
//PropTypes check
import PropTypes from 'prop-types';
import renderField from './RenderField';

const { width, height } = Dimensions.get('window');

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is not vacant';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid Email';
  }
  if (!values.password) {
    errors.password = 'Please enter your password';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = 'Password cannot be left blank';
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = 'Both passwords should be the same';
  }
  if (!values.firstName) {
    errors.firstName = 'First Name cannot be left blank';
  } else if (values.firstName.length > 20) {
    errors.firstName = 'First Name should not exceed 20 characters';
  } else if (values.firstName.length < 6) {
    errors.firstName = 'First Name must be at least 6 characters long';
  }
  if (!values.lastName) {
    errors.lastName = 'Last Name cannot be left blank';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Last Name should not exceed 20 characters';
  } else if (values.lastName.length < 6) {
    errors.lastName = 'Last Name must be at least 6 characters long';
  }

  return errors;
};

const Signup = (props) => {
  const { handleSubmit, reset } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const submit = async (values) => {
    try {
      await dispatch(
        SignUpAct(
          values.firstName,
          values.lastName,
          values.email,
          values.password,
        ),
      );
      reset();
      if (!unmounted.current) {
        Alert.alert(
          'Verify your email',
          'Please check your inbox and verify your email before trying to log in',
          [
            {
              text: 'Okay',
              onPress: () => {
                props.navigation.goBack();
              },
            },
          ],
        );
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'position' : 'height'}
      // keyboardVerticalOffset={40} // adjust the value here if you need more padding
      // style={{ flex: 1 }}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
      >
        <Ionicons name="ios-arrow-back" size={35} color={Colors.light_green} />
      </TouchableOpacity>

      <View style={styles.header}></View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 10,
              zIndex: 0,
            }}
          >
            <View>
              <CustomText style={styles.title}>REGISTER</CustomText>
            </View>
            <View>
              <Field
                name="firstName"
                keyboardType="default"
                label="First Name"
                component={renderField}
                icon="id-card"
                autoCapitalize={true}
              />
              <Field
                name="lastName"
                keyboardType="default"
                label="Last Name"
                component={renderField}
                icon="id-card"
                autoCapitalize={true}
              />
              <Field
                name="email"
                keyboardType="email-address"
                label="Email"
                icon="email"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Password"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="pass"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
              <Field
                name="confirmpassword"
                keyboardType="default"
                label="Confirm Password"
                component={renderField}
                secureTextEntry={showConfirmPass ? false : true}
                passIcon="confirm"
                icon="lock"
                showConfirmPass={showConfirmPass}
                setshowConfirmPass={setshowConfirmPass}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{ marginVertical: 10, alignItems: 'center' }}
            >
              <View style={styles.signIn}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>Sign up</CustomText>
                )}
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  header: {
    marginTop: height * 0.15,
    width: width,
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.lighter_green,
    marginTop: 10,
  },
  title: {
    color: Colors.light_green,
    fontSize: 40,
    letterSpacing: 5,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  textSign: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Roboto-Medium',
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: 'center',
  },
});
export const SignupForm = reduxForm({
  form: 'signup', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Signup);
