import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Spinner } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { defaultColors } from '../../../config/style';

// Style
import style from './style';

const Loading = () => {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
      <Container style={style.container}>
        <Grid>
          <Row size={100} style={style.row}>
            <Spinner color="white" />
          </Row>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Loading;
