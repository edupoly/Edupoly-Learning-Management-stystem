import React, { useState } from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  useGetAlltechnologiesQuery,
  useGettechnologyQuery,
} from "../../services/technology";
import "./TechnologyDetails.css";

function TechnologyDetails() {
  const { pathname } = useLocation();
  const { tid, conceptId, topicId } = useParams();
  const { data: technology, isLoading } = useGettechnologyQuery(tid);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  var { data: technologies } = useGetAlltechnologiesQuery();

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const handlesubmit = (technology) => {
    if (
      technology.concepts?.length > 0 &&
      technology.concepts[0].topics?.length > 0
    ) {
      navigate(
        `/technologydetails/${technology._id}/${technology.concepts[0]._id}/${technology.concepts[0].topics[0]._id}`
      );
    } else {
      alert("No concepts or topics available for this technology.");
    }
  };

  return (
    <div className={`technology-div ${window?.innerWidth > '1600' && "container"}`}>
      <div className="d-flex align-items-center bg-secondary mb-2" style={{overflowX:"auto"}}>
        <button
                className="btn p-2 d-flex d-lg-none align-items-center justify-content-center text-white"
                style={{ width: "40px", height: "40px" }}
                // onClick={() => setIsCollapsed(!isCollapsed)}
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <i className="bi bi-list fs-4"></i>
              </button>
        <div className="ps-3 d-flex">
          {technologies?.map((el,index) => {
          return (
            <p
              key={el?._id}
              className={`mb-0 fw-bold cursor-pointer me-3 pe-4 ${el?.title == technology?.title && "text-white"} ${index != technologies?.length-1 && "border-end border-white"}`}
              onClick={() => handlesubmit(el)}
              style={{ cursor: "pointer" }}
            >
              {el?.title}
            </p>
          );
        })}
        </div>
      </div>
      {/* Header - Full Width */}
      {/* <div className="w-100">
        <div className="pe-4 py-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
              <button
                className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <i className="bi bi-list fs-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div
        className="offcanvas offcanvas-start d-flex d-lg-none"
        style={{ width: "65%" }}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="list-group list-group-flush ">
                {technology?.concepts?.map((concept, index) => (
                  <div key={concept._id} className="list-group-item p-0">
                    <div className="p-2 border-start border-4 border-primary">
                      <h6 className="ms-2 mb-0 fw-semibold">
                        <span className="text-primary me-2">{index + 1}.</span>
                        {concept.conceptName}
                      </h6>
                    </div>
                    <div className="topics-list " data-bs-dismiss="offcanvas" aria-label="Close">
                      {concept.topics?.map((topic) => (
                        <Link
                          key={topic._id}
                          to={`/technologydetails/${tid}/${concept._id}/${topic._id}`}
                          className="d-block p-1 text-decoration-none border-start border-4 border-transparent topic-link"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center ms-4">
                                <span className="text-body">
                                  <i className="bi bi-book me-2 text-primary"></i>
                                  {topic?.shortheading}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className=" d-flex">
          {/* Sidebar */}
          <div className="d-none d-lg-flex" style={{ width: "20%", maxHeight: "100%" }}>
            {!isCollapsed && (
              <div className="p-0 ">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    <div className="list-group list-group-flush techDetails">
                      {technology?.concepts?.map((concept, index) => (
                        <div key={concept._id} className="list-group-item p-0">
                          <div className="p-2 border-start border-4 border-primary">
                            <h6 className="ms-2 mb-0 fw-semibold">
                              <span className="text-primary me-2">
                                {index + 1}.
                              </span>
                              {concept.conceptName}
                            </h6>
                          </div>
                          <div className="topics-list ">
                            {concept.topics?.map((topic) => (
                              <Link
                                key={topic._id}
                                to={`/technologydetails/${tid}/${concept._id}/${topic._id}`}
                                className="d-block p-1 text-decoration-none border-start border-4 border-transparent topic-link"
                              >
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1">
                                    <div
                                      className={`ms-3 ${
                                        pathname.split("/")[4] == topic?._id
                                          ? "bg-primary rounded text-light px-2 py-1"
                                          : "text-body"
                                      }`}
                                    >
                                      <i className="bi bi-book me-2 "></i>
                                      {topic?.shortheading}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div
            className="px-0 techDetails flex-fill"
            // style={window.innerWidth <= 768  ? { width: "100%" } : { width: "80%" }}
          >
            <div className="card border-0 m-0 shadow-sm">
              <div className="card-body pt-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetails;
