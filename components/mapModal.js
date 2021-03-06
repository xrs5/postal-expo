import React from "react";
import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppLoading } from "expo";

// fonts
import { useFonts, Capriola_400Regular } from "@expo-google-fonts/capriola";

/* Color ref */
var greyLight = "#d8d8d8";
var graySuperLight = "#f4f4f4";
var mint = "#0469c1";
var mintDark = "#2BA282";
var grayMedium = "#879299";
var blueDark = "#033C47";

function MapModal(props) {
	const navigation = useNavigation();

	const handleClick = () => {
		props.handleclickParent();
		navigation.navigate("Postal", { postal: props.place });
	};

	let [fontsLoaded] = useFonts({ Capriola_400Regular });

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<TouchableOpacity style={styles.modal} onPress={() => handleClick()}>
				<Image
					style={{
						width: 95,
						height: 95,
						marginRight: 10,
						resizeMode: "cover",
					}}
					source={{
						uri:
							props.place.placeImg &&
							props.place.placeImg != "" &&
							props.place.placeImg != undefined
								? props.place.placeImg
								: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAsP6fT1G8oAseRIIkDmygyD3TobV9wyedS-EeJ3yJmgUKMHFfVND2yoS4ZjTqyzY5pzE26bUUjhAdb5wfX6a3gsKkYO1iPJIZ1CAnPHb7ZlxsdkANpjzGIn0Chbok-4ztEhAK0TtTw-VPO8ZFbM9STOj7GhSxYOuVfcMpk73iwyJRYDtT5q31HA&3u4032&5m1&2e1&callback=none&key=AIzaSyBE9M-y5UbxB_Pbgx-ZBd-aeVnJkIOjFPE&token=4716",
					}}
				/>
				<View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Image
							style={{ width: 15, marginRight: 8 }}
							resizeMode="contain"
							source={
								props.place.type === "shop"
									? require("../assets/icons/boutique.png")
									: require("../assets/icons/restaurant.png")
							}
						/>

						<Text
							style={{
								...styles.text,
								letterSpacing: -0.7,
								fontSize: 14,
								width: "72%",
							}}
						>
							{props.place.name}
						</Text>
					</View>
					<View style={{ width: "68%" }}>
						<Text style={styles.text}>{props.place.adress}</Text>
						<Text style={styles.text}>{props.place.city}</Text>
					</View>
					<View>
						<Text
							style={{
								fontWeight: "bold",
								letterSpacing: -0.4,
								fontSize: 12,
								color: mint,
								marginTop: 5,
								width: "64%",
							}}
						>
							{props.place.services}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	modal: {
		width: Dimensions.get("window").width - 30,
		// height: Dimensions.get('window').height*(3/15),
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		alignSelf: "center",
		position: "absolute",
		padding: 15,
		backgroundColor: graySuperLight,
		borderColor: greyLight,
		borderWidth: 1,
		borderRadius: 0,
		bottom: 15,
	},
	text: {
		color: blueDark,
		letterSpacing: -0.4,
	},
});

// keep this line at the end
export default MapModal;
