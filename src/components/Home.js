import React from 'react';
import { Tabs, Button, Spin} from 'antd';
import {GEO_OPTIONS} from '../constants';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
  state = {
    loadingGeoLocation: false,
    error: '',
  }
  componentDidMount() {
    this.setState({loadingGeoLocation: true, error: ''});
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.onSuccessLoadGeoLocation,
        this.onFailLoadGeoLocation,
        GEO_OPTIONS,
      );
    }
    else {
      this.setState({error: 'Your browser does not suspport geo location'});
    }
  }

  onSuccessLoadGeoLocation = (position) => {
    console.log(position);
    this.setState({loadingGeoLocation: false, error: ''});
  }

  onFailLoadGeoLocation = (position) => {
    this.setState({loadingGeoLocation: false, error: 'Fail to load your location'});
  }

  getGalleryPanelContent = () => {
    if(this.state.error) {
      return <div>{this.state.error}</div>
    }
    return this.state.loadingGeoLocation ? <Spin tip="Loading..."/> : null
  }
  render() {
    return (
        <Tabs tabBarExtraContent={operations} className="main-tabs">
          <TabPane tab="Posts" key="1">
            {this.getGalleryPanelContent()}
          </TabPane>
          <TabPane tab="Map" key="2">Content of tab 2</TabPane>
        </Tabs>
    );
  }
}