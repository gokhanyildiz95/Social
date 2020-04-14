import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import { ScrollView } from 'react-native';
import { PostItem } from '../../../components/ui/';

import style from './style';

const Search = props => {
  const { handlePress, users } = props;

  return (
    <React.Fragment>  
      <ScrollView style={style.scrollView}>
        <View style={style.scrollViewContent}>
         {users.map(user => (
            <PostItem key={user.userId.id} title={user.title} date="09:21" content={user.content} user={user} handlePress={handlePress} />
          ))}  
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

Search.defaultProps = {
  users: []
};

Search.propTypes = {
  handlePress: PropTypes.func.isRequired,
  users: PropTypes.array
};

export default Search;
