import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar({ technology, tName }) {
  const { pathname } = useLocation();
  return (
    <div className="list-group list-group-flush techDetails">
      {technology?.concepts?.map((concept, index) => (
        <div key={concept._id} className="list-group-item p-0">
          <div className="p-2 border-start border-4 border-primary">
            <h6 className="ms-2 mb-0 fw-semibold">
              <span className="text-primary me-2">{index + 1}.</span>
              {concept.conceptName}
            </h6>
          </div>
          <div className="topics-list ">
            {concept.topics?.map((topic) => (
              <Link
                key={topic._id}
                to={`/Training/${tName}/${concept.conceptName.replaceAll(" ","-")}/${topic.title.replaceAll(" ", "-")}`}
                className="d-block p-1 text-decoration-none border-start border-4 border-transparent topic-link"
              >
                <div
                    className={`ms-3 ${
                    pathname.split("/")[4] === topic?.title.replaceAll(" ", "-")
                        ? "bg-primary rounded text-light px-2 py-1"
                        : "text-body"
                    }`}
                >
                    <i className="bi bi-book me-2 "></i>
                    {topic?.shortheading}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
