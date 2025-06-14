import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetAlltechnologiesQuery, useGettechnologyQuery} from "../../services/technology";
import "./TechnologyDetails.css";
import SideBar from "./sideBar";

function TechnologyDetails() {
  var { data: technologies } = useGetAlltechnologiesQuery();
  const { tName} = useParams();
  const tid = technologies && technologies?.find((el)=> el.title===tName)
  
  const { data: technology, isLoading } = useGettechnologyQuery(tid?._id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const handlesubmit = (technology) => {
    if (technology.concepts?.length > 0 && technology.concepts[0].topics?.length > 0) {
      navigate(`/Training/${technology.title}/${technology.concepts[0].conceptName.replaceAll(' ','-')}/${technology.concepts[0].topics[0].title.replaceAll(' ','-')}`);
    } else {
      alert("No concepts or topics available for this technology.");
    }
  };

  return (
    <div className={`technology-div ${window?.innerWidth > '1600' && "container"}`}>
      <div className="d-flex align-items-center bg-secondary mb-2" style={{overflowX:"auto"}}>
        <button className="btn p-2 d-flex d-lg-none align-items-center justify-content-center text-white" style={{ width: "40px", height: "40px" }} data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
          <i className="bi bi-list fs-4"></i>
        </button>

        {/* technologies header */}
        <div className="d-flex">
          {technologies?.map((el,index) => {
          return (
            <span key={el?._id} className={`tech-hover px-1 ${index !== technologies?.length-1 && "border-end border-white"}`} onClick={() => handlesubmit(el)}>
              <p className={`mb-0 px-3 ${el?.title === tName && "active mx-2"}`}>{el?.title}</p>
            </span>
          );
        })}
        </div>
      </div>

      {/* off canvas */}
      <div className="offcanvas offcanvas-start d-flex d-lg-none" style={{ width: "65%" }} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header d-flex justify-content-end">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body" data-bs-dismiss="offcanvas" aria-label="Close">
          <SideBar technology={technology} tName={tName} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-0 d-flex">
        {/* Sidebar */}
        <div className="d-none d-lg-flex" style={{ width: "20%", maxHeight: "100%" }}>
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <SideBar technology={technology} tName={tName} />
              </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="px-0 techDetails flex-fill" style={window.innerWidth <= 768 ? { width: "100%" } : { width: "80%" }}>
          <div className="card border-0 m-0 shadow-sm">
            <div className="card-body pt-0">
              {technologies && <Outlet /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetails;