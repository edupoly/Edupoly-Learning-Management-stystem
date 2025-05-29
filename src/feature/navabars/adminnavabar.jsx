import React from 'react'

export default function Adminnavabar() {
  return (
    <div>
       <div className="px-2 text-white" style={{background: "linear-gradient(135deg, rgb(30, 60, 114) 0%, rgb(42, 82, 152) 100%)"}}>
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg> */}
        </a>
         
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/" className="nav-link px-2 text-white fs-5"><img src="/fullstack-training-hyderabad.png" alt=""  className='logo '  style={{width:"150px",height:""}}    /></a></li>
          {/* <li><a href="/" className="nav-link px-2 text-white fs-5">Technology</a></li> */}
        </ul>

       
        {/* <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2" >Sign Up</button>
          <button type="button" className="btn btn-outline-light me-2" >Logout</button>
        </div> */}
      </div>
    </div>
  </div>
    </div>
  )
}
