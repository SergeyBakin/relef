import React, { Component } from 'react';
import './Header.css';
import NewsList from './NewsList';
import {EventEmitter} from 'fbemitter';
// import Pagination from './Pagination';
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");

const emitter = new EventEmitter();

type Props = void;
type State = void;


class Header extends Component<Props, State> {
    localpageSize = 6
    constructor(props) {
        super(props);
        this.onClickSort = this.onClickSort.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.handleClickPageSize = this.handleClickPageSize.bind(this);
        this.state = {
            sortby: null,
            desc: false,

            pageSize: this.localpageSize,
            activePage: 1,
            total: 0
        };
    }
    componentDidMount() {
        NewsList.addListener('change', (lengthData) => {
            this.setState({
                total: lengthData
            });
        });
    }
    onPageChange(curPage) {
        let sliceObj = {
            skipFrom: this.localpageSize * curPage - this.localpageSize,
            skipTo: this.localpageSize * curPage,
            pageSize: this.localpageSize,
            activePage: curPage
        }
        emitter.emit('getHeader', sliceObj, 'page');
        this.setState({
            activePage: curPage,
            pageSize: sliceObj.pageSize
        });
    }
    onClickSort(event) {
        if (event.target.value !== '0') {
            let type = 'sort';
            emitter.emit('getHeader', {keySort: event.target.value, desc: !this.state.desc}, type);
            this.setState({
                sortby: event.target.value,
                desc: !this.state.desc
            });
        } else {
            this.setState({
                sortby: null
            });
        }
    }
    handleClickPageSize(event) {
        this.localpageSize = parseInt(event.target.innerHTML, 10);
        this.onPageChange(1);
    }
    render() {
        let directSort = null;
        if (this.state.sortby) {
            directSort = (
                <div className="field">
                    {this.state.desc ? ' \u2191' : ' \u2193'}
                </div>
            )
        }
        return (
            <div className="header">
                <div className="field">
                    <select defaultValue="0" onClick={this.onClickSort}>
                        <option value="0">...</option>
                        <option value="NAME">Название новости</option>
                        <option value="DATE">Дата новости</option>
                    </select>
                    {directSort}
                </div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.total || 0}
                    pageRangeDisplayed={3}
                    onChange={this.onPageChange}
                />
                <div className="field">
                    {
                        [6, 12, 24].map( (el, index) => {
                            return (
                                <span
                                    key={index}
                                    className={this.state.pageSize === el ? 'page active' : 'page'}
                                >
                                    <a onClick={this.handleClickPageSize}>{el}</a>
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
    static addListener(eventType: string, fn: Function) {
        emitter.addListener(eventType, fn);
    }
    componentWillUnmount() {
        NewsList.removeListener('change');
    }
}

export default Header;
