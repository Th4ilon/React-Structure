import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class Content extends Component {
  static propTypes = {
    body : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired,
    items : PropTypes.array.isRequired
  }

  render() {
    const {body, items} = this.props;
    return (
      <div className="Content"  >
       {body}
       <ul className="Menu">
            {
              //if items is ini do.map()
              items && items.map(
                (item, key) => <li key={key}><Link to={item.url}>{item.title}</Link></li>
              )
            }
          </ul>
      </div>
    );
  }
}
export default Content;
