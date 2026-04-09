import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  // API call
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
      
  }, []);

  // filter logic
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

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
        {filteredPosts.map((post) => (
          <Col md={6} className="mb-3" key={post.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
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