import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import NewsItem from './NewsItem';
import './NewsList.css';
import CRUD from '../api';
import Header from './Header';
import {EventEmitter} from 'fbemitter';

const emitter = new EventEmitter();

class NewsList extends Component {
    domainImage: string = `http://relefopt.ru`
    allData: Array<Object> = [{}]
    constructor(props) {
        super(props);
        this.state = {
            data: this.allData,
            pageSize: 6,
            activePage: 1
        };
    }
    componentDidMount() {
        CRUD.getData().then(
            result => {
                if (result) {
                    let resObj: Object = {};
                    this.allData = _.map(result.response.ITEMS, (el)=> {
                        resObj = {
                            ID: el.ID,
                            NAME: el.NAME,
                            DATE: moment(el.DATE).format("YYYY/MM/DD hh:mm:ss")
                        };
                        if (el.PREVIEW_PATH) {
                            resObj.PREVIEW_PATH = this.domainImage + el.PREVIEW_PATH;
                        }
                        return resObj;
                    })
                    emitter.emit('change', this.allData.length);
                    this.setState({
                        data: this.allData.slice(0, this.state.pageSize)
                    });
                }
            },
            error => {console.error('err',error)}
        );

        Header.addListener('getHeader', (objState, type) => {
            if (type === 'sort' && objState.keySort && objState.keySort !== '0') {
                this.allData = _.orderBy(this.allData, objState.keySort, objState.desc?'desc':'asc');
                this.setState({
                    data: this.allData.slice(
                        this.state.pageSize * this.state.activePage - this.state.pageSize,
                        this.state.pageSize * this.state.activePage
                    )
                });
            } else if (type === 'page') {
                this.setState({
                    data: this.allData.slice(objState.skipFrom, objState.skipTo),
                    pageSize: objState.pageSize,
                    activePage: objState.activePage,
                });
            }
        });
    }
    render() {
        let checkArr = null;
        if (this.state.data.length && !_.isEmpty(this.state.data[0])) {
            checkArr = (
                <ul className="news-list">
                    {
                        this.state.data.map( (el, index) => {
                            return <NewsItem
                                key={index}
                                {...el}
                            />;
                        })
                    }
                </ul>
            );
        }
        return checkArr;
    }
    static addListener(eventType: string, fn: Function) {
        emitter.addListener(eventType, fn);
    }
    componentWillUnmount() {
        CRUD.removeListener('change');
        Header.removeListener('getHeader');
    }
}

export default NewsList;
