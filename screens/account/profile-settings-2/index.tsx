import React, { useState, useEffect } from "react";
import {
	ScrollView,
	View,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native";
import {
	Button,
	Layout,
	StyleService,
	Text,
	Input,
	Icon,
	useStyleSheet,
	TopNavigation,
	TopNavigationAction,
	Divider,
	Avatar,
	RadioGroup,
	Radio,
	Datepicker,
	NativeDateService,
} from "@ui-kitten/components";

// import { ProfileSetting } from "./extra/profile-setting.component";
// import { ProfileAvatar } from "./extra/profile-avatar.component";
// import { CameraIcon } from "./extra/icons";
// import { Profile } from "./extra/data";

import { connect } from "react-redux";

import { MUTATION_UPDATE_PROFILE_DETAIL } from "../../../graphql/query";

import { useMutation } from "@apollo/client";
import { isEmpty, isMin } from "../../../functions/strings";
import Spinner from "react-native-loading-spinner-overlay";

// const profile: Profile = Profile.jenniferGreen();

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

const useDatepickerState = (initialDate = null) => {
	const [date, setDate] = React.useState(initialDate);
	return { date, onSelect: setDate };
};

const i18n = {
	dayNames: {
		short: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
		long: [
			"Chủ nhật",
			"Thứ hai",
			"Thứ ba",
			"Thứ tư",
			"Thứ năm",
			"Thứ sáu",
			"Thử bảy",
		],
	},
	monthNames: {
		short: [
			"T1",
			"T2",
			"T3",
			"T4",
			"T5",
			"T6",
			"T7",
			"T8",
			"T9",
			"T10",
			"T11",
			"T12",
		],
		long: [
			"Tháng một",
			"Tháng hai",
			"Tháng ba",
			"Tháng tư",
			"Tháng năm",
			"Tháng sáu",
			"Tháng bảy",
			"Tháng tám",
			"Tháng chín",
			"Tháng mười",
			"Tháng mười một",
			"Tháng mười hai",
		],
	},
};

const localeDateService = new NativeDateService("ru", {
	i18n,
	startDayOfWeek: 1,
});
const formatDateService = new NativeDateService("en", { format: "DD.MM.YYYY" });

function EditProfileScreen(props) {
	const [
		updateInfo,
		{
			error: errorInfo,
			called: calledInfo,
			loading: loadingInfo,
			data: dataInfo,
		},
	] = useMutation(MUTATION_UPDATE_PROFILE_DETAIL, {
		onCompleted: (dataInfo) => {
			console.log("onCompleted");
			console.log(44, dataInfo);

			setLoading(false);

			if (isEmpty(dataInfo.update_users.returning[0]) == true) {
				console.log("false");

				setTimeout(() => {
					Alert.alert("Có lổi xảy ra. Vui lòng thử lại sau");
				}, 800);
			} else {
				props.storeUserInfo(dataInfo.update_users.returning[0]);

				// props.navigation.navigate("More");
				setTimeout(() => {
					Alert.alert("Đã lưu");
				}, 800);
			}
		},
		onError: (errorInfo) => {
			console.log("onError");
			console.log(errorInfo);
		},
	});

	const [fullnameInput, setFullnameInput] = useState("");
	const [genderInput, setGenderInput] = useState("");
	const [birthdayInput, setBirthdayInput] = useState("");
	const [addressInput, setAddressInput] = useState("");

	const [date, setDate] = useState(new Date());
	const dateFormatPickerState = useDatepickerState();
	const localePickerState = useDatepickerState();

	const [dataInfoResponse, setDataInfo] = useState({});
	const [selectedIndex, setSelectedIndex] = useState(null);

	const [loading, setLoading] = useState(false);

	const styles = useStyleSheet(themedStyles);

	// console.log(300, props.token);
	// console.log(311, props.infos);

	useEffect(() => {
		console.log(145, props.infos);

		setFullnameInput(props.infos.fullname);

		setGenderInput(props.infos.gender);
		setSelectedIndex(props.infos.gender - 1);

		setBirthdayInput(props.infos.birthday);
		setAddressInput(props.infos.address);

		const getPostals = async () => {
			var allPostals = await getListPostal();
		};
	}, []);

	let userData;

	function onSelectGender(index) {
		// if (index != 0 && index != 1) return false

		setSelectedIndex(index);
		setGenderInput(index + 1);
	}

	const onClickSubmit = async () => {
		// console.log(100, "onClickSubmit");

		console.log("gender: " + genderInput);
		console.log("gender: " + birthdayInput);
		setLoading(true);

		let valueGender = genderInput + 1;

		updateInfo({
			variables: {
				id: props.infos.id,
				fullname: fullnameInput,
				gender: genderInput,
				birthday: birthdayInput,
				address: addressInput,
			},
		});
	};

	const renderPhotoButton = () => (
		<Button
			style={styles.photoButton}
			size="small"
			status="basic"
			icon={CameraIcon}
		/>
	);

	const renderBackAction = () => (
		<TopNavigationAction
			icon={BackIcon}
			onPress={() => props.navigation.navigate("More")}
		/>
	);

	return (
		<SafeAreaView style={{ paddingTop: 20 }}>
			<Spinner visible={loadingInfo} />
			<TopNavigation
				alignment="center"
				title="Chỉnh sửa tài khoản"
				accessoryLeft={renderBackAction}
				// accessoryRight={renderRightActions}
			/>
			<Divider />
			{/*<Layout style={styles.photoSection} level="1">
				<ProfileAvatar
					style={styles.photo}
					source={profile.photo}
					editButton={renderPhotoButton}
				/>
				<View style={styles.nameSection}>
					<ProfileSetting
						style={styles.setting}
						value={profile.firstName}
					/>
					<ProfileSetting
						style={styles.setting}
						value={profile.lastName}
					/>
				</View>
			</Layout>*/}
			{/*
			<Text style={styles.description} appearance="hint">
					{profile.description}
				</Text>
			*/}

			<View style={[themedStyles.formContainer]}>
				{/*<Avatar
					style={[styles.profileAvatar, styles.avatar]}
					source={profile.photo}
				/>*/}
				<Input
					placeholder="Nhập họ và tên"
					label="Họ và tên"
					autoCapitalize="words"
					value={fullnameInput}
					onChangeText={(text) => setFullnameInput(text)}
					style={{ paddingBottom: 5 }}
				/>
				<Layout style={styles.containerRadio} level="1">
					<RadioGroup
						selectedIndex={selectedIndex}
						onChange={(index) => onSelectGender(index)}
					>
						<Radio value="1">Nam</Radio>
						<Radio value="2">Nữ</Radio>
					</RadioGroup>
				</Layout>

				{/*<Datepicker
					style={{ paddingTop: 8 }}
					label="Ngày sinh"
					date={date}
					onSelect={(nextDate) => setDate(nextDate)}
					accessoryRight={CalendarIcon}
					dateService={localeDateService}
					{...localePickerState}
				/>*/}

				<Input
					placeholder=""
					label="Địa chỉ"
					autoCapitalize="words"
					value={addressInput}
					onChangeText={(text) => setAddressInput(text)}
					style={{ paddingVertical: 5 }}
				/>

				<Button
					style={styles.doneButton}
					onPress={() => onClickSubmit()}
					status="info"
				>
					Lưu
				</Button>
			</View>
		</SafeAreaView>
	);
}

const themedStyles = StyleService.create({
	container: {
		flex: 1,
		backgroundColor: "background-basic-color-2",
	},
	containerRadio: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	containerInput: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	formContainer: {
		padding: 20,
		backgroundColor: "#fff",
		height: Dimensions.get("window").height,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	photoSection: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	radio: {
		margin: 2,
	},
	avatar: {
		alignSelf: "center",
	},
	profileAvatar: {
		aspectRatio: 1.0,
		height: 124,
		alignSelf: "center",
	},
	photo: {
		aspectRatio: 1.0,
		height: 76,
	},
	photoButton: {
		aspectRatio: 1.0,
		height: 32,
		borderRadius: 16,
	},
	nameSection: {
		flex: 1,
		marginHorizontal: 8,
	},
	description: {
		padding: 24,
		backgroundColor: "background-basic-color-1",
	},
	doneButton: {
		// marginHorizontal: 24,
		marginTop: 15,
		borderColor: "#0469c1",
		backgroundColor: "#0469c1",
	},
	setting: {
		padding: 16,
	},
	emailSetting: {
		marginTop: 24,
	},
});

function mapDispatchToProps(dispatch) {
	return {
		storeData: function (token) {
			dispatch({ type: "saveToken", token });
		},
		storeUserInfo: function (infos) {
			dispatch({ type: "saveUserInfo", infos });
		},
	};
}

// function mapStateToProps(state) {
// 	return { infos: state.info, USER_INFO: state.info, token: state.token };
// }

function mapStateToProps(state) {
	return { infos: state.infos, token: state.token };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);