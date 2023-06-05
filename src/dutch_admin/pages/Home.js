import Breadcrumbs from "../components/layouts/Breadcrumbs";
import HomeService from "../services/home.service";
import React, { useState, useEffect } from 'react';


const ItemsCollection = (props) => {
  let items = props.items;
  let itemHeads = props.itemHeads;
  let filter_location_id = (props.filter_location_id == "") ? "" : props.filter_location_id.id;
  // console.log(items);
  // console.log(filter_location_id);
  return (
    <div className="row">
      <div className="col-12">
        <div className="card" style={{ backgroundColor: "#FEFDFD" }}>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-responsive-md table-bordered">
                <thead className="thead-dark">
                  <tr>
                    {/* style={{ width: "50px" }} */}
                    <th style={{ backgroundColor: "#D3D3D3" }}><strong style={{ color: "black" }}>#</strong></th>
                    <th style={{ backgroundColor: "#D3D3D3" }}><strong style={{ color: "black" }}>Godowns</strong></th>
                    {Object.keys(itemHeads['itemNames']).map((value, i) => {
                      return (
                        <th key={itemHeads['itemNames'][value]} style={{ backgroundColor: "#D3D3D3" }}>
                          <strong style={{ color: "black" }}>{itemHeads['itemNames'][value]}</strong><br></br>
                          <p style={{ border: "2px solid white", borderRadius: "5px", color: "white", padding: "5px", marginTop: "1px", marginBottom: "4px" }}>
                            <strong style={{ fontSize: "14px", color: "green" }}>{itemHeads['itemTotals'][value]}</strong>
                          </p>
                          <p style={{ border: "2px solid white", borderRadius: "5px", color: "white", padding: "5px", marginBottom: "0px" }}>
                            <strong style={{ fontSize: "12px", color: "red" }}>{itemHeads['itemBags'][value]}</strong>
                          </p>
                        </th>
                      )
                    })}
                    {/* {Object.keys(itemHeads['itemTotals']).map((value, i) => {
                      return (
                        <th key={itemHeads['itemTotals'][value]}><strong className="red">{itemHeads['itemTotals'][value]}</strong></th>
                      )
                    })} */}
                  </tr>
                </thead>
                <tbody className="thead-light">
                  {Object.keys(items).map((element, i) => {
                    // console.log(items[element][1]['location_id']);
                    return (
                      (items[element][1]['location_id'] == filter_location_id || filter_location_id == "") ?

                        <tr key={i} style={{ color: "black" }}>
                          <td style={{ verticalAlign: "top" }}><strong>{i + 1}</strong></td>
                          <td style={{ verticalAlign: "top" }}>{items[element]['location_name']}</td>
                          {Object.keys(items[element]).map((value, i1) => {
                            if (value != 'location_name') {
                              return (
                                <td key={value}>
                                  {
                                    <span className="" style={{ fontSize: "18px", color: "green" }}>{
                                      items[element][value].balance}</span>
                                  }
                                  <br></br>
                                  <small style={{ fontSize: "6px" }}>
                                    {/* Inwards: <span style={{ fontSize: "12px" }}>{items[element][value].total_inward}</span><br></br>
                                  Outwards: <span style={{ fontSize: "12px" }}>{items[element][value].total_outward}</span><br></br> */}
                                    <span style={{ fontSize: "14px", color: "red" }}>{items[element][value].total_inbag}</span>
                                  </small>
                                </td>
                              )
                            }
                          })}
                          {/* <td><span className="badge light badge-success">Successful</span></td> */}
                        </tr>
                        : ""

                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>)

  // (i != "") ?
  //   <div key={i} className="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-6">
  //     <div className="widget-stat card">
  //       <div className="card-body p-4">
  //         <div className="media ai-icon">
  //           <span className="mr-3 bgl-primary text-primary">
  //             <svg width="36" height="28" viewBox="0 0 36 28" fill="none"
  //               xmlns="http://www.w3.org/2000/svg">
  //               <path
  //                 d="M31.75 6.75H30.0064L30.2189 4.62238C30.2709 4.10111 30.2131 3.57473 30.0493 3.07716C29.8854 2.57959 29.6192 2.12186 29.2676 1.73348C28.9161 1.3451 28.4871 1.03468 28.0082 0.822231C27.5294 0.609781 27.0114 0.500013 26.4875 0.5H7.0125C6.48854 0.500041 5.9704 0.609864 5.49148 0.822391C5.01256 1.03492 4.58348 1.34543 4.23189 1.73392C3.88031 2.12241 3.61403 2.58026 3.45021 3.07795C3.28639 3.57564 3.22866 4.10214 3.28075 4.6235L5.2815 24.6224C5.31508 24.9222 5.38467 25.2168 5.48875 25.5H1.75C1.41848 25.5 1.10054 25.6317 0.866116 25.8661C0.631696 26.1005 0.5 26.4185 0.5 26.75C0.5 27.0815 0.631696 27.3995 0.866116 27.6339C1.10054 27.8683 1.41848 28 1.75 28H31.75C32.0815 28 32.3995 27.8683 32.6339 27.6339C32.8683 27.3995 33 27.0815 33 26.75C33 26.4185 32.8683 26.1005 32.6339 25.8661C32.3995 25.6317 32.0815 25.5 31.75 25.5H28.0115C28.1154 25.2172 28.1849 24.9229 28.2185 24.6235L28.881 18H31.75C32.7442 17.9989 33.6974 17.6035 34.4004 16.9004C35.1035 16.1974 35.4989 15.2442 35.5 14.25V10.5C35.4989 9.50577 35.1035 8.55258 34.4004 7.84956C33.6974 7.14653 32.7442 6.75109 31.75 6.75ZM9.0125 25.5C8.70243 25.501 8.40314 25.3862 8.17327 25.1782C7.9434 24.9701 7.79949 24.6836 7.76975 24.375L5.7685 4.37575C5.75109 4.20188 5.7703 4.0263 5.82488 3.86031C5.87946 3.69432 5.96821 3.5416 6.0854 3.412C6.2026 3.28239 6.34564 3.17877 6.50532 3.10781C6.665 3.03685 6.83777 3.00013 7.0125 3H26.4875C26.6622 3.00012 26.8349 3.03681 26.9945 3.10772C27.1541 3.17863 27.2972 3.28218 27.4143 3.4117C27.5315 3.54123 27.6203 3.69386 27.6749 3.85977C27.7295 4.02568 27.7488 4.20119 27.7315 4.375L25.7308 24.3762C25.7007 24.6848 25.5566 24.971 25.3267 25.1788C25.0967 25.3867 24.7975 25.5012 24.4875 25.5H9.0125ZM33 14.25C32.9998 14.5815 32.868 14.8993 32.6337 15.1337C32.3993 15.368 32.0815 15.4998 31.75 15.5H29.1311L29.7561 9.25H31.75C32.0815 9.2502 32.3993 9.38196 32.6337 9.61634C32.868 9.85071 32.9998 10.1685 33 10.5V14.25Z"
  //                 fill="#2F4CDD" />
  //             </svg>

  //           </span>
  //           <div className="media-body">
  //             <h3 className="mb-0 text-black"><span className="counter ml-0">{elemnt.totalInwardNet - elemnt.totalOutwardNet}</span></h3>
  //             <p className="mb-0">Total Inward: {elemnt.totalInwardNet}</p>
  //             <p className="mb-0">Total Outward: {elemnt.totalOutwardNet}</p>
  //             <p className="mb-0">{elemnt.item_name}</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div> : ""
}


function Home() {

  const [itemsArray, setHandleChangeItem] = useState([]);
  const [location_id, setHandleChangeLocationId] = useState([]);
  const [itemHeads, setHandleChangeItemHead] = useState({ "itemNames": [], "itemTotals": [], "itemBags": [] });
  const [filter_location_id, setFilterLocationIdItem] = useState("");
  const [filter_item_id, setFilterItemIdItem] = useState("");
  const [filter_start_date, setFilterStartDateItem] = useState("");
  const [filter_end_date, setFilterEndDateItem] = useState("");
  getDatas();
  // useEffect(() => {setHandleChangeItem(itemsArray)}, [itemsArray]);

  function filterLocationChange(filter_location_id) {
    setFilterLocationIdItem(() => filter_location_id);
  }

  function filterItemChange(filter_item_id) {
    setFilterItemIdItem(() => filter_item_id);
  }

  function filterStartDateChange(filter_start_date) {
    setFilterStartDateItem(() => filter_start_date);
  }

  function filterEndDateChange(filter_end_date) {
    setFilterEndDateItem(() => filter_end_date);
  }

  function filterClick() {
    // setHandleChangeLocationId(() => filter_end_date));
  }

  function getDatas() {
    let params = filter_location_id + "&" + filter_item_id + "&" + filter_start_date + "&" + filter_end_date + "&";
    if (itemsArray.length == 0) {
      HomeService.getAll(params)
        .then(response => {
          let itemsArray = response.data.data;
          // console.log(itemsArray)
          if (response.data.type == "success") {
            setHandleChangeItem(() => itemsArray);
            let itemHeads = { "itemNames": [], "itemTotals": [], "itemBags": [] };
            Object.keys(itemsArray).map((element, i) => {
              Object.keys(itemsArray[element]).map((value, i1) => {
                if (!itemHeads['itemNames'].includes(itemsArray[element][value].item_name)) {
                  if (value != 'location_name') {
                    // let tmp_item_name = itemsArray[element][value].item_name+"-"+itemsArray[element][value].total_item_value;
                    let tmp_item_name = itemsArray[element][value].item_name;
                    let tmp_total_values = itemsArray[element][value].total_item_value;
                    let tmp_total_bags = itemsArray[element][value].tmp_total_bags;
                    itemHeads['itemNames'].push(tmp_item_name);
                    itemHeads['itemTotals'].push(tmp_total_values);
                    itemHeads['itemBags'].push(tmp_total_bags);
                    // itemsArray[itemsArray[element][value].location_name]
                  }
                }
              })
            })
            // console.log(itemHeads);
            setHandleChangeItemHead(() => itemHeads);
            return;
          } else {
            //  //console.log(response.data);
          }
        })
        .catch(e => {
          //   //console.log(e);

        });
    }
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <Breadcrumbs menu="Dashboard" action="list" filterLocationChange={(newValue) => { filterLocationChange(newValue) }}
          filterClick={() => { filterClick() }} />
        {/* <div className="col-sm ml-4">
          <div className="mr-auto d-none d-lg-block">
            <h2 className="text-black font-w600 mb-0">Dashboard</h2>
            <p className="mb-0">Welcome to Dutch Plantin Admin!</p>
          </div>
        </div> */}
        {/* <div className={isDashboard ? "col-sm-9" : "col-sm-9"}>
        <div className='row border border-success' >
          <SelectBoxComponent
              element={{ id: 'location_id', name: "location", value: location_id }}
              optionList={locations}
              colClass={isDashboard ? "col-sm-3" : "col-sm-2"}
              isBgSet={false}
              onChange={(newValue) => { this.filterLocationChange(newValue) }} />
        </div>
        </div> */}
        <ItemsCollection items={itemsArray} itemHeads={itemHeads} filter_location_id={filter_location_id} />

        {/* <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-0 pb-0 d-sm-flex d-block">
              <div>
                <h4 className="card-title mb-1">Orders Summary</h4>
                <small className="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
              </div>
              <div className="card-action card-tabs mt-3 mt-sm-0">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#user" role="tab">
                      Monthly
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#bounce" role="tab">
                      Weekly
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab">
                      Today
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body orders-summary">
              <div className="d-flex order-manage p-3 align-items-center mb-4">
                <a href="#/" className="btn fs-22 py-1 btn-success px-4 mr-3">25</a>
                <h4 className="mb-0">New Orders <i className="fa fa-circle text-success ml-1 fs-15"></i>
                </h4>
                <a href="#/" className="ml-auto text-primary font-w500">Manage orders
                  <i className="ti-angle-right ml-1"></i></a>
              </div>
              <div className="row">
                <div className="col-sm-4 mb-4">
                  <div className="border px-3 py-3 rounded-xl">
                    <h2 className="fs-32 font-w600 counter">25</h2>
                    <p className="fs-16 mb-0">On Delivery</p>
                  </div>
                </div>
                <div className="col-sm-4 mb-4">
                  <div className="border px-3 py-3 rounded-xl">
                    <h2 className="fs-32 font-w600 counter">60</h2>
                    <p className="fs-16 mb-0">Delivered</p>
                  </div>
                </div>
                <div className="col-sm-4 mb-4">
                  <div className="border px-3 py-3 rounded-xl">
                    <h2 className="fs-32 font-w600 counter">7</h2>
                    <p className="fs-16 mb-0">Canceled</p>
                  </div>
                </div>
              </div>
              <div className="widget-timeline-icon">
                <div className="row align-items-center mx-0">
                  <div
                    className="col-xl-3 col-lg-4 col-xxl-4 col-sm-4 px-0 my-2 text-center text-sm-left">
                    <span className="donut"
                      data-peity='{ "fill": ["rgb(62, 73, 84)", "rgba(255, 109, 76, 1)","rgba(43, 193, 85, 1)"]}'>2,5,3</span>
                  </div>
                  <div className="col-xl-9 col-lg-8 col-xxl-8 col-sm-8 px-0">
                    <div className="d-flex align-items-center mb-3">
                      <p className="mb-0 fs-14 mr-2 col-4 px-0">Immunities (24%)</p>
                      <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                        <div className="progress-bar bg-warning progress-animated"
                          style={{ width: "85%", height: "8px" }} role="progressbar">
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                      <span className="pull-right ml-auto col-1 px-0 text-right">25</span>
                    </div>
                    <div className="d-flex align-items-center  mb-3">
                      <p className="mb-0 fs-14 mr-2 col-4 px-0">Heart Beat (41%)</p>
                      <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                        <div className="progress-bar bg-success progress-animated"
                          style={{ width: "70%", height: "8px" }} role="progressbar">
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                      <span className="pull-right ml-auto col-1 px-0 text-right">60</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 fs-14 mr-2 col-4 px-0">Weigth (15%)</p>
                      <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                        <div className="progress-bar bg-dark progress-animated"
                          style={{ width: "30%", height: "8px" }} role="progressbar">
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                      <span className="pull-right ml-auto col-1 px-0 text-right">07</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-9 col-xxl-9 col-lg-8 col-md-12">
          <div id="user-activity" className="card">
            <div className="card-header border-0 pb-0 d-sm-flex d-block">
              <div>
                <h4 className="card-title mb-1">Customer Map</h4>
                <small className="mb-0">Lorem Ipsum is simply dummy text of the printing</small>
              </div>
              <div className="card-action card-tabs mt-3 mt-sm-0">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#user" role="tab">
                      Monthly
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#bounce" role="tab">
                      Weekly
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab">
                      Today
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="user" role="tabpanel">
                  <canvas id="activity" className="chartjs"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-4 col-md-12">
          <div className="card bg-secondary"
            style={{ backgroundImage: "url(images/bg-icon.png)", backgroundRepeat: "no-repeat", backgroundPosition: "top right" }}>
            <div className="card-body p-5 mt-3">
              <svg width="44" height="44" viewBox="0 0 44 44" className="mb-3" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.9531 20.625H5.67188C2.54435 20.625 0 18.0806 0 14.9531V5.67188C0 2.54435 2.54435 0 5.67188 0H14.9531C18.0806 0 20.625 2.54435 20.625 5.67188V14.9531C20.625 18.0806 18.0806 20.625 14.9531 20.625ZM5.67188 2.75C4.06072 2.75 2.75 4.06072 2.75 5.67188V14.9531C2.75 16.5643 4.06072 17.875 5.67188 17.875H14.9531C16.5643 17.875 17.875 16.5643 17.875 14.9531V5.67188C17.875 4.06072 16.5643 2.75 14.9531 2.75H5.67188Z"
                  fill="#fff" />
                <path
                  d="M38.3281 20.625H29.0469C25.9194 20.625 23.375 18.0806 23.375 14.9531V5.67188C23.375 2.54435 25.9194 0 29.0469 0H38.3281C41.4556 0 44 2.54435 44 5.67188V14.9531C44 18.0806 41.4556 20.625 38.3281 20.625ZM29.0469 2.75C27.4357 2.75 26.125 4.06072 26.125 5.67188V14.9531C26.125 16.5643 27.4357 17.875 29.0469 17.875H38.3281C39.9393 17.875 41.25 16.5643 41.25 14.9531V5.67188C41.25 4.06072 39.9393 2.75 38.3281 2.75H29.0469Z"
                  fill="#fff" />
                <path
                  d="M33.6875 44C28.0012 44 23.375 39.3738 23.375 33.6875C23.375 28.0012 28.0012 23.375 33.6875 23.375C39.3738 23.375 44 28.0012 44 33.6875C44 39.3738 39.3738 44 33.6875 44ZM33.6875 26.125C29.5176 26.125 26.125 29.5176 26.125 33.6875C26.125 37.8574 29.5176 41.25 33.6875 41.25C37.8574 41.25 41.25 37.8574 41.25 33.6875C41.25 29.5176 37.8574 26.125 33.6875 26.125Z"
                  fill="#fff" />
                <path
                  d="M14.9531 44H5.67188C2.54435 44 0 41.4556 0 38.3281V29.0469C0 25.9194 2.54435 23.375 5.67188 23.375H14.9531C18.0806 23.375 20.625 25.9194 20.625 29.0469V38.3281C20.625 41.4556 18.0806 44 14.9531 44ZM5.67188 26.125C4.06072 26.125 2.75 27.4357 2.75 29.0469V38.3281C2.75 39.9393 4.06072 41.25 5.67188 41.25H14.9531C16.5643 41.25 17.875 39.9393 17.875 38.3281V29.0469C17.875 27.4357 16.5643 26.125 14.9531 26.125H5.67188Z"
                  fill="#fff" />
              </svg>

              <h4 className="text-white mb-3">Manage <br />dashboard layout</h4>
              <a href="#/"
                className="d-flex text-light align-items-center justify-content-between">
                <small>Lorem ipsum dolor sit amet, consectetur</small>
                <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
}

export default Home;
