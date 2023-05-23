import { Textbox, Select } from "react-inputs-validation";
import React, { useState, useEffect } from 'react';
import validator from "./validator";

export const NumberBoxComponent = (props) => {

    let name = props.element.name;
    // let value = this.state[`${name}`];
    //element
    let value = (props.element.value) ? props.element.value : "";
    let label = (props.element.label) ? props.element.label : name;
    //des only item
    let items = (props.items) ? props.items : [];
    let des = props.element.des;
    if (des) { des = "(" + props.element.des + ")" }
    else {
        var itemsFilter = items.filter(obj => { return obj.name == name });
        if (itemsFilter.length > 0) {
            des = "(" + itemsFilter[0].des + ")";
        } else { des = "" }
    };
    //end des only item


    let readOnly = (props.element.readOnly) ? true : false;
    //validtion
    let required = (props.element.required) ? true : false;
    let validate = (props.element.validate) ? true : false;
    let check = (props.element.check) ? true : false;
    //style
    let colClass = (props.colClass) ? props.colClass : 'col-sm';
    let bgColor = (props.bgColor) ? props.bgColor : '#DFFBE8';
    let isItemSet = (props.isItemSet) ? props.isItemSet : false;
    let isBgSet = (props.isBgSet) ? props.isBgSet : false;
    // let onBlur = (props.onBlur) ? props.onBlur : {};

    return (
        <div className={colClass} style={
            (isBgSet && bgColor) ? {
                backgroundColor: bgColor
            } :
                (isItemSet && bgColor) ? { backgroundColor: bgColor, paddingRight: "8px", paddingLeft: "8px" } :
                    {}
        }>
            <div className="form-group">
                <h5 className="card-title fs-14">{label} <span className="fs-12">{des}</span>{required ? <span className="text-danger">*</span> : ""}</h5>
                <Textbox
                    attributesInput={{ name: name, type: 'number', placeholder: 0, className: 'form-control input-rounded' }}
                    onChange={(newValue) => { props.onChange(newValue) }}
                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onBlur={e => { }}
                    disabled={readOnly}
                    validate={validate}
                    value={value}
                    validationOption={{ name: name, check: check, required: required }}
                    validationCallback={res => { props.validationCallback(res) }}
                />
            </div>
        </div>
    );
}



export const TextBoxComponent = (props) => {
    let name = props.element.name;
    // let value = this.state[`${name}`];
    let value = (props.element.value) ? props.element.value : "";
    let label = (props.element.label) ? props.element.label : name;

    //validtion
    let required = (props.element.required) ? true : false;
    let validate = (props.element.validate) ? true : false;
    let check = (props.element.check) ? true : false;
    //style
    let colClass = (props.colClass) ? props.colClass : 'col-sm';
    let bgColor = (props.bgColor) ? props.bgColor : '#FFD1F7';
    let isItemSet = (props.isItemSet) ? props.isItemSet : false;
    let isBgSet = (props.isBgSet) ? props.isBgSet : false;
    return (
        <div className={colClass} style={
            (isBgSet && bgColor) ? {
                backgroundColor: bgColor
            } :
                (isItemSet && bgColor) ? { backgroundColor: bgColor, paddingRight: "8px", paddingLeft: "8px" } :
                    {}
        }>
            <div className="form-group">
                <h5 className="card-title fs-14">{label} {required ? <span className="text-danger">*</span> : ""}</h5>
                <Textbox
                    attributesInput={{ name: name, type: 'text', placeholder: name, className: 'form-control input-rounded' }}
                    onChange={(newValue) => { props.onChange(newValue) }}
                    onBlur={e => { }}
                    validate={validate}
                    value={value}
                    validationOption={{ name: name, check: check, required: required }}
                    validationCallback={res => { props.validationCallback(res) }}
                />
            </div>
        </div>
    );
}


export const SelectBoxComponent = (props) => {
    let element = props.element;
    let name = element.name;
    let id = element.id;
    // let value = this.state[`${name}`];
    let value = (props.element.value) ? props.element.value : "";
    let label = (element.label) ? element.label : name;

    //validtion
    let required = (props.element.required) ? true : false;
    let validate = (props.element.validate) ? true : false;
    let check = (props.element.check) ? true : false;
    //style
    let colClass = (props.colClass) ? props.colClass : 'col-sm';
    let bgColor = (props.bgColor) ? props.bgColor : '#FDFD72';
    let isItemSet = (props.isItemSet) ? props.isItemSet : false;
    let isBgSet = (props.isBgSet) ? props.isBgSet : false;
    let optionList = (props.optionList) ? props.optionList : [];
    return (
        <div className={colClass} style={
            (isBgSet && bgColor) ? {
                backgroundColor: bgColor
            } :
                (isItemSet && bgColor) ? { backgroundColor: bgColor, paddingRight: "8px", paddingLeft: "8px" } :
                    {}
        }>
            {/* <div className="form-group"> */}
            <h5 className="card-title fs-14">{label} {required ? <span className="text-danger">*</span> : ""}</h5>
            <Select
                attributesInput={{ id: id, name: name }}
                // classNameWrapper=
                classNameSelect='dropdown bootstrap-select form-control form-control-lg input-sm'
                // classNameSelect='form-control'
                showSearch={true}
                value={value}
                validate={validate}
                optionList={optionList}
                onChange={(newValue) => { props.onChange(newValue) }}
                onBlur={e => { }}
                customStyleOptionListContainer={{ maxHeight: 'auto', overflow: 'auto', fontSize: '12px' }}
                validationOption={{ name: name, check: check, required: required }}
                validationCallback={res => { props.validationCallback(res) }}
            />
            {/* </div> */}
        </div>
    );
}

export const ItemComponent = React.forwardRef((props, ref) => {

    let required = true;
    let check = true;
    const [itemsArray, setHandleChangeItem] = useState(props.products);
    const [items, setSelectChangeItem] = useState(props.items);
    const [suppliers, setSelectChangeSupplier] = useState(props.suppliers);
    const [deletedIds, setSelectChangeDeletedIds] = useState(props.deletedIds);

    useEffect(() => { setSelectChangeItem(props.items) }, [props.items]);
    useEffect(() => { setSelectChangeSupplier(props.suppliers) }, [props.suppliers]);
    useEffect(() => { setHandleChangeItem(props.products) }, [props.products]);
    useEffect(() => { setSelectChangeDeletedIds(props.deletedIds) }, [props.deletedIds]);

    function addItemComponent(e) {
        let keyIndex = e.target.id;
        let curArray = { ...itemsArray[keyIndex] };
        if (!curArray.hasItemIdError && !curArray.hasItemValueError && !curArray.hasDCNOError && !curArray.hasSupplierIdError && !curArray.hasBagsError) {
            setHandleChangeItem((itemsArray) => [...itemsArray,
            {
                id: "", item_id: "", item_name: "", item_value: "", supplier_id: "", dcno: "", bags: "",
                hasItemIdError: true, hasItemValueError: true, hasSupplierIdError: true, hasDCNOError: true, hasBagsError: true, validate: false
            }]);
        } else {
            curArray.validate = true;
            itemsArray[keyIndex] = curArray;
            setHandleChangeItem(() => [...itemsArray]);
        }
    }

    function deleteItemComponent(e) {
        let splt = e.target.id.split('-');
        let keyIndex = splt[0];
        let item_id = splt[1] != "" ? splt[1] : null;
        deletedIds.push(parseInt(item_id));
        if (keyIndex > -1) { itemsArray.splice(keyIndex, 1); }
        setHandleChangeItem(() => [...itemsArray]);
        setSelectChangeDeletedIds(() => [...deletedIds]);
        ref.current = itemsArray;
        ref.current.deletedIds = deletedIds;
    }


    function handleChangeItem(option, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.item_id = option.id;
        curArray.item_name = option.name;
        curArray.hasItemIdError = (validator.empty(option.id)) ? true : false;
        curArray.validate = (validator.empty(option.id)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        //console.log(itemsArray);
        ref.current = itemsArray;
    }

    function handleChangeItemValue(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.item_value = newValue;
        curArray.hasItemValueError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeSupplier(option, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.supplier_id = option.id;
        curArray.hasSupplierIdError = (validator.empty(option.id)) ? true : false;
        curArray.validate = (validator.empty(option.id)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeDcno(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasDCNOError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.dcno = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeBags(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasBagsError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.bags = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    // function validationErrorhandleChange(newValue, keyIndex, hasErrorName) {
    //     let curArray = { ...itemsArray[keyIndex] };
    //     curArray[`${hasErrorName}`] = newValue;
    //     curArray.validate = false;
    //     itemsArray[keyIndex] = curArray;
    //     setHandleChangeItem(() => [...itemsArray]);
    // }



    const CustomItemSelect = (props) => {
        let item_id = props.item_id;
        let validate = props.validate;
        let items = props.items;
        let key = parseInt(props.keyIndex);
        return (
            <SelectBoxComponent element={{ id: 'item_id' + item_id, name: 'item_id', label: 'Item ID', value: item_id, validate, required, check }}
                onChange={(newValue) => { handleChangeItem(newValue, key) }}
                colClass="col-xl-2 col-lg-2"
                optionList={items} isBgSet={false}
                // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasItemIdError") }} 
                validationCallback={() => { }}
            />
        )
    }

    const CustomSupplierSelect = (props) => {
        let item_id = props.item_id;
        let supplier_id = props.supplier_id;
        let suppliers = props.suppliers;
        let validate = props.validate;
        let key = parseInt(props.keyIndex);
        return (
            <SelectBoxComponent element={{ id: 'supplier_id' + item_id, name: 'supplier_id', label: 'Supplier ID / Land & Factory', value: supplier_id, validate, required, check }}
                onChange={(newValue) => { handleChangeSupplier(newValue, key) }}
                colClass="col-xl-2 col-lg-2"
                optionList={suppliers} isBgSet={false}
                // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasSupplierIdError") }} 
                validationCallback={() => { }}
            />
        )
    }



    return (
        itemsArray.map((element, key) => {
            let id = element.id;
            let item_id = element.item_id;
            let item_name = element.item_name;
            let item_value = element.item_value;
            let dcno = element.dcno;
            let bags = element.bags;
            let supplier_id = element.supplier_id;
            let validate = element.validate;

            return (
                <fieldset key={key} className="fieldSet">
                    <legend runat="server" visible="true" className="fieldsetLegend">Item {key + 1}:</legend>
                    <div className='row'>
                        <CustomSupplierSelect suppliers={suppliers} item_id={item_id} supplier_id={supplier_id} validate={validate} keyIndex={key}></CustomSupplierSelect>

                        <NumberBoxComponent element={{ name: "dcno", value: dcno, validate, required, check }}
                            items={items}
                            onChange={(newValue) => { handleChangeDcno(newValue, key) }} colClass="col-xl-2 col-lg-2" isBgSet={false}
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasDCNOError") }}
                            validationCallback={() => { }}
                        />
                        <CustomItemSelect items={items} item_id={item_id} item_name={item_name} validate={validate} keyIndex={key}></CustomItemSelect>

                        <NumberBoxComponent element={{ name: item_name, value: item_value, validate, required, check }}
                            items={items}
                            onChange={(newValue) => { handleChangeItemValue(newValue, key) }}
                            isItemSet={true} colClass="col-xl-2 col-lg-2"
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasItemValueError") }} 
                            validationCallback={() => { }}
                        />




                        <NumberBoxComponent element={{ name: "bags", value: bags, validate, required, check }}
                            onChange={(newValue) => { handleChangeBags(newValue, key) }} colClass="col-xl-1 col-lg-1"
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasBagsError") }} 
                            validationCallback={() => { }}
                        />

                        <div className="col-sm" style={{ justifyContent: "flex-end" }}>
                            <div className="form-group" style={{ paddingTop: "32px" }}>
                                <div style={{ display: "inline" }}>
                                    < button id={key} onClick={(e) => addItemComponent(e)} type="button" className="btn btn-secondary">Add Item</button >
                                    {/* < button onClick={addItemComponent} type="button" className="btn btn-secondary">Add Item</button > */}
                                    {key != 0 ?
                                        < button id={key + "-" + id} onClick={(e) => deleteItemComponent(e)} style={{ marginLeft: "10px" }} type="button" className="btn btn-danger">Delete</button >
                                        : ""}
                                </div>
                            </div>
                            {element.validate ? <span className="react-inputs-validation__error">Please enter * fileds</span> : ""}
                        </div>
                    </div >
                </fieldset >
            );
        })

    );

})


export const OutwardItemComponent = React.forwardRef((props, ref) => {
    let required = true;
    let check = true;
    const [itemsArray, setHandleChangeItem] = useState(props.products);
    const [items, setSelectChangeItem] = useState(props.items);
    const [deletedIds, setSelectChangeDeletedIds] = useState(props.deletedIds);

    useEffect(() => { setSelectChangeItem(props.items) }, [props.items]);
    useEffect(() => { setHandleChangeItem(props.products) }, [props.products]);
    useEffect(() => { setSelectChangeDeletedIds(props.deletedIds) }, [props.deletedIds]);

    function addItemComponent(e) {
        let keyIndex = e.target.id;
        let curArray = { ...itemsArray[keyIndex] };
        if (!curArray.hasGBSizeError && !curArray.hasQualityError && !curArray.hasPlantHoleError &&
            !curArray.hasPCSPalletError && !curArray.hasPalletError && !curArray.hasTotalPCSError && !curArray.hasNWTError) {
            setHandleChangeItem((itemsArray) => [...itemsArray,
            {
                id: "",
                items: [],
                gb_size: "", mixture: "", quality: "", plant_hole: "", pcs_pallet: 0, pallet: 0, total_pcs: 0, nwt: 0, remarks: "",
                hasGBSizeError: true, hasQualityError: true, hasPlantHoleError: true,
                hasPCSPalletError: true, hasPalletError: true, hasTotalPCSError: true, hasNWTError: true,
                hasItemIDError: true,
                validate: false
            }]);
        } else {
            curArray.validate = true;
            itemsArray[keyIndex] = curArray;
            setHandleChangeItem(() => [...itemsArray]);
        }
    }

    function deleteItemComponent(e) {
        let splt = e.target.id.split('-');
        let keyIndex = splt[0];
        let item_id = splt[1] != "" ? splt[1] : null;
        //console.log(item_id);
        //console.log(deletedIds);
        deletedIds.push(parseInt(item_id));
        if (keyIndex > -1) { itemsArray.splice(keyIndex, 1); }
        setHandleChangeItem(() => [...itemsArray]);
        setSelectChangeDeletedIds(() => [...deletedIds]);
        //console.log(deletedIds);
        ref.current = itemsArray;
        ref.current.deletedIds = deletedIds;
    }



    function handleChangeInputValue(item_value, keyIndex, item_id) {
        //console.log(item_value + " " + keyIndex + " " + item_id);
        let curArray = { ...itemsArray[keyIndex] };
        let itemValueCheck = (validator.empty(item_value)) ? true : false;
        if (!itemValueCheck) {
            curArray.items[item_id] = item_value
            curArray.hasItemIDError = false;
            curArray.validate = false;
            itemsArray[keyIndex] = curArray;
            setHandleChangeItem(() => [...itemsArray]);
            ref.current = itemsArray;
        }
    }


    function handleChangeGBSize(newValue, keyIndex) {
        //console.log(itemsArray);
        let curArray = { ...itemsArray[keyIndex] };
        //console.log(curArray);
        //console.log(newValue);
        curArray.hasGBSizeError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.gb_size = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeMixture(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.mixture = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeQuality(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasQualityError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.quality = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangePlantHole(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasPlantHoleError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.plant_hole = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangePCSPallet(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasPCSPalletError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.pcs_pallet = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangePallet(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasPalletError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.pallet = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }


    function handleChangeTotalPCS(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasTotalPCSError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.total_pcs = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeNWT(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasNWTError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.nwt = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeRemarks(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.remarks = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    return (
        itemsArray.map((element, key) => {
            let id = element.id;
            let gb_size = element.gb_size;
            let mixture = element.mixture;
            let quality = element.quality;
            let plant_hole = element.plant_hole;
            let pcs_pallet = element.pcs_pallet;
            let pallet = element.pallet;
            let total_pcs = element.total_pcs;
            let nwt = element.nwt;
            let remarks = element.remarks;
            let validate = element.validate;

            return (
                <fieldset key={key} className="fieldSet">
                    <legend runat="server" visible="true" className="fieldsetLegend">Item {key + 1}:</legend>
                    <div className='row'>

                        {items.map((element1, i) => {
                            let value = (i in element.items) ? element.items[i] : "";
                            return (
                                (i != 0) ?
                                    < NumberBoxComponent key={i} element={{
                                        name: element1.name, des: element1.des, value: value, validate
                                    }}
                                        items={items}
                                        onChange={(newValue) => { handleChangeInputValue(newValue, key, i) }}
                                        isBgSet={true} colClass="col-sm" bgColor="#D8DAFC"
                                        validationCallback={() => { }} />
                                    : "")

                        })}
                    </div>
                    <div className='row'>

                        <TextBoxComponent element={{ name: "gb_size", label: "GB Size", value: gb_size, validate, required, check }}
                            onChange={(newValue) => { handleChangeGBSize(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />


                        <TextBoxComponent element={{ name: "mixture", label: "Mixture", value: mixture, validate }}
                            onChange={(newValue) => { handleChangeMixture(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />


                        <TextBoxComponent element={{ name: "quality", label: "Quality", value: quality, validate, required, check }}
                            onChange={(newValue) => { handleChangeQuality(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />

                        <TextBoxComponent element={{ name: "plant_hole", label: "Plant Hole", value: plant_hole, validate, required, check }}
                            onChange={(newValue) => { handleChangePlantHole(newValue, key) }}
                            colClass="col-xl-3 col-lg-3" isBgSet={false}
                            validationCallback={() => { }} />


                        <NumberBoxComponent element={{ name: "pcs_pallet", label: "PCS Pallet", value: pcs_pallet, validate, required, check }}
                            onChange={(newValue) => { handleChangePCSPallet(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />

                        <NumberBoxComponent element={{ name: "pallet", label: "Pallet", value: pallet, validate, required, check }}
                            onChange={(newValue) => { handleChangePallet(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />

                        <NumberBoxComponent element={{ name: "total_pcs", label: "Total PCS", value: total_pcs, validate, required, check }}
                            onChange={(newValue) => { handleChangeTotalPCS(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />

                        <NumberBoxComponent element={{ name: "nwt", label: "Nwt", value: nwt, validate, required, check }}
                            onChange={(newValue) => { handleChangeNWT(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />

                        <TextBoxComponent element={{ name: "remarks", value: remarks, validate }}
                            onChange={(newValue) => { handleChangeRemarks(newValue, key) }}
                            colClass="col-xl-2 col-lg-2" isBgSet={false}
                            validationCallback={() => { }} />



                        <div className="col-sm" style={{ justifyContent: "flex-end" }}>
                            <div className="form-group" style={{ paddingTop: "32px" }}>
                                <div style={{ display: "inline" }}>
                                    < button id={key} onClick={(e) => addItemComponent(e)} type="button" className="btn btn-secondary">Add Item</button >
                                    {/* < button onClick={addItemComponent} type="button" className="btn btn-secondary">Add Item</button > */}
                                    {key != 0 ?
                                        < button id={key + "-" + id} onClick={(e) => deleteItemComponent(e)} style={{ marginLeft: "10px" }} type="button" className="btn btn-danger">Delete</button >
                                        : ""}
                                </div>
                            </div>
                            {element.validate ? <span className="react-inputs-validation__error">Please enter * fileds</span> : ""}
                        </div>
                    </div >
                </fieldset >
            );
        })

    );

})


export const InterComponent = React.forwardRef((props, ref) => {

    let required = true;
    let check = true;
    const [itemsArray, setHandleChangeItem] = useState(props.products);
    const [items, setSelectChangeItem] = useState(props.items);
    const [suppliers, setSelectChangeSupplier] = useState(props.suppliers);
    const [deletedIds, setSelectChangeDeletedIds] = useState(props.deletedIds);

    useEffect(() => { setSelectChangeItem(props.items) }, [props.items]);
    useEffect(() => { setSelectChangeSupplier(props.suppliers) }, [props.suppliers]);
    useEffect(() => { setHandleChangeItem(props.products) }, [props.products]);
    useEffect(() => { setSelectChangeDeletedIds(props.deletedIds) }, [props.deletedIds]);

    function addInterComponent(e) {
        let keyIndex = e.target.id;
        let curArray = { ...itemsArray[keyIndex] };
        if (!curArray.hasItemIdError && !curArray.hasItemValueError && !curArray.hasDCNOError && !curArray.hasBagsError && !curArray.hasAVGWeightError) {
            setHandleChangeItem((itemsArray) => [...itemsArray,
            {
                id: "", item_id: "", item_name: "", item_value: "", supplier_id: "", dcno: "", bags: "", avg_weight: "",
                hasItemIdError: true, hasItemValueError: true, hasSupplierIdError: true, hasDCNOError: true, hasBagsError: true, hasAVGWeightError: true, validate: false
            }]);
        } else {
            curArray.validate = true;
            itemsArray[keyIndex] = curArray;
            setHandleChangeItem(() => [...itemsArray]);
        }
    }

    function deleteInterComponent(e) {
        let splt = e.target.id.split('-');
        let keyIndex = splt[0];
        let item_id = splt[1] != "" ? splt[1] : null;
        //console.log(item_id);
        //console.log(deletedIds);
        deletedIds.push(parseInt(item_id));
        if (keyIndex > -1) { itemsArray.splice(keyIndex, 1); }
        setHandleChangeItem(() => [...itemsArray]);
        setSelectChangeDeletedIds(() => [...deletedIds]);
        //console.log(deletedIds);
        ref.current = itemsArray;
        ref.current.deletedIds = deletedIds;
    }


    function handleChangeItem(option, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.item_id = option.id;
        curArray.item_name = option.name;
        curArray.hasItemIdError = (validator.empty(option.id)) ? true : false;
        curArray.validate = (validator.empty(option.id)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        //console.log(itemsArray);
        ref.current = itemsArray;
    }

    function handleChangeItemValue(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.item_value = newValue;
        curArray.hasItemValueError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeSupplier(option, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.supplier_id = option.id;
        curArray.hasSupplierIdError = (validator.empty(option.id)) ? true : false;
        curArray.validate = (validator.empty(option.id)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeDcno(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasDCNOError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.dcno = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeBags(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.hasBagsError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        curArray.bags = newValue;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }

    function handleChangeAVGWeightValue(newValue, keyIndex) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray.avg_weight = newValue;
        curArray.hasAVGWeightError = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        ref.current = itemsArray;
    }



    const CustomItemSelect = (props) => {
        let item_id = props.item_id;
        let validate = props.validate;
        let items = props.items;
        let key = parseInt(props.keyIndex);
        return (
            <SelectBoxComponent element={{ id: 'item_id' + item_id, name: 'item_id', label: 'Item ID', value: item_id, validate, required, check }}
                onChange={(newValue) => { handleChangeItem(newValue, key) }}
                colClass="col-xl-2 col-lg-2"
                optionList={items} isBgSet={false}
                // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasItemIdError") }} 
                validationCallback={() => { }}
            />
        )
    }

    const CustomSupplierSelect = (props) => {
        let item_id = props.item_id;
        let supplier_id = props.supplier_id;
        let suppliers = props.suppliers;
        let validate = props.validate;
        let key = parseInt(props.keyIndex);
        return (
            <SelectBoxComponent element={{ id: 'supplier_id' + item_id, name: 'supplier_id', label: 'Supplier ID', value: supplier_id, validate, required, check }}
                onChange={(newValue) => { handleChangeSupplier(newValue, key) }}
                colClass="col-xl-2 col-lg-2"
                optionList={suppliers} isBgSet={false}
                // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasSupplierIdError") }} 
                validationCallback={() => { }}
            />
        )
    }



    return (
        itemsArray.map((element, key) => {
            let id = element.id;
            let item_id = element.item_id;
            let item_name = element.item_name;
            let item_value = element.item_value;
            let dcno = element.dcno;
            let bags = element.bags;
            let avg_weight = element.avg_weight;
            let supplier_id = element.supplier_id;
            let validate = element.validate;

            return (
                <fieldset key={key} className="fieldSet">
                    <legend runat="server" visible="true" className="fieldsetLegend">Item {key + 1}:</legend>
                    <div className='row'>

                        <CustomItemSelect items={items} item_id={item_id} item_name={item_name} validate={validate} keyIndex={key}></CustomItemSelect>

                        <NumberBoxComponent element={{ name: item_name, value: item_value, validate, required, check }}
                            items={items}
                            onChange={(newValue) => { handleChangeItemValue(newValue, key) }}
                            isItemSet={true} colClass="col-xl-2 col-lg-2"
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasItemValueError") }} 
                            validationCallback={() => { }}
                        />

                        <NumberBoxComponent element={{ name: "dcno", value: dcno, validate, required, check }}
                            items={items}
                            onChange={(newValue) => { handleChangeDcno(newValue, key) }} colClass="col-xl-2 col-lg-2" isBgSet={false}
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasDCNOError") }}
                            validationCallback={() => { }}
                        />

                        {/* <CustomSupplierSelect suppliers={suppliers} item_id={item_id} supplier_id={supplier_id} validate={validate} keyIndex={key}></CustomSupplierSelect> */}

                        <NumberBoxComponent element={{ name: "bags", value: bags, validate, required, check }}
                            onChange={(newValue) => { handleChangeBags(newValue, key) }} colClass="col-xl-1 col-lg-1"
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasBagsError") }} 
                            validationCallback={() => { }}
                        />

                        <NumberBoxComponent element={{ name: "avg_weight", label: 'Avg Weight', value: avg_weight, validate, required, check }}
                            onChange={(newValue) => { handleChangeAVGWeightValue(newValue, key) }} colClass="col-xl-2 col-lg-2" isBgSet={false}
                            // validationCallback={(res) => { validationErrorhandleChange(res, key, "hasDCNOError") }}
                            validationCallback={() => { }}
                        />


                        <div className="col-sm" style={{ justifyContent: "flex-end" }}>
                            <div className="form-group" style={{ paddingTop: "32px" }}>
                                <div style={{ display: "inline" }}>
                                    < button id={key} onClick={(e) => addInterComponent(e)} type="button" className="btn btn-secondary">Add Item</button >
                                    {/* < button onClick={addInterComponent} type="button" className="btn btn-secondary">Add Item</button > */}
                                    {key != 0 ?
                                        < button id={key + "-" + id} onClick={(e) => deleteInterComponent(e)} style={{ marginLeft: "10px" }} type="button" className="btn btn-danger">Delete</button >
                                        : ""}
                                </div>
                            </div>
                            {element.validate ? <span className="react-inputs-validation__error">Please enter * fileds</span> : ""}
                        </div>
                    </div >
                </fieldset >
            );
        })

    );

})


