import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { validateDonationPurpose, validateDonationType } from '../utils/createPostValidation';
import { setErrorPurpose, setErrorTypeOfDonation, setIsErrorPurpose, setIsErrorTypeOfDonation } from '../Slices/CreatePostSlice';

function DropDownMenu({ placeHolder, items, setItems, value, setValue, error, isError, setOpen, open, dispatchError }) {
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'}
  // ]);
  // const [first, setFirst] = useState(false)
  // console.log(placeHolder+"  :",value+Date())
  // useEffect(() => {

  //   return () => {
  //     if (first&& open) {
  //       if (placeHolder == 'Select Need') {
  //         setTimeout(()=>{
  //           const { valid, error } = validateDonationType(value)
  //           console.log(value)
  //           console.log(valid,error)
  //           if (valid) {
  //             // dispatch(setErrorDescription(error))
  //             dispatchError(setIsErrorTypeOfDonation(false))
  //           }
  //           else{
  //             dispatchError(setErrorTypeOfDonation(error))
  //             dispatchError(setIsErrorTypeOfDonation(true))
  //           }
  //         },200)
          

  //       } else {
  //         console.log(value)
  //         const { valid, error } = validateDonationPurpose(value)
  //         console.log(valid,error)
  //         if (valid) {
  //           // dispatch(setErrorDescription(error))
  //           dispatchError(setIsErrorPurpose(false))
  //         }
  //         else {
  //           dispatchError(setErrorPurpose(error))
  //           dispatchError(setIsErrorPurpose(true))
  //         }
  //       }
  //     }
  //     setFirst(true)
  //   }
  // })

  return (
    <DropDownPicker
      style={{ zIndex: 0, padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: isError ? 'red' : '#03bafc', borderWidth: 2 }}
      open={open}
      value={value}
      dropDownDirection="BOTTOM"
      bottomOffset={10}
      textStyle={{ fontSize: responsiveHeight(3), color: 'gray' }}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      placeholder={placeHolder}
    // setItems={setItems}
    />
  );
}

export default React.memo(DropDownMenu);