import React from 'react';
import $ from 'jquery';
import { Tabs, Spin} from 'antd';
import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from '../constants';
import {Gallery} from './Gallery';
import {CreatePostButton} from "./CreatePostButton";
import {WrappedAroundMap} from './AroundMap';

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
  state = {
    loadingGeoLocation: false,
    loadingPosts: false,
    posts: [],
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
    //console.log(position);
    this.setState({loadingGeoLocation: false, error: ''});
    const {latitude, longitude} = position.coords;
    localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
    this.loadNearbyPosts();
  }

  onFailLoadGeoLocation = (position) => {
    this.setState({loadingGeoLocation: false, error: 'Fail to load your location'});
  }

  getGalleryPanelContent = () => {
    if(this.state.error) {
      return <div>{this.state.error}</div>
    }
    else if(this.state.loadingGeoLocation) {
      return <Spin tip="Loading location..."/>;
    }
    else if(this.state.loadingPosts) {
      return <Spin tip="Loading posts..."/>;
    }
    else if(this.state.posts && this.state.posts.length > 0) {
      const images = this.state.posts.map((post) => {
        return {
          user: post.user,
          src: post.url,
          thumbnail: post.url,
          thumbnailWidth: 400,
          thumbnailHeight: 300,
          caption: post.message,
        }
      });
      return <Gallery images={images}/>
    }
    return null;
  }

  loadNearbyPosts = (location, radius) => {
    const {lat, lon} = location? location: JSON.parse(localStorage.getItem(POS_KEY));
    const range = radius ? radius: 20;
    //const lat = 37.7915953;
    //const lon = -122.3937977;

    this.setState({loadingPosts: true, error: ''});
    return ($.ajax({
      url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${range}`,
      method: 'GET',
      headers: {
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
      }
    }).then((response) => {
      //console.log(response);
      this.setState({posts: response, loadingPosts: false, error: ''});
    }, (error) => {
      console.log(error);
      this.setState({posts: [], loadingPosts: false, error: error.responseText});
    }).catch((error) => {
      console.log(error);
    }))
  }

  render() {
    const createPostButton = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
    return (
        <Tabs tabBarExtraContent={createPostButton} className="main-tabs">
          <TabPane tab="Posts" key="1">
            {this.getGalleryPanelContent()}
          </TabPane>
          <TabPane tab="Map" key="2">
            <WrappedAroundMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `500px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              posts={this.state.posts}
              loadNearbyPosts={this.loadNearbyPosts}
            />
          </TabPane>
        </Tabs>
    );
  }
}