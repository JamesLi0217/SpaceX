import React, {Component} from 'react';
import SatSetting from './SatSetting.js'
import SatelliteList from './SatelliteList'
import {NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY} from '../constants'
import axios from 'axios';
import WorldMap from './WorldMap'

class Main extends Component {
    state  = {
        satInfo: null,
        setting: null,
        satList: null,
        isLoadingList: false
    }

    showSatellite = (setting) => {
        this.setState({setting: setting});
        this.fetchSatellite(setting);
    }

    render() {
        const { setInfo, setting, isLoadingList, satList } = this.state;
        return (
            <div className="main">
                <div className="left-side">
                    <SatSetting onShow={this.showSatellite}/>
                    <SatelliteList setInfo={setInfo}
                                   isLoading={this.state.isLoadingList}
                                   onShowMap={this.showMap}/>
                </div>
                <div className="right-side">
                    <WorldMap satData={satList} observeData={setting}/>
                </div>
            </div>
        );
    }

    fetchSatellite = setting => {
        //fetch data from backend server
        const { latitude, longitude, elevation, altitude } = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({isLoadingList: true});

        axios.get(url)
            .then(response => {
                console.log(response)
                this.setState({
                    setInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(err => {
                console.log('err in fetch -> ', err)
                this.setState({
                    isLoadingList: false
                })
            })
    }

    showMap = (satList) => {
        console.log("show on map", satList)
        this.setState({
            satList: [...satList]
        })
    }
}

export default Main;