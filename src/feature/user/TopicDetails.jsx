import React, { useEffect, useMemo, useState } from "react";
import { useGetAlltechnologiesQuery, useTopicdetailsQuery } from "../../services/technology";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

function TopicDetails() {
  const { tName, cName, toName } = useParams();
  const { data: allTechnologies, isLoading: isAllTechnologiesLoading } = useGetAlltechnologiesQuery();
  const tech = allTechnologies?.find((el)=> el.title===tName)
  const concept = tech?.concepts?.find((el)=> el.conceptName===cName.replaceAll('_',' '))
  const filteredTopic = concept?.topics?.find((el)=> el.title===toName.replaceAll('_',' '))
      var validContents = filteredTopic?.contents?.filter((content) => typeof content.content === "string");
  const tid=tech?._id
  const cid=concept?._id

  const { isLoading: isTechnologyLoading } = useTopicdetailsQuery({ tid , cid });
  const [activeTab, setActiveTab] = useState("");
  const uniqueTabs = useMemo(() => {
    return [...new Set(validContents.map((content) => content.type))];
  }, [validContents]);
  const filteredContent = validContents.filter((content) => content.type === activeTab);

  useEffect(() => {
    const tab =localStorage.getItem('activeTab')
    const findTab = uniqueTabs?.filter((el)=> el===tab)
    let filteredTab = findTab.length>0 ? tab : validContents[0]?.type
    setActiveTab(filteredTab)
    localStorage.setItem('activeTab',filteredTab)
    
  }, [uniqueTabs,validContents]);

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
          <Helmet>
              <title>{filteredTopic?.shortheading}</title>
              <meta name="description" content="Nested component" />
          </Helmet>
          <h2 className="p-1 fw-bold" style={{color:'rgb(42, 82, 152)'}}>{filteredTopic?.title}</h2>

          {/* Content Section */}
              {uniqueTabs && uniqueTabs.length > 0 ? (
                <div className="card border-0">
                  <div className="card-header bg-white px-0 position-sticky top-0">
                    <ul className="nav nav-tabs card-header-tabs border-bottom-0">
                      {uniqueTabs.map((tab) => (
                        <li className="nav-item" key={tab}>
                          <button
                            className={`nav-link text-bold ${activeTab === tab ? "text-primary fw-semibold" : "text-secondary"}`}
                            onClick={() => {
                              setActiveTab(tab)
                              localStorage.setItem('activeTab',tab)
                            }}
                          >
                            <i className={`bi bi-${
                                tab.toLowerCase() === "theory"
                                  ? "book"
                                  : tab.toLowerCase() === "practice"
                                  ? "code-square"
                                  : tab.toLowerCase() === "quiz"
                                  ? "question-circle"
                                  : "file-text"
                              } me-2`}>
                            </i>
                            {tab && tab === "Description"? "Notes": tab}
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
                            <div className="content-body bg-white rounded-3 shadow-sm border border-grey py-4" style={{overflow:"auto"}}>
                              {activeTab === 'Examples'
                              ? parse(content.content).map((el, i) => {
                                  if (el !== '\n' && ((el.type === 'p' && el.props.children !== undefined) || el.type === 'iframe')) {
                                    return (
                                      <div key={i} className="px-2">
                                        <p className={` ms-5 mb-2 ${Array.isArray(el?.props?.children) ? "ps-5" : "ms-0"}`}>{el.props.children}</p>
                                        {el.type==="iframe" && <span className="ms-5 pb-4 ps-5" ><a href={el.props.src} target="blank">{el.props.src}</a></span>}
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
        </>
      )}
    </div>
  );
}

export default TopicDetails;