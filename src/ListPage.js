import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
      responseData: [],
      page: 0,
    };
  }
  componentDidMount() {
    let activePage = this.state.page;
    axios(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${activePage}`
    ).then((response) => {
      if (response.status === 200) {
        this.setState({
          postsData: [...this.state.postsData, ...response.data.hits],
          page: activePage + 1,
          responseData: response.data.hits,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("sdsdsds", prevState.responseData, this.state.responseData);
    if (prevState.responseData !== this.state.responseData) {
      setInterval(() => {
        let activePage = this.state.page;
        axios(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${activePage}`
        ).then((response) => {
          if (response.status === 200) {
            this.setState({
              postsData: [...this.state.postsData, ...response.data.hits],
            });
          }
        });
        this.setState({ page: activePage + 1 });
      }, 10000);
    }
  }
  fetchMoreData = () => {
    let activePage = this.state.page;
    axios(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${activePage}`
    ).then((response) => {
      if (response.status === 200) {
        this.setState({
          postsData: [...this.state.postsData, ...response.data.hits],
        });
      }
    });
    this.setState({ page: activePage + 1 });
  };

  render() {
    const { postsData } = this.state;
    return (
      <Container>
        <h2>Posts Data</h2>
        <TableContainer>
          <InfiniteScroll
            dataLength={this.state.postsData.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <Table aria-label="Posts Data">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postsData &&
                  postsData.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => this.props.history.push({pathname: '/show-data', state:{postsData: row}})}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.url}</TableCell>
                      <TableCell>{row.created_at}</TableCell>
                      <TableCell>{row.author}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Container>
    );
  }
}

export default ListPage;
