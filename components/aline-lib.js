import React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
	TextInput,
	Dimensions,
	Keyboard,
} from "react-native";

// custom fonts
import { AppLoading } from "expo";
import { useFonts } from "@expo-google-fonts/capriola";

import { FontAwesome } from "@expo/vector-icons";

// colors vars
var blueDark = "#033C47";
var mintLight = "#0469c1";
var mint = "#0469c1";
var grayMedium = "#879299";
var graySuperLight = "#f4f4f4";
var greyLight = "#d8d8d8";

const AlineButton = ({ onPress, title, backgroundColor }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.alineButtonContainer,
			backgroundColor && { backgroundColor },
		]}
		activeOpacity={0.8}
	>
		<Text style={styles.alineButtonText}>{title}</Text>
	</TouchableOpacity>
);
const AlineButtonOutline = ({ onPress, title, borderColor }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.alineButtonContainerOutline,
			borderColor && { borderColor },
		]}
		activeOpacity={0.8}
	>
		<Text style={styles.alineButtonTextMint}>{title}</Text>
	</TouchableOpacity>
);

const BaseInputCenter = ({ children, label }) => (
	<View style={{}}>
		{/* LABEL */}
		<Text style={styles.alineInputLabel}>{label}</Text>
		{/* input */}
		{children}
	</View>
);

const AlineInputCenter = ({
	children,
	value,
	onChange,
	placeholder,
	...props
}) => (
	<BaseInputCenter style={{ alignItems: "center" }} {...props}>
		<TextInput
			value={value}
			onChangeText={onChange}
			placeholder={placeholder}
			style={{
				...styles.alineInput,
				width: Dimensions.get("window").width - 160,
			}}
		/>
	</BaseInputCenter>
);

const AlineInputEmail = ({
	children,
	value,
	onChange,
	placeholder,
	...props
}) => (
	<BaseInputCenter style={{ alignItems: "center" }} {...props}>
		<TextInput
			keyboardType="email-address"
			autoCapitalize="none"
			value={value}
			onChangeText={onChange}
			placeholder={placeholder}
			style={{
				...styles.alineInput,
				width: Dimensions.get("window").width - 160,
			}}
		/>
	</BaseInputCenter>
);

const AlineInputPassword = ({
	children,
	value,
	onChange,
	placeholder,
	...props
}) => (
	<BaseInputCenter style={{ alignItems: "center" }} {...props}>
		<TextInput
			secureTextEntry
			autoCapitalize="none"
			value={value}
			onChangeText={onChange}
			placeholder={placeholder}
			style={{
				...styles.alineInput,
				width: Dimensions.get("window").width - 160,
			}}
		/>
	</BaseInputCenter>
);

const AlineInput = ({ children, value, onChange, placeholder, ...props }) => (
	<BaseInputCenter {...props}>
		<View
			style={{
				flexDirection: "row",
				alignItems: "left",
				justifyContent: "left",
			}}
		>
			<TextInput
				onPress={() => console.log("press")}
				value={value}
				onChangeText={onChange}
				placeholder={placeholder}
				style={styles.alineInputArrow}
			/>
		</View>
	</BaseInputCenter>
);

const AlineInputCenterArrow = ({
	children,
	value,
	onChange,
	placeholder,
	...props
}) => (
	<BaseInputCenter {...props}>
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TextInput
				onPress={() => console.log("press")}
				value={value}
				onChangeText={onChange}
				placeholder={placeholder}
				style={styles.alineInputArrow}
			/>

			<FontAwesome name="filter" size={28} color={mint} />
		</View>
	</BaseInputCenter>
);

const AlineSeparator = ({ text }) => (
	<View
		style={{
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "90%",
			marginHorizontal: 0,
			paddingHorizontal: 0,
			paddingVertical: 20,
		}}
	>
		<View style={styles.line} />
		<Text style={styles.alineInputLabel}>{text}</Text>
		<View style={styles.line} />
	</View>
);

/* ^^^^^^^^^^^^^^^^^^^ TITLES & P ^^^^^^^^^^^^^^^^^^^^^^ */

const AlineH1 = ({ text }) => (
	<Text
		style={{
			fontSize: 30,
			color: blueDark,
			textAlign: "left",
			letterSpacing: -0.7,
		}}
	>
		{text}
	</Text>
);

/* ^^^^^^^^^^^^^^^^^^^ DIVIDER ^^^^^^^^^^^^^^^^^^^^^^^^^ */
const Divider = () => <View style={styles.line} />;

/* ^^^^^^^^^^^^^^^^^^^ POPIN ^^^^^^^^^^^^^^^^^^^^^^^^^ */
const AlinePopin = ({ text }) => (
	<View
		style={{
			flex: 1,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginVertical: 30,
		}}
	>
		<Text>{text}</Text>
	</View>
);

const styles = StyleSheet.create({
	alineButtonContainer: {
		// elevation: 8,
		backgroundColor: mint,
		borderRadius: 32,
		paddingVertical: 8,
		paddingHorizontal: 28,
		marginVertical: 14,
	},
	alineButtonContainerOutline: {
		// elevation: 8,
		borderWidth: 1,
		borderColor: mint,
		backgroundColor: "#fff",
		borderRadius: 32,
		paddingVertical: 8,
		paddingHorizontal: 28,
		marginVertical: 14,
	},
	alineButtonText: {
		fontSize: 16,
		color: "#fff",
		alignSelf: "center",
		letterSpacing: -0.7,
	},
	alineButtonTextMint: {
		fontSize: 16,
		color: mint,
		alignSelf: "center",
		letterSpacing: -0.7,
	},
	alineInput: {
		backgroundColor: graySuperLight,
		borderRadius: 32,
		paddingVertical: 8,
		paddingHorizontal: 14,
		marginVertical: 14,
		marginHorizontal: 36,
	},
	alineInputArrow: {
		backgroundColor: graySuperLight,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: grayMedium,
		borderLeftColor: grayMedium,
		borderRightColor: grayMedium,
		borderBottomColor: grayMedium,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		borderBottomRightRadius: 32,
		borderBottomLeftRadius: 32,
		paddingVertical: 5,
		paddingHorizontal: 14,
		marginHorizontal: 5,
		width: "80%",
	},
	alineInputText: {
		fontSize: 28,
		color: grayMedium,
		textAlign: "left",
	},
	alineInputLabel: {
		fontSize: 16,
		color: blueDark,
		textAlign: "center",
	},
	line: {
		flex: 0.5,
		borderWidth: 1,
		borderColor: greyLight,
		marginHorizontal: 10,
	},
});

export {
	AlineButton,
	AlineInput,
	AlineInputCenter,
	AlineInputCenterArrow,
	AlineSeparator,
	AlineButtonOutline,
	AlinePopin,
	AlineH1,
	Divider,
	AlineInputEmail,
	AlineInputPassword,
};
