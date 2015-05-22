
import React from 'react';

export default class SplitViewButton extends React.Component {

    render() { 
        return (
            <button
                onClick={this.props.onClick}
                type="button"
                className="win-splitview-button" />
        );
    }
}