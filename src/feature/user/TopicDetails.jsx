import React, { useEffect, useState } from "react";
import { useGetAlltechnologiesQuery, useTopicdetailsQuery } from "../../services/technology";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

function TopicDetails() {
  const { tid, cid, toid } = useParams();
  const { data: technology, isLoading: isTechnologyLoading } = useTopicdetailsQuery({ tid, cid });
  const { data: allTechnologies, isLoading: isAllTechnologiesLoading } = useGetAlltechnologiesQuery();
  const [topicdetails, setTopicdetails] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (technology) {
      const selectedConcept = technology?.concepts?.find((concept) => concept._id === cid);
      const selectedTopic = selectedConcept?.topics?.find((topic) => topic._id === toid);
      const validContents = selectedTopic?.contents?.filter((content) => typeof content.content === "string");

      setTopicdetails(validContents || []);
    }
  }, [technology, cid, toid]);

  useEffect(() => {
    if (topicdetails.length > 0) {
      setActiveTab(topicdetails[0].type);
    }
  }, [topicdetails]);

  const uniqueTabs = [...new Set(topicdetails.map((content) => content.type))];
  const filteredContent = topicdetails.filter((content) => content.type === activeTab);

  return (
    <div className="container-fluid py-1 px-0 bg-white">
      {/* Loader for Initial API Fetching */}
      {isTechnologyLoading || isAllTechnologiesLoading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="d-flex  align-items-center">
            {allTechnologies?.map((technology) => (
              <div key={technology._id}>
                {technology._id === tid &&
                  technology.concepts.map((concept) => (
                    <div key={concept._id}>
                      {concept._id === cid &&
                        concept.topics.map((topic) => (
                          <div key={topic._id}>
                            {topic._id === toid && (
                                <h2 className="p-1 fw-bold" style={{color:'rgb(42, 82, 152)'}}>{topic.title}</h2>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="row">
            <div className="col-12">
              {uniqueTabs && uniqueTabs.length > 0 ? (
                <div className="card border-0">
                  <div className="card-header bg-white px-0">
                    <ul className="nav nav-tabs card-header-tabs border-bottom-0">
                      {uniqueTabs.map((tab) => (
                        <li className="nav-item" key={tab}>
                          <button
                            className={`nav-link text-bold ${activeTab === tab ? "active fw-semibold" : ""} 
                            ${activeTab === tab ? "text-primary" : "text-secondary"}`}
                            onClick={() => setActiveTab(tab)}
                          >
                            <i
                              className={`bi bi-${
                                tab.toLowerCase() === "theory"
                                  ? "book"
                                  : tab.toLowerCase() === "practice"
                                  ? "code-square"
                                  : tab.toLowerCase() === "quiz"
                                  ? "question-circle"
                                  : "file-text"
                              } me-2`}
                            ></i>
                            {tab && tab == "Description"? "Notes": tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-body">
                    {filteredContent.length > 0 ? (
                      <div className="content-wrapper">
                        {filteredContent.map((content, index) => (
                          <div className="content-section mb-3" key={content._id}>
                            <div className="d-flex align-items-center mb-3">
                              <span className="badge bg-primary me-2">{index + 1}</span>
                              <h5 className="mb-0 ">{content.shortheading}</h5>
                            </div>
                            <div className="content-body bg-white rounded-3 shadow-sm border border-grey py-4">
                              {activeTab === 'Examples'
                              ? parse(content.content).map((el, i) => {
                                  if (el !== '\n' && ((el.type === 'p' && el.props.children !== undefined) || el.type === 'iframe')) {
                                    return (
                                      <div key={i} className="px-2">
                                        <p className={` ms-5 mb-2 ${Array.isArray(el?.props?.children) ? "ps-5" : "ms-0"}`}>{el.props.children}</p>
                                        {el.type=="iframe" && <span className="ms-5 pb-4 ps-5" ><a href={el.props.src} target="blank">{el.props.src}</a></span>}
                                      </div>
                                    );
                                  }
                                  return null; // Return null for elements that don't match
                                })
                              : parse(content.content)
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="alert alert-info d-flex align-items-center" role="alert">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        <div>No content available for this section yet.</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // <div className="alert alert-warning d-flex align-items-center" role="alert">
                //   <i className="bi bi-exclamation-triangle-fill me-2"></i>
                //   <div>No content available for this topic.</div>
                // </div>
                <div className="d-flex justify-content-center my-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopicDetails;
