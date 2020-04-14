import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Footer } from "../../../components/common/";
import { Container, Content } from "native-base";
import { Button } from "../../../components/ui/";

import styles from "./styles";

class Home extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header />
        <Content>
          <Button
            size="xl"
            color="greenToTurquoise"
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="greenToTurquoise"
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="redToBeige"
            angle={false}
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="redToBeige"
            angle={false}
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="darkBlueToTurquoise"
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="darkBlueToTurquoise"
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="greyToHalfGrey"
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="greyToHalfGrey"
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            bordered
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            bordered
            shadow
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button size="xl" extraStyle={{ marginTop: 10 }} text="Text" />
          <Button
            size="xl"
            shadow
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            bordered
            color="orangeToYellow"
            shadow
            extraStyle={{ marginTop: 10 }}
            text="Shadow Text"
          />
          <Button
            size="xl"
            bordered
            color="orangeToYellow"
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            size="xl"
            color="orangeToYellow"
            shadow
            extraStyle={{ marginTop: 10 }}
            text="Shadow Text"
          />
          <Button
            size="xl"
            color="orangeToYellow"
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button size="l" extraStyle={{ marginTop: 10 }} text="Text" />
          <Button size="l" rounded extraStyle={{ marginTop: 10 }} text="Text" />
          <Button
            color="orangeToYellow"
            size="l"
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
          <Button
            color="orangeToYellow"
            size="l"
            rounded
            extraStyle={{ marginTop: 10 }}
            text="Text"
          />
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default Home;
