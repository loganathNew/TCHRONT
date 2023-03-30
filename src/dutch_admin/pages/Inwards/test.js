export const testData = {

    submitted: false,
    disabled: false,
    loader: false,
    status: 'success',

    //validation
    validate: false,
    //Parameter
    id: null,
    location_id: "1",
    week: "2",
    duration: "2",
    r_date: new Date(),
    in_time: new Date(),
    out_time: new Date(),
    inv_no: "inv123",
    inv_date: new Date(),

    lwt: "23346",
    ewt: "3452",
    nwt: "26798", //(lwt-ewt)
    ecu: "1.2",
    ecm: "2.5",
    ecl: "3.5",
    aec: "2.00", //(ecu+ecm+ecl)
    m1: "2.5",
    m2: "2.2",
    m3: "3.5",
    am: "2.33", //(m1+m2+m3)
    sand: "252",
    fibre: "3252",
    a_bagwt: "1252",
    freight: "8252",
    vehicle_no: "TNB85F662",
    transporter: "Transofter12",
    storage_location: "2",
    qc_name: "3",
    remarks: "TEST",

    //Error
    showRDateErrorMsg: false,
    showInvDateErrorMsg: false,
    showOutTimeErrorMsg: false,
    showInTimeErrorMsg: false,

    hasLocationError: false, hasWeekError: false,
    hasInvnoError: false,
    hasDurationError: false,
    hasRDateError: false,
    hasInvDateError: false,
    hasInTimeError: false,
    hasOutTimeError: false,
    hasQCNameError: false,
    hasStorageLocError: false,
    hasTransporterError: false,
    hasVehicleNoError: false,
    hasLWTError: true, hasEWTError: true, hasNWTError: true,
    hasECUError: false, hasECMError: false, hasECLError: false, hasAECError: false,
    hasM1Error: false, hasM2Error: false, hasM3Error: false, hasAMError: false,
    hasFreightError: false,
    hasABagwtError: false,
    products: [{
        "id": "",
        "item_id": "1",
        "item_name": "w_pith",
        "item_value": "2563",
        "supplier_id": "1",
        "dcno": "5669",
        "bags": "2563",
        "hasItemIdError": false,
        "hasItemValueError": false,
        "hasSupplierIdError": false,
        "hasDCNOError": false,
        "hasBagsError": false,
        "validate": false
    },
    {
        "id": "",
        "item_id": "2",
        "item_name": "un_pith",
        "item_value": "256",
        "supplier_id": "2",
        "dcno": "56",
        "bags": "251",
        "hasItemIdError": false,
        "hasItemValueError": false,
        "hasSupplierIdError": false,
        "hasDCNOError": false,
        "hasBagsError": false,
        "validate": false
    }]
}
