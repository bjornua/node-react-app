import React from "react";
import Page from "../wrappers/page";
import { connect } from "react-redux";

class NotFound extends React.Component {
    render() {
        this.props.setTitle("Not Found");
        return <Page>
            <div>
                <h1>Page not found</h1>
                <div className="dh-maxw35">
                    <p>The page you are looking for does not exist</p>
                    <p>
                        <strong>{this.props.url}</strong>
                    </p>
                    <p>This usually happens when:</p>
                    <ul>
                        <li>The page has been removed at some point.</li>
                        <li>The link you clicked was mistyped.</li>
                        <li>You mistyped the address.</li>
                    </ul>
                    <p>We are sorry about the inconvenience.</p>
                </div>
            </div>
        </Page>;
    }
}

export default connect(function(state) {
    return {
        url: state.getIn(["route", "url"])
    };
})(NotFound);
