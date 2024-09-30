import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const DonateModal = ({ isDonate, setIsDonate }) => {
    const [amount, setAmount] = useState()
    const [isKeyboardShown, setIsKeyboardShown] = useState(false)
    const scrollViewRef = useRef();
    isKeyboardShown & (scrollViewRef.current?.scrollToEnd({ animated: true }))


    useEffect(() => {
        // Keyboard opened event
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardShown(true);
            }
        );

        // Keyboard closed event
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardShown(false);
            }
        );

        // Clean up the event listeners on unmount
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView>
            <Modal transparent={true}
                visible={isDonate}
                onDismiss={() => {
                    setIsDonate(false)
                }}
                onRequestClose={() => {
                    setIsDonate(false)
                }}
            >

                <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: responsiveWidth(90), height: responsiveHeight(70), justifyContent: 'flex-start', alignItems: 'flex-start', padding: responsiveWidth(4), borderRadius: responsiveWidth(5), elevation: responsiveHeight(1), shadowColor: 'gray', shadowOffset: responsiveHeight(1), shadowOpacity: responsiveHeight(1), shadowRadius: responsiveWidth(5), backgroundColor: '#FAFAFA' }}>
                        <ScrollView ref={scrollViewRef}>
                            <View style={{ paddingBottom: isKeyboardShown ? responsiveHeight(25) : 0 }}>
                                <Text style={{ fontSize: responsiveHeight(4), fontWeight: 'bold', margin: responsiveWidth(2) }}>Donate</Text>
                                <View>
                                    <Text style={{ fontSize: responsiveHeight(3), fontWeight: 'bold', margin: responsiveWidth(2) }}>First Step</Text>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: responsiveHeight(2.5), fontWeight: 'medium', margin: responsiveWidth(2) }} >Verify the seeker's address and bank details by calling them, and confirm their identity and eligibility to receive Zakat. If the seeker lives near you, then do visit.</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: responsiveHeight(3), fontWeight: 'bold', margin: responsiveWidth(2) }}>Second Step</Text>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: responsiveHeight(2.5), fontWeight: 'medium', margin: responsiveWidth(2) }} >Make payments directly to the seeker through safe and secure methods such as internet banking or delivery services. Ensure that the payment reaches them without any delay or inconvenience.</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: responsiveHeight(3), fontWeight: 'bold', margin: responsiveWidth(2) }}>Third Step</Text>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: responsiveHeight(2.5), fontWeight: 'medium', margin: responsiveWidth(2) }} >After making the payment, please inform us of the amount you paid so that we can keep a record and track the payment. This will help us ensure that Zakat reaches those in need in a timely and efficient manner.</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: responsiveHeight(2.5), fontWeight: 'medium', margin: responsiveWidth(2) }}>Kindly Enter the amount in PKR:</Text>
                                    <TextInput style={{ width: responsiveWidth(50), fontSize: responsiveHeight(2.5), margin: responsiveWidth(2), borderColor: 'black', borderWidth: responsiveWidth(.3), backgroundColor: 'white' }} keyboardType='numeric' placeholder='0' value={amount} onChangeText={setAmount} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => {
                                        setIsDonate(false)
                                    }
                                    }
                                        style={{ backgroundColor: '#4B5563', padding: responsiveWidth(2.2), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                                        <Text style={{ color:'white',fontSize: responsiveHeight(2), fontWeight: 'bold'}}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}
                                        style={{ backgroundColor: '#03bafc', padding: responsiveWidth(2.2), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                                        <Text style={{ fontSize: responsiveHeight(2), fontWeight: 'bold', color: 'white' }}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

export default DonateModal