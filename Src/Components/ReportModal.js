import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import RadioButtonRN from 'radio-buttons-react-native';
import { useReportMutation } from '../Api/Posts';

const ReportModal = ({ isReport, setIsReport,slug,token }) => {



    const [selectedBtn,setSelectedBtn]=useState()

    const data = [
        { label: 'Fake in nature 1' },
        { label: 'He has already posted' },
        { label: 'lying' },
        { label: 'Inappropriate Content' },
        { label: 'Spam' }
    ];

    const [reportMutation] = useReportMutation();
    

  
    const handleSubmitReport = async (event) => {
    //   event.preventDefault();
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append('report', selectedBtn);
    console.log(formData)
  
      try {
        reportMutation({formData,token}).then(resData=>{
        console.log(resData);
        setSelectedBtn(''); // Reset selected option
        // setShowSuccessMessage(true); // Show success message
        setIsReport(false)// Close the popup after submission
        console.warn('reportsubmitedsuccessfully')
         // Hide the success message after 5 seconds
        //  setTimeout(() => {
        //     setShowSuccessMessage(false);
        //   }, 5000);
        })
        
  
       
      } catch (error) {
        console.log("Error:", error);
      }
    };


    return (
        <Modal transparent={true}
            visible={isReport}
            onDismiss={() => {
                setIsReport(false)
            }}
            onRequestClose={() => {
                setIsReport(false)
            }}
        >
            <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: responsiveWidth(90), height: responsiveHeight(70), padding: responsiveWidth(4), borderRadius: responsiveWidth(5), elevation: responsiveHeight(1), shadowColor: 'gray', shadowOffset: responsiveHeight(1), shadowOpacity: responsiveHeight(1), shadowRadius: responsiveWidth(5), backgroundColor: '#FAFAFA' }}>
                    <ScrollView >
                        <View style={{ width: responsiveWidth(80) }}>
                            <Text style={{ fontSize: responsiveHeight(4), fontWeight: 'bold', margin: responsiveWidth(2) }}>Report</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSelectedBtn(e.label)}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center" ,marginTop:responsiveWidth(2)}}>
                                <TouchableOpacity onPress={() => {
                                    setIsReport(false)
                                }
                                }
                                    style={{ backgroundColor: '#4B5563', padding: responsiveWidth(2.2), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                                    <Text style={{ color: 'white', fontSize: responsiveHeight(2), fontWeight: 'bold' }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={selectedBtn?false:true} onPress={() => {handleSubmitReport() }}
                                    style={{ backgroundColor:selectedBtn? '#03bafc':'gray', padding: responsiveWidth(2.2), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                                    <Text style={{ fontSize: responsiveHeight(2), fontWeight: 'bold', color: 'white' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default ReportModal