import axios from 'axios';
import { server } from '../../server';

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });

    const user_token = localStorage.getItem('token');
    const { data } = await axios.get(`${server}/user/getUser`, {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    });
    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response.data.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadSellerRequest',
    });
    const seller_token = localStorage.getItem('seller_token');
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      headers: {
        Authorization: `Bearer ${seller_token}`,
      },
    });
    dispatch({
      type: 'LoadSellerSuccess',
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: 'LoadSellerFail',
      payload: error.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'updateUserInfoRequest',
      });

      const user_token = localStorage.getItem('token');
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );

      dispatch({
        type: 'updateUserInfoSuccess',
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: 'updateUserInfoFailed',
        payload: error.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'updateUserAddressRequest',
      });
      const user_token = localStorage.getItem('token');
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );

      dispatch({
        type: 'updateUserAddressSuccess',
        payload: {
          successMessage: 'User address updated succesfully!',
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: 'updateUserAddressFailed',
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteUserAddressRequest',
    });
    const user_token = localStorage.getItem('token');
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      },
    );

    dispatch({
      type: 'deleteUserAddressSuccess',
      payload: {
        successMessage: 'User deleted successfully!',
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: 'deleteUserAddressFailed',
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllUsersRequest',
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: 'getAllUsersSuccess',
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFailed',
      payload: error.response.data.message,
    });
  }
};
