import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [usersList, setUsers] = useState([]);
  const formSubmitted = (e) => {
    e.preventDefault();
    let temp1 = "";
    let temp2 = "";
    for (let c of firstInput) {
      if (!secondInput.toLocaleLowerCase().includes(c.toLocaleLowerCase())) {
        temp1 += c;
      }
    }
    for (let c of secondInput) {
      if (!firstInput.toLocaleLowerCase().includes(c.toLocaleLowerCase())) {
        temp2 += c;
      }
    }

    setOption1(temp1);
    setOption2(temp2);
  };
  useEffect(() => {
    const getData = async () => {
      const api1 = "https://reqres.in/api/users/1";
      const api2 = "https://reqres.in/api/users/3";
      const api3 = "https://reqres.in/api/users/10";
      const fetch1 = axios.get(api1);
      const fetch2 = axios.get(api2);
      const fetch3 = axios.get(api3);
      axios.all([fetch1, fetch2, fetch3]).then(
        axios.spread((...all) => {
          const tempList = [];
          all.map((each) => {
            tempList.push({
              email: each.data.data.email,
              id: each.data.data.id
            });
            return tempList;
          });
          setUsers(tempList);
        })
      );
    };
    getData();
  }, []);
  console.log(usersList);
  return (
    <Container style={{ height: "100vh" }}>
      <Row>
        <Col className="p-3">
          <Form onSubmit={formSubmitted}>
            <input
              type="text"
              value={firstInput}
              onChange={(e) => setFirstInput(e.target.value)}
              className="m-2"
            />
            <input
              onChange={(e) => setSecondInput(e.target.value)}
              type="text"
              value={secondInput}
              className="m-2"
            />
            <Button className="mb-2" type="submit">
              Check
            </Button>
          </Form>
          <p>Option1 - {option1}</p>
          <p>Option2 - {option2}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-2 text-center">
            <Card.Title>Users Emails</Card.Title>
            <Card.Body>
              <ul>
                {usersList.map((each) => (
                  <li style={{ listStyleType: "none" }} key={each.id}>
                    <h1 style={{ fontSize: "20px" }}>{each.email}</h1>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
