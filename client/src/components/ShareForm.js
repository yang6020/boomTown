import React, { Component } from 'react';
import { FormSpy, Form, Field } from 'react-final-form';
import { withStyles, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../redux/modules/ShareItemPreview';
import ItemsContainer from '../containers/ItemsContainer';

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false
    };
  }
  onSubmit = values => {};

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    );
  }
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        });
      });
    }

    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  render() {
    const { resetImage, updateNewItem, resetNewItem } = this.props;

    return (
      <ItemsContainer>
        {({ tagData: { tags, loading, error } }) => {
          if (loading) {
            return 'loading...';
          }
          if (error) {
            return 'error';
          }
          return (
            <Form
              onSubmit={this.onSubmit}
              initialValues={{}}
              render={({ handleSubmit, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, updateNewItem);
                      }
                      return '';
                    }}
                  />
                  <div>
                    <label>
                      <b>Item Name</b>
                    </label>
                    <Field
                      name="title"
                      type="text"
                      label="Item Name"
                      style={{ marginLeft: '15px' }}
                    >
                      {({ input, meta }) => (
                        <TextField placeholder="Name your Item" {...input} />
                      )}
                    </Field>
                  </div>
                  <div>
                    <label>
                      <b>Item Description</b>
                    </label>
                    <Field
                      name="description"
                      type="text"
                      label="Item Description"
                      style={{ marginLeft: '15px' }}
                    >
                      {({ input, meta }) => (
                        <TextField
                          placeholder="Name your description"
                          multiline
                          {...input}
                        />
                      )}
                    </Field>
                  </div>
                </form>
              )}
            />
          );
        }}
      </ItemsContainer>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item));
  },
  resetNewItem() {
    dispatch(resetNewItem());
  },
  resetImage() {
    dispatch(resetImage());
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(ShareForm);
