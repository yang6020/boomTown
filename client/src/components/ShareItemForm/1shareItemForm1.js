// import React, { Component, Fragment } from 'react';
// import { FormSpy, Form, Field } from 'react-final-form';
// import { connect } from 'react-redux';
// import ItemContainer from './../../containers/ItemsContainer';
// import {
//   Typography,
//   Button,
//   MenuItem,
//   Select,
//   Checkbox,
//   ListItemText,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   Input
// } from '@material-ui/core';
// import {
//   resetImage,
//   updateNewItem,
//   resetNewItem
// } from '../../redux/modules/ShareItemPreview';

// import { withStyles } from '@material-ui/core/styles';
// import styles from './styles';

// class ShareForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tagError: false,
//       disabled: false,
//       fileSelected: false,
//       selectedTags: [],
//       submitted: false,
//       tagsFormStatus: true,
//       done: false
//     };
//     this.fileRef = React.createRef();
//   }

//   onSubmit = values => {
//     // console.log(values)
//   };

//   validate = values => {
//     const errors = {};
//     if (!values.title) {
//       errors.title = 'Required';
//     }
//     if (!values.description) {
//       errors.description = 'Required';
//     }

//     return errors;
//   };

//   validateTags() {
//     console.log(
//       this.state.tagsFormStatus,
//       this.state.selectedTags.length,
//       'status & length'
//     );
//     if (!this.state.tagsFormStatus && this.state.selectedTags.length === 0) {
//       this.setState({ tagError: true });
//     } else {
//       this.setState({ tagError: false });
//     }
//   }

//   validateTagsSubmit() {
//     if (this.state.selectedTags.length === 0) {
//       this.setState({ tagError: true });
//     }
//   }

//   //WOT iS THIS SUPPOSED TO BE???
//   dispatchUpdate(values, tags, updateNewItem) {
//     if (!values.imageurl && this.state.fileSelected) {
//       this.getBase64Url().then(imageurl => {
//         updateNewItem({
//           imageurl
//         });
//       });
//     }

//     updateNewItem({
//       ...values,
//       tags: this.applyTags(tags)
//     });
//   }

//   //converts an image to base64 string
//   getBase64Url() {
//     return new Promise(resolve => {
//       const reader = new FileReader();
//       reader.onload = e => {
//         resolve(
//           `data:${this.state.fileSelected.type};base64, ${btoa(
//             e.target.result
//           )}`
//         );
//       };
//       reader.readAsBinaryString(this.state.fileSelected);
//     });
//   }

//   handleImageSelect = e => {
//     this.setState({ fileSelected: e.target.files[0] });
//   };

//   applyTags(tags) {
//     return (
//       tags &&
//       tags
//         .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
//         .map(t => ({ title: t.title, id: t.id }))
//     );
//   }
//   // validateTags (){
//   //   console.log(this.state.selectedTags,'validates')
//   // }

//   handleCheckbox(event) {
//     const errors = {};
//     this.setState({
//       selectedTags: event.target.value
//     });

//     this.validateTags();
//     // const minimumOne = event.target.value.length
//     // if (minimumOne === 0) {
//     //   this.setState({ tagError: true })
//     // } else this.setState({ tagError: false })
//   }

//   generateTagsText(tags, selected) {
//     return tags
//       .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
//       .filter(e => e)
//       .join(', ');
//   }

//   handleTagsPristine() {
//     this.setState({ tagsFormStatus: false });

//     this.validateTags();
//     // console.log('dirty')
//     // if (!this.state.tagsFormStatus && this.state.selectedTags.length === 0){
//     //   this.setState({tagError:true})
//     //   console.log('should have errors')
//     // }
//   }

//   changeImageSelectButton() {
//     this.setState({ imageSelectText: 'Reset Image' });
//   }

//   async saveItem(values, tags, addItem, resetImage, resetNewItem) {
//     const {
//       validity,
//       files: [file]
//     } = this.fileRef.current;

//     if (!validity.valid || !file) return;

//     try {
//       const itemData = {
//         ...values,
//         tags: this.applyTags(tags)
//       };
//       await addItem.mutation({
//         variables: {
//           item: itemData,
//           image: file
//         }
//       });

//       resetImage();
//       resetNewItem();
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   resetAllTheThings() {
//     this.setState({ fileSelected: false });
//     this.setState({ selectedTags: [] });
//   }

//   render() {
//     const { classes } = this.props;
//     const { resetImage, updateNewItem, resetNewItem } = this.props;

//     return (
//       <ItemContainer>
//         {/* PUT addITEM back */}
//         {({ addItem, tagData: { tags, loading, error } }) => {
//           if (loading) {
//             return <p>Content Loading...</p>;
//           }

//           if (error) {
//             return error;
//           }

//           return (
//             <div className={classes.root}>
//               <Typography className={classes.header}>
//                 Share. Borrow. Prosper.
//               </Typography>

//               <Form
//                 onSubmit={values => {
//                   this.saveItem(
//                     values,
//                     tags,
//                     addItem,
//                     resetImage,
//                     resetNewItem
//                   );
//                 }}
//                 validate={this.validate}
//                 render={({
//                   handleSubmit,
//                   pristine,
//                   invalid,
//                   form,
//                   submitting,
//                   values,
//                   reset
//                 }) => (
//                   <form
//                     onSubmit={event => {
//                       handleSubmit(event);
//                     }}
//                     id="shareItemForm"
//                   >
//                     <FormSpy
//                       subscription={{ values: true }}
//                       component={({ values }) => {
//                         if (values) {
//                           this.dispatchUpdate(values, tags, updateNewItem);
//                         }
//                         return '';
//                       }}
//                     />

//                     <Field name="imageurl">
//                       {(input, meta) => (
//                         <Fragment>
//                           <Button
//                             onClick={() => {
//                               this.fileRef.current.click();
//                               //TODO: if clicked - and there is an image selected already, clear image from the state and start over
//                             }}
//                           >
//                             <Typography className={classes.imageSelectText}>
//                               {!this.state.fileSelected
//                                 ? 'Select an Image'
//                                 : 'Reset Image'}
//                             </Typography>
//                           </Button>
//                           <input
//                             onChange={e => {
//                               this.handleImageSelect(e);
//                               this.changeImageSelectButton();
//                             }}
//                             type="file"
//                             accept="image/*"
//                             hidden
//                             ref={this.fileRef}
//                           />
//                         </Fragment>
//                       )}
//                     </Field>

//                     <div>
//                       <Field
//                         name="title"
//                         type="text"
//                         label="Name Your Item"
//                         component="input"
//                         className={classes.inputName}
//                         // validate={required}
//                       />
//                     </div>

//                     <div>
//                       <Field
//                         name="description"
//                         component="input"
//                         type="text"
//                         multiline
//                         rows="4"
//                         label="Describe Your Item"
//                         className={classes.inputDescription}

//                         // validate={required}
//                       />
//                     </div>

//                     <FormControl
//                       id="tagSelector"
//                       className={classes.tagSelector}
//                       error={this.state.tagError}
//                     >
//                       <Field name="tags" prisitine={this.state.tagsFormStatus}>
//                         {({ input, meta }) => {
//                           return (
//                             <div>
//                               <InputLabel htmlFor="select-multiple-checkbox">
//                                 Tags - Please select at least one
//                               </InputLabel>

//                               <Select
//                                 multiple
//                                 onClick={() => this.handleTagsPristine()}
//                                 value={this.state.selectedTags}
//                                 onChange={event => this.handleCheckbox(event)}
//                                 error={this.state.tagError}
//                                 input={
//                                   <Input
//                                     id="select-multiple-checkbox"
//                                     className={classes.tagInputLabel}
//                                   />
//                                 }
//                                 renderValue={selected => {
//                                   return this.generateTagsText(tags, selected);
//                                 }}
//                               >
//                                 {tags &&
//                                   tags.map(tag => (
//                                     <MenuItem key={tag.id} value={tag.id}>
//                                       <Checkbox
//                                         checked={
//                                           this.state.selectedTags.indexOf(
//                                             tag.id
//                                           ) > -1
//                                         }
//                                       />
//                                       <ListItemText primary={tag.title} />
//                                     </MenuItem>
//                                   ))}
//                               </Select>
//                             </div>
//                           );
//                         }}
//                       </Field>
//                       {/* <FormHelperText>Select at least one</FormHelperText> */}
//                     </FormControl>

//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       className={classes.shareSubmitButton}
//                       disabled={pristine || submitting}
//                       onClick={() => this.validateTagsSubmit()}
//                     >
//                       Share
//                     </Button>
//                     {/* </div>
//                 )}
//               /> */}
//                   </form>
//                 )}
//               />
//               <div id="texthere" />
//             </div>
//           );
//         }}
//       </ItemContainer>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   updateNewItem(item) {
//     // Inside this function we can dispatch data to our reducer.
//     dispatch(updateNewItem(item));
//   },
//   resetNewItem() {
//     dispatch(resetNewItem());
//   },
//   resetImage() {
//     dispatch(resetImage());
//   }
// });

// export default connect(
//   undefined,
//   mapDispatchToProps
// )(withStyles(styles)(ShareForm));
