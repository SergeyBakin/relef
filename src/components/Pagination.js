// do not use


import React, { Component } from 'react';
import './Pagination.css';

type Props = void;
type State = void;

class Pagination extends Component<Props, State> {
    render() {
        if (!this.props.total) {
            return null;
        }
        let pages = [];
        const total = Math.ceil(this.props.total / this.props.pageSize);
        console.log('total',total);
        for (var i = 1; i <= total; i++) {
            pages.push(
                <a href="#" key={i} onClick={this.handleClick} className={this.props.active ? 'active' : ''}>{i}</a>
            );
        }
        return (
            <div className="pagination">{pages}</div>
        );
    }
}

// Pagination.defaultProps = {
//     PREVIEW_PATH: '',
//     DATE: 'Empty',
//     NAME: 'Empty'
// };

export default Pagination;
