import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Video from 'react-native-video'

const VideoPager = (params) => {
    // console.log('paused:',params.paused!=params.data.index)
    return (
        <View>
            {params.data.item.url ?
            <View>
                <View style={{ width: responsiveWidth(100), height: responsiveHeight(40) }}>
                    <Video
                        source={{ uri: params.data.item.url }} // Can be a URL or a local file.
                        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                        paused={params.paused!=params.data.index}
                        controls={false} // Display default video controls
                        resizeMode="cover" // Can be "contain", "cover", "stretch", etc.
                        onError={(error) => console.log('Video Error:', error)} // Callback when video cannot be loaded
                    />
                </View>
                {/* <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>{params.data.item.title}</Text>
                </View> */}
                </View>
                :
                <View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', width: responsiveWidth(100), height: responsiveHeight(40), backgroundColor: 'gray' }}>
                        <Text style={{ textAlign: 'center' }}>Video Not Present</Text>
                    </View>
                    {/* Tag */}
                    {/* <View style={styles.tagContainer}>
                        <Text style={styles.tagText}>{params.data.item.title}</Text>
                    </View> */}
                </View>
            }
        </View>

    )
}

export default VideoPager
const styles = StyleSheet.create({
    tagContainer: {
        justifyContent:'center',
      backgroundColor: '#fff', // Background color for the tag
      paddingVertical: 10,     // Padding around the text
      paddingHorizontal: 20,
      shadowColor: 'black',
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 5,            // Shadow for Android
    },
    tagText: {
      fontSize: 16,
      color: '#333',           // Text color
      fontWeight: 'bold',      // Bold text
      textAlign: 'center',
    },
  });
  