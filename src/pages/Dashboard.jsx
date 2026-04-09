import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import "../index.css";
function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // API call
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
      
  }, []);

  // filter logic
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  //loading
  const SkeletonCard = () => {
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
  };

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
      {loading ? (
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
                    <Link to={'/post/${post.id}'}>{post.title}</Link>
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
        {posts.map((post) => (
          <Col md={6} className="mb-3" key={post.id}>
            <Card>
              <Card.Body>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;