import jsonPlaceholader from "../api/jsonPlaceholader";
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => {
    return async dispatch => {
        const responce = await jsonPlaceholader.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: responce.data });
    };
};

export const fetchUser = id => {
    return async dispatch => {
        const responce = await jsonPlaceholader.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: responce.data });
    };
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const responce = await jsonPlaceholader.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: responce.data });
// });