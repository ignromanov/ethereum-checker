import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddressOverview extends Component {
  static defaultProps = {};
  
  static propTypes = {
    address: PropTypes.string.isRequired
  };
  
  state = {};
  
  render() {
    return (
      <div>
        {this.props.address}
      </div>
    );
  }
}

export default AddressOverview;
