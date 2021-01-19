import React, { Component } from "react";
import {
  Container,
  Card,
  CardContent,
  Tabs,
  Tab,
  Grid,
} from "@material-ui/core";
import ReactJson from "react-json-view";
class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  handleTab = (e, val) => {
    this.setState({ activeTab: val });
  };
  render() {
    const { postsData } = this.props.location.state;
    const { activeTab } = this.state;

    return (
      <Container>
        <h2>View Data</h2>

        <Tabs
          value={activeTab}
          onChange={this.handleTab}
          aria-label="simple tabs example"
        >
          <Tab label="Raw JSON" />
          <Tab label="Post Data" />
        </Tabs>
        <div role="tabpanel" hidden={activeTab !== 0}>
          <Card>
            <CardContent>
              <ReactJson src={postsData} />
            </CardContent>
          </Card>
        </div>

        <div role="tabpanel" hidden={activeTab !== 1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <span>Title: </span>
                  <span>{postsData.title}</span>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <span>URL: </span>
                  <span>{postsData.url}</span>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <span>Author Name: </span>
                  <span>{postsData.author}</span>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default ShowData;
