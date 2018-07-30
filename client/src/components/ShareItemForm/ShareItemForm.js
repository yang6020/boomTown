import React, { Component, Fragment } from 'react';
import { FormSpy, Form, Field } from 'react-final-form';
import {
  withStyles,
  TextField,
  Typography,
  Button,
  ListItemText,
  Select,
  MenuItem,
  Input,
  Checkbox
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/modules/ShareItemPreview';
import ItemsContainer from '../../containers/ItemsContainer';
import { ViewerContext } from '../../context/ViewerProvider';
class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false
    };
    this.fileRef = React.createRef();
  }
  componentWillMount = () => {
    this.props.resetNewItem();
    this.props.resetImage();
  };

  handleCheckbox(event) {
    this.setState({
      selectedTags: event.target.value
    });
  }
  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  async saveItem(values, tags, addItem) {
    const {
      validity,
      files: [file]
    } = this.fileRef.current;
    if (!validity.valid || !file) return;

    try {
      const itemData = {
        ...values,
        tags: this.applyTags(tags)
      };
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      });
      this.setState({ done: true });
    } catch (e) {
      console.log(e);
    }
  }
  onSubmit = values => {};
  handleImageSelect = event => {
    this.setState({ fileSelected: event.target.files[0] });
  };

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
        {({ addItem, tagData: { tags, loading, error } }) => {
          if (loading) {
            return 'loading...';
          }
          if (error) {
            return 'error';
          }
          return (
            <Form
              onSubmit={(values, form) => {
                this.saveItem(values, tags, addItem);
                this.setState({ selectedTags: [], fileSelected: false });
                form.reset();
                this.props.resetNewItem();
                this.props.resetImage();
              }}
              initialValues={{}}
              render={({
                handleSubmit,
                submitting,
                pristine,
                values,
                form
              }) => (
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
                  <Typography variant="display4">
                    Share. Borrow. Prosper.
                  </Typography>
                  <Field name="imageurl">
                    {(input, meta) => (
                      <Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.fileRef.current.click();
                            // TODO: if i click this and there is an image
                            // selected already, clear the image from the state
                            // and start over.
                          }}
                        >
                          Upload an Image!
                        </Button>
                        <input
                          onChange={e => this.handleImageSelect(e)}
                          type="file"
                          accept="image/*"
                          hidden
                          ref={this.fileRef}
                        />
                      </Fragment>
                    )}
                  </Field>
                  <div>
                    <label>
                      <b>Item Name</b>
                    </label>
                    <Field
                      component="input"
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
                      component="input"
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
                  <div>
                    <Select
                      multiple
                      value={this.state.selectedTags}
                      onChange={event => this.handleCheckbox(event)}
                      input={<Input />}
                      renderValue={selected => {
                        return this.generateTagsText(tags, selected);
                      }}
                    >
                      {tags &&
                        tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            <Checkbox
                              checked={
                                this.state.selectedTags.indexOf(tag.id) > -1
                              }
                            />
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                      }
                    </Select>
                  </div>
                  <div className="buttons">
                    <Button
                      variant="contained"
                      disabled={submitting || pristine}
                      color="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
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
