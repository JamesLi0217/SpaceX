import React, {Component} from 'react';
import { Button, List, Avatar, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    state = {
        selected: []
    }
    render() {
        const satList = this.props.setInfo ? this.props.setInfo.above : [];
        const isLoading = this.props.isLoading;

        return (
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button className="sat-list-btn"
                            type="primary" onClick={this.onShow}>Track on the map</Button>
                </div>

                <hr/>
                {isLoading ?
                <Spin tip="Loading..." size="large"/>
                :
                <List
                    className="sat-list"
                    itemLayout="horizontal"
                    size="small"
                    dataSource={satList}
                    renderItem={item => (
                        <List.Item
                            actions = {[<Checkbox dataInfo={item} onChange={this.onChange} />]} >
                            <List.Item.Meta avatar={<Avatar size={50} src={satellite}/>}
                                            title={<p>{item.satname}</p>}
                                            description={`Launch Date: ${item.lauchDate}`}/>

                        </List.Item>
                    )}
                />}

            </div>
        );
    }

    onChange = (e) => {
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;

        const list = this.addOrRemove(dataInfo, checked, selected);

        this.setState({selected: list});
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satId === item.satid );

        if (status && !found) {
            list = [ ...list, item];
            //list.push(item)
        }

        if (!status && found) {
            list = list.filter( entry => {return entry.satid !== item.satid;} )
        }

        return list;
    }

    onShow = () => {
        this.props.onShowMap(this.state.selected);
    }
 }

export default SatelliteList;