import React from 'react';
import ItemCard from '../components/ItemCards';
import { connect } from 'react-redux';

const ShareItemPreview = props => {
  return <ItemCard item={props.shareItemPreview} />;
};

const mapStateToProps = state => {
  return {
    shareItemPreview: state.shareItemPreview
  };
};

export default connect(mapStateToProps)(ShareItemPreview);
