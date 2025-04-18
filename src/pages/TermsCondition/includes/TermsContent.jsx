import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "../../../styles/termsContent.scss";
import { useSelector } from "react-redux";

function TermsContent() {
  const { terms } = useSelector((state) => state.InfoPageReducer);
  const [defaultActiveKey, setDefaultActiveKey] = useState(0);

  const handleNavClick = (id) => {
    const section = document.querySelector(`#terms-tab-${id}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    if (terms) {
      setDefaultActiveKey(terms?.[0]?.id);
    }
  }, [terms]);

  return (
    <div className={"TermsContent py-5"}>
      <div className={"container"}>
        {defaultActiveKey > 0 && (
          <Tab.Container
            id={"left-tabs-example"}
            defaultActiveKey={defaultActiveKey}
          >
            <Row>
              <Col sm={4}>
                <Nav variant={"pills"} className={"flex-column"}>
                  {terms?.map((item) => (
                    <Nav.Item key={item.id}>
                      <Nav.Link
                        onClick={() => handleNavClick(item.id)}
                        eventKey={item.id}
                      >
                        {item.title}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {terms?.map((item) => (
                    <Tab.Pane key={item.id} eventKey={item.id}>
                      {terms?.map((subItem, index) => (
                        <div
                          id={`terms-tab-${subItem.id}`}
                          key={index}
                          className={"contentWrapper pb-4"}
                        >
                          <div className={"heading h4"}>{subItem.title}</div>
                          <div className={"content"}>{subItem.content}</div>
                        </div>
                      ))}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        )}
      </div>
    </div>
  );
}

export default TermsContent;
