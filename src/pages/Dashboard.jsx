import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import "../index.css";

// loading
function SkeletonCard() {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </Card.Body>
    </Card>
  );
}

// use IsMobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function Dashboard() {
  const isMobile = useIsMobile();

  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [search, setSearch] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  const [postPage, setPostPage] = useState(1);
  const [albumPage, setAlbumPage] = useState(1);

  const postsPerPage = 6;
  const albumsPerPage = 10;

  // API call
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoadingPosts(false);
      });
      
  }, []);

  // filter logic
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  //loading
  // const SkeletonCard = () => {
  // return (
  //     <Card className="h-100 shadow-sm">
  //       <Card.Body>
  //         <div className="skeleton skeleton-title"></div>
  //         <div className="skeleton skeleton-text"></div>
  //         <div className="skeleton skeleton-text"></div>
  //         <div className="skeleton skeleton-text"></div>
  //       </Card.Body>
  //     </Card>
  //   );
  // };

  //const [albums, setAlbums] = useState([]);
  
  //const lastPostIndex = currentPage * postsPerPage;
  //const firstPostIndex = lastPostIndex - postsPerPage;
  //const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  //const totalPages = Math.ceil(posts.length / postsPerPage);


  //const currentAlbums = albums.slice(firstPostIndex, lastPostIndex);
  //const totalPages2 = Math.ceil(albums.length / postsPerPage);

  const lastPostIndex = postPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  //const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);
  //const totalPostPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  const totalPostPages = Math.ceil(posts.length / postsPerPage);

  const lastAlbumIndex = albumPage * albumsPerPage;
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage;
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex);
  const totalAlbumPages = Math.ceil(albums.length / albumsPerPage);



  

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(data => setAlbums(data));
      setLoadingAlbums(false);
  }, []);


  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to Admin Dashboard 🚀</h1>
      </div>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row>
      {loadingPosts ? (
        [...Array(6)].map((_, i) => (
          <Col md={6} className="mb-3" key={i}>
            <SkeletonCard />
          </Col>
        ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Col md={6} className="mb-3" key={post.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ):(
          <Col md={12}>
            <h4 className="text-center mt-4">No Data Found 😢</h4>
          </Col>
        )
      }
      </Row>

      <hr />
      
      <Row>
        {loadingPosts ? (
        [...Array(6)].map((_, i) => (
          <Col md={6} className="mb-3" key={i}>
            <SkeletonCard />
          </Col>
        ))
        ) :currentPosts.length > 0 ? (
          currentPosts.map((post) => (
          <Col md={4} className="mb-3" key={post.id}>
            <Card>
              <Card.Body>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </Card.Body>
            </Card>
          </Col>
        ))
        ):(
          <Col md={12}>
            <h4 className="text-center mt-4">No Data Found 😢</h4>
          </Col>
        )
        }
      </Row>
        <Button
          onClick={() => setPostPage(postPage - 1)}
          disabled={postPage === 1} >
          Prev
        </Button>

        <span style={{ margin: "0 10px" }}>
          Page {postPage} of {totalPostPages}
        </span>

        <Button
          onClick={() => setPostPage(postPage + 1)}
          disabled={postPage === totalPostPages}
        >
          Next
        </Button>

        <hr />

        {isMobile ? (
          <div>
            <h2>Albums</h2>
            {loadingAlbums ? (
              [...Array(6)].map((_, i) => (
                <Col md={6} className="mb-3" key={i}>
                  <SkeletonCard />
                </Col>
              ))
            ) :currentAlbums.length > 0 ? (
              currentAlbums.map((album) => (
                <p key={album.id}>{album.title}</p>
              ))
            ):(
              <Col md={12}>
                <h4 className="text-center mt-4">No Data Found 😢</h4>
              </Col>
            )
          }
          <Button
            onClick={() => setAlbumPage(albumPage - 1)}
            disabled={albumPage === 1} >
            Prev
          </Button>

          <span style={{ margin: "0 10px" }}>
            Page {albumPage} of {totalAlbumPages}
          </span>

          <Button
            onClick={() => setAlbumPage(albumPage + 1)}
            disabled={albumPage === totalAlbumPages}
          >
            Next
          </Button>
          </div>
          ):(
          <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {currentAlbums.map((album) => (
                <tr key={album.id}>
                  <td>{album.id}</td>
                  <td>{album.userId}</td>
                  <td>{album.title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-3">
            {[...Array(totalAlbumPages)].map((_, index) => (
              <Button
                key={index}
                className="me-2"
                variant={albumPage === index + 1 ? "primary" : "outline-primary"}
                onClick={() => setAlbumPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          </>
          )
      }
        

        
    </Container>
  );
}

export default Dashboard;