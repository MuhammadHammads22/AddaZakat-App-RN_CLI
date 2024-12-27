import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    post:
    {
        seekerVideoUri:"",
        errorSeekerVideoUri:"",
        isErrorSeekerVideoUri:false,
        seekerResidenceVideoUri:"",
        errorSeekerResidenceVideoUri:"",
        isErrorSeekerResidenceVideoUri:false,
        electricBillUri:"",
        errorElectricBillUri:"",
        isErrorElectricBillUri:false,
        seekerVideoUrl:"",
        errorSeekerVideoUrl:"",
        isErrorSeekerVideoUrl:false,
        seekerResidenceVideoUrl:"",
        errorSeekerResidenceVideoUrl:"",
        isErrorSeekerResidenceVideoUrl:false,
        electricBillUrl:"",
        errorElectricBillUrl:"",
        isErrorElectricBillUrl:false,
        description: "",
        errorDescription:"",
        isErrorDescription:false,
        seeker: "",
        errorSeeker:"",
        isErrorSeeker:false,
        phoneNumber: "",
        errorPhoneNumber:"",
        isErrorPhoneNumber:"",
        address: "",
        isErrorAddress:false,
        errorAddress:"",
        bankName: "",
        errorBankName:"",
        isErrorBankName:false,
        accountTitle: "",
        errorAccountTitle:"",
        isErrorAccountTitle:false,
        accountNumber: "",
        errorAccountNumber:"",
        isErrorAccountNumber:false,
        amountNeeded: 0,
        errorAmountNeeded:"",
        isErrorAmountNeeded:false,
        typeOfDonation: "",
        errorTypeOfDonation:"",
        isErrorTypeOfDonation:false,
        purpose:"",
        errorPurpose:"",
        isErrorPurpose:"",
        creator: "",
    }
}
const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {
        setSeekerVideoUri(state,action){
            state.post.seekerVideoUri = action.payload;
        },
        setErrorSeekerVideoUri(state, action) {
            state.post.errorSeekerVideoUri = action.payload;
        },
        setIsErrorSeekerVideoUri(state, action) {
            state.post.isErrorSeekerVideoUri = action.payload;
        },
        setElectricBillUri(state,action){
            state.post.electricBillUri = action.payload;
        },
        setErrorElectricBillUri(state, action) {
            state.post.errorElectricBillUri = action.payload;
        },
        setIsErrorElectricBillUri(state, action) {
            state.post.isErrorElectricBillUri = action.payload;
        },
        setElectricBillUrl(state,action){
            state.post.electricBillUri = action.payload;
        },
        setErrorElectricBillUrl(state, action) {
            state.post.errorElectricBillUri = action.payload;
        },
        setIsErrorElectricBillUrl(state, action) {
            state.post.isErrorElectricBillUri = action.payload;
        },
        setSeekerResidenceVideoUri(state, action) {
            state.post.seekerResidenceVideoUri = action.payload;
        },
        setErrorSeekerResidenceVideoUri(state, action) {
            state.post.errorSeekerResidenceVideoUri = action.payload;
        },
        setIsErrorSeekerResidenceVideoUri(state, action) {
            state.post.isErrorSeekerResidenceVideoUri = action.payload;
        },
        setSeekerVideoUrl(state,action){
            state.post.seekerVideoUrl = action.payload;
        },
        setErrorSeekerVideoUrl(state, action) {
            state.post.errorSeekerVideoUrl = action.payload;
        },
        setIsErrorSeekerVideoUrl(state, action) {
            state.post.isErrorSeekerVideoUrl = action.payload;
        },
        setSeekerResidenceVideoUrl(state, action) {
            state.post.seekerResidenceVideoUrl = action.payload;
        },
        setErrorSeekerResidenceVideoUrl(state, action) {
            state.post.errorSeekerResidenceVideoUrl = action.payload;
        },
        setIsErrorSeekerResidenceVideoUrl(state, action) {
            state.post.isErrorSeekerResidenceVideoUrl = action.payload;
        },
        setDescription(state, action) {
            state.post.description = action.payload;
        },
        setErrorDescription(state, action) {
            state.post.errorDescription = action.payload;
        },
        setIsErrorDescription(state, action) {
            state.post.isErrorDescription = action.payload;
        },
        setSeeker(state, action) {
            state.post.seeker = action.payload
        },
        setErrorSeeker(state, action) {
            state.post.errorSeeker = action.payload
        },
        setIsErrorSeeker(state, action) {
            state.post.isErrorSeeker = action.payload
        },
        setPhoneNumber(state, action) {
            state.post.phoneNumber = action.payload
        },
        setErrorPhoneNumber(state, action) {
            state.post.errorPhoneNumber = action.payload
        },
        setIsErrorPhoneNumber(state, action) {
            state.post.isErrorPhoneNumber = action.payload
        },
        setAddress(state, action) {
            state.post.address = action.payload
        },
        setErrorAddress(state, action) {
            state.post.errorAddress = action.payload
        },
        setIsErrorAddress(state, action) {
            state.post.isErrorAddress = action.payload
        },
        setBankName(state, action) {
            state.post.bankName = action.payload;
        },
        setErrorBankName(state, action) {
            state.post.errorBankName = action.payload;
        },
        setIsErrorBankName(state, action) {
            state.post.isErrorBankName = action.payload;
        },
        setAccountTitle(state, action) {
            state.post.accountTitle = action.payload;
        },
        setErrorAccountTitle(state, action) {
            state.post.errorAccountTitle = action.payload;
        },
        setIsErrorAccountTitle(state, action) {
            state.post.isErrorAccountTitle = action.payload;
        },
        setAccountNumber(state, action) {
            state.post.accountNumber = action.payload;
        },
        setErrorAccountNumber(state, action) {
            state.post.errorAccountNumber = action.payload;
        },
        setIsErrorAccountNumber(state, action) {
            state.post.isErrorAccountNumber = action.payload;
        },
        setAmountNeeded(state, action) {
            state.post.amountNeeded = action.payload;
        },
        setErrorAmountNeeded(state, action) {
            state.post.errorAmountNeeded = action.payload;
        }, 
        setIsErrorAmountNeeded(state, action) {
            state.post.isErrorAmountNeeded = action.payload;
        },      
        setPurpose(state, action) {
            state.post.purpose = action.payload;
        },
        setErrorPurpose(state, action) {
            state.post.errorPurpose = action.payload;
        }, 
        setIsErrorPurpose(state, action) {
            state.post.isErrorPurpose = action.payload;
        },        
        setTypeOfDonation(state, action) {
            state.post.typeOfDonation = action.payload;
        },
        setErrorTypeOfDonation(state, action) {
            state.post.errorTypeOfDonation = action.payload;
        },
        setIsErrorTypeOfDonation(state, action) {
            state.post.isErrorTypeOfDonation = action.payload;
        },
        setCreator(state, action) {
            state.post.creator = action.payload;
        },
        setToInitial(state,action){
            state.post={
                seekerVideoUri:"",
                errorSeekerVideoUri:"",
                isErrorSeekerVideoUri:false,
                seekerResidenceVideoUri:"",
                errorSeekerResidenceVideoUri:"",
                isErrorSeekerResidenceVideoUri:false,
                electricBillUri:"",
                errorElectricBillUri:"",
                isErrorElectricBillUri:false,
                seekerVideoUrl:"",
                errorSeekerVideoUrl:"",
                isErrorSeekerVideoUrl:false,
                seekerResidenceVideoUrl:"",
                errorSeekerResidenceVideoUrl:"",
                isErrorSeekerResidenceVideoUrl:false,
                electricBillUrl:"",
                errorElectricBillUrl:"",
                isErrorElectricBillUrl:false,
                description: "",
                errorDescription:"",
                isErrorDescription:false,
                seeker: "",
                errorSeeker:"",
                isErrorSeeker:false,
                phoneNumber: "",
                errorPhoneNumber:"",
                isErrorPhoneNumber:"",
                address: "",
                isErrorAddress:false,
                errorAddress:"",
                bankName: "",
                errorBankName:"",
                isErrorBankName:false,
                accountTitle: "",
                errorAccountTitle:"",
                isErrorAccountTitle:false,
                accountNumber: "",
                errorAccountNumber:"",
                isErrorAccountNumber:false,
                amountNeeded: 0,
                errorAmountNeeded:"",
                isErrorAmountNeeded:false,
                typeOfDonation: "",
                errorTypeOfDonation:"",
                isErrorTypeOfDonation:false,
                purpose:"",
                errorPurpose:"",
                isErrorPurpose:"",
                creator: "",
            }
        }
    }
});

export const {
    setToInitial,
    setSeekerVideoUri,
    setErrorSeekerVideoUri,
    setIsErrorSeekerVideoUri,
    setSeekerResidenceVideoUri,
    setErrorSeekerResidenceVideoUri,
    setIsErrorSeekerResidenceVideoUri,
    setSeekerVideoUrl,
    setErrorSeekerVideoUrl,
    setIsErrorSeekerVideoUrl,
    setSeekerResidenceVideoUrl,
    setErrorSeekerResidenceVideoUrl,
    setIsErrorSeekerResidenceVideoUrl,
    setElectricBillUri,
    setErrorElectricBillUri,
    setIsErrorElectricBillUri,
    setElectricBillUrl,
    setErrorElectricBillUrl,
    setIsErrorElectricBillUrl,
    setDescription,
    setErrorDescription,
    setIsErrorDescription,
    setSeeker,
    setErrorSeeker,
    setIsErrorSeeker,
    setPhoneNumber,
    setErrorPhoneNumber,
    setIsErrorPhoneNumber,
    setAddress,
    setErrorAddress,
    setIsErrorAddress,
    setBankName,
    setErrorBankName,
    setIsErrorBankName,
    setAccountTitle,
    setErrorAccountTitle,
    setIsErrorAccountTitle,
    setAccountNumber,
    setErrorAccountNumber,
    setIsErrorAccountNumber,
    setAmountNeeded,
    setErrorAmountNeeded,
    setIsErrorAmountNeeded,
    setPurpose,
    setErrorPurpose,
    setIsErrorPurpose,
    setTypeOfDonation,
    setErrorTypeOfDonation,
    setIsErrorTypeOfDonation,
    setCreator
} = createPostSlice.actions;
export default createPostSlice.reducer;