import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import { UserCard } from '../../../components/ui/';

import style from './style';

const Search = props => {
  const { handlePress, users } = props;

  return (
    <React.Fragment>
        <View style={style.scrollViewContent}>
          {!users.length && <Text style={style.warningText}>Kullanıcı bulunamadı</Text>}
          {users.map(user => (
            <UserCard key={user.id} user={user} handlePress={handlePress} />
          ))}
        </View>
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
