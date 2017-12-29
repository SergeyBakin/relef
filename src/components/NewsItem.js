import React, { Component } from 'react';
import './NewsItem.css';

type Props = {
    PREVIEW_PATH: string,
    DATE: string,
    NAME: string
};
type State = void;

class NewsItem extends Component<Props, State> {
    render() {
        return (
            <li className="news-item">
                <img className="image" src={this.props.PREVIEW_PATH} alt='изображение новости'/>
                <div className="news-item-info">
                    <div className="news-item-date"> {this.props.DATE} </div>
                    <div className="news-item-name"> {this.props.NAME} </div>
                </div>
            </li>
        );
    }
}

NewsItem.defaultProps = {
    PREVIEW_PATH: '',
    DATE: 'Empty',
    NAME: 'Empty'
};

export default NewsItem;
