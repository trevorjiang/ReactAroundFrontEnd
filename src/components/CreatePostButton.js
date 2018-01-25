import React from 'react';
import {WrappedCreatePostForm} from "./CreatePostForm";
import $ from 'jquery';
import {API_ROOT, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from "../constants";
import { Modal, Button, message} from 'antd';

export class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.form.validateFields((err, values) => {
      if(!err) {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const formData = new FormData();
        formData.set('lat', lat + Math.random() * 0.1 - 0.05);
        formData.set('lon', lon + Math.random() * 0.1 - 0.05);
        formData.set('message', values.message);
        formData.set('image', values.image[0]);
        this.setState({
          confirmLoading: true,
        });
        $.ajax({
          method: 'POST',
          url: `${API_ROOT}/post`,
          headers: {
            Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
          },
          processData: false,
          contentType: false,
          dataType: 'text',
          data: formData,
        }).then(() => {
          message.success('created a post successfully.');
          this.form.resetFields();
        },(error) => {
          message.error(error.responseText);
          this.form.resetFields();
        }).then(() => {
          this.props.loadNearbyPosts().then(() => {
            this.setState({ visible: false, confirmLoading: false});
          });
        }).catch((e) => {
          message.error('create post failed.');
          console.error(e);
        });
      }
    });
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const { visible, confirmLoading} = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create Posts</Button>
        <Modal title="Create New Post"
               visible={visible}
               onOk={this.handleOk}
               okText="Create"
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               cancelText="Cancel"
        >
          <WrappedCreatePostForm ref={this.saveFormRef}/>
        </Modal>
      </div>
    );
  }
}
