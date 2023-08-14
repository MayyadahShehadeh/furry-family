import axios from 'axios';
import socket from '../../socket';
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  readMessages,
} from '../conversations';
import { gotUser, setFetchingStatus } from '../user';

axios.interceptors.request.use(async function (config) {
  // Needs update!!! localStorage.getItem is not async
  const token = await localStorage.getItem('messenger-token');
  console.log('messenger tokeennnnn :::', token);
  config.headers['x-access-token'] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('https://furry-family-backend-production.up.railway.app/auth/user');
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit('go-online', data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('https://furry-family-backend-production.up.railway.app/auth/register', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('https://furry-family-backend-production.up.railway.app/auth/login', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete('https://furry-family-backend-production.up.railway.app/auth/logout');
    await localStorage.removeItem('messenger-token');
    dispatch(gotUser({}));
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get('https://furry-family-backend-production.up.railway.app/api/conversations');
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post('https://furry-family-backend-production.up.railway.app/api/messages', body);
  return data;
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://furry-family-backend-production.up.railway.app/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

// UPDATE MESSAGE READ STATUS THUNK CREATORS

export const updateMsgReadStatus = (conversationId) => async (dispatch) => {
  try {
    await axios.patch(`https://furry-family-backend-production.up.railway.app/api/conversations/${conversationId}`);
    dispatch(readMessages(conversationId));
  } catch (error) {
    console.error('error');
  }
};
