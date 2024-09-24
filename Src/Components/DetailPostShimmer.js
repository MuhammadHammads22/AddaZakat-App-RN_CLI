import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export default function DetailPostShimmer() {
    return (
        <View>
            <ShimmerPlaceHolder style={{ width: responsiveWidth(100), height: responsiveHeight(40) }} />
            <ShimmerPlaceHolder style={styles.nameShimmer} />
            <View style={{ marginTop: responsiveHeight(4), flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                <ShimmerPlaceHolder style={styles.buttonShimer} />
                <ShimmerPlaceHolder style={styles.buttonShimer} />
                <ShimmerPlaceHolder style={styles.buttonShimer} />
                <ShimmerPlaceHolder style={styles.buttonShimer} />
            </View>
            <View style={{padding:responsiveWidth(4),marginTop:responsiveHeight(2)}}>
                {/* <Text style={styles.description}>{post.postData.item.description}</Text> */}
                <ShimmerPlaceHolder style={[styles.descriptionShimmer, { width: responsiveWidth(85) }]} />
                <ShimmerPlaceHolder style={[styles.descriptionShimmer, { width: responsiveWidth(80) }]} />
                <ShimmerPlaceHolder style={styles.descriptionShimmer} />
            </View>
        </View>
        //     <View style={styles.feed}>
        //      <View style={styles.mainPostShimmer}>
        //     <View style={styles.upperPostShimmer}>
        //       {/* postheader */}
        //       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        //         {/* avatar+name close */}
        //         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        //           <ShimmerPlaceHolder style={styles.avatarShimmer}/>
        //           <ShimmerPlaceHolder style={styles.nameShimmer}/>
        //         </View>
        //         <ShimmerPlaceHolder style={{width:responsiveWidth(2.5),height:responsiveHeight(3)}}/>
        //       </View>
        //       {/* post description section */}
        //       <View>
        //         {/* <Text style={styles.description}>{post.postData.item.description}</Text> */}
        //         <ShimmerPlaceHolder style={styles.descriptionShimmer}/>
        //       </View>
        //       {/* video section */}
        //       <ShimmerPlaceHolder style={styles.postImageShimmer}/>
        //     </View>
        //   </View>

        //   </View>
    )
}

const styles = StyleSheet.create({

    feed: {
        marginHorizontal: responsiveWidth(3)
    },
    descriptionShimmer: {
        marginTop: responsiveHeight(2.5)
    },
    containerShimmer: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    upperPostShimmer: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopStartRadius: responsiveWidth(3),
        borderTopEndRadius: responsiveWidth(3),
        padding: responsiveWidth(4),
        paddingBottom: responsiveWidth(2),
        flexDirection: "column"
    },
    mainPostShimmer: {
        marginVertical: responsiveHeight(1.5),
        elevation: 10,
        shadowColor: 'gray',
        shadowOffset: 5,
        shadowOpacity: 20
    },

    buttonShimer: {
        borderRadius: responsiveWidth(4),
        width: responsiveWidth(15),
        height: responsiveHeight(4.5)
    },

    avatarShimmer: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        backgroundColor: 'gray'
    },
    nameShimmer: {
        fontSize: responsiveWidth(3),
        margin: responsiveWidth(4),
        width: responsiveWidth(35),
        color: "gray"
    },
    descriptionShimmer: {
        marginTop: responsiveHeight(2.5),
    },
    postImageShimmer: {
        width: undefined,
        height: responsiveHeight(25),
        borderRadius: responsiveWidth(3),
        marginVertical: responsiveHeight(2),
        backgroundColor: 'green'
    },
    postImageShimmer: {
        width: undefined,
        height: responsiveHeight(25),
        borderRadius: responsiveWidth(3),
        marginVertical: responsiveHeight(2),
    }


});
