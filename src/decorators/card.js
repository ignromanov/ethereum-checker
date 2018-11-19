import React, {Component} from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap'

export default (title, InnerComponent) => class card extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <InnerComponent {...this.props} />
        </CardBody>
      </Card>
    );
  }
}
