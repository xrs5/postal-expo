import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	AsyncStorage,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import { Text } from "@ui-kitten/components";

import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";

// custom fonts
import { AppLoading } from "expo";
import SMS from "../../functions/sms";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
	MUTATION_CREATE_CODE_CONFIRM,
	QUERY_FORGET_PASSWORD_CHECK_PHONE,
} from "../../graphql/query";

import { isEmpty, isMin } from "../../functions/strings";

import appConfigs from "../../config";

import Spinner from "react-native-loading-spinner-overlay";

function ForgetPasswordScreen(props) {
	const [
		checkPhone,
		{
			error: errorCheckPhone,
			called: calledCheckPhone,
			loading: loadingCheckPhone,
			data: dataCheckPhone,
		},
	] = useLazyQuery(QUERY_FORGET_PASSWORD_CHECK_PHONE, {
		// fetchPolicy: "no-cache",
		onCompleted: (dataCheckPhone) => {
			console.log("dataCheckPhone onCompleted");
			console.log(dataCheckPhone);

			if (isEmpty(dataCheckPhone.users[0]) == true) {
				Alert.alert("Không tìm thấy tài khoản");
			} else {
				let randomCode = Math.floor(1000 + Math.random() * 9000);
				console.log("randomCode: " + randomCode);

				createCodeConfirm({
					variables: { code: randomCode, phone: parseInt(phoneInput) },
				});
			}
		},
		onError: (errorCheckPhone) => {
			console.log("onError errorCheckPhone");
			console.log(errorCheckPhone);
		},
	});

	const [
		createCodeConfirm,
		{
			error: errorCode,
			called: calledCode,
			loading: loadingCode,
			data: dataCode,
		},
	] = useMutation(MUTATION_CREATE_CODE_CONFIRM, {
		// fetchPolicy: "no-cache",
		onCompleted: (dataCode) => {
			console.log(dataCode);
			console.log(44, dataCode.insert_user_confirm_code.returning[0].id);

			if (dataCode.insert_user_confirm_code.returning[0].id != null) {
				console.log("just call");

				let phone = "84" + phoneInput.substring(1);

				console.log("phone: " + phone);

				SMS.send({
					message: dataCode.insert_user_confirm_code.returning[0].code + ' la ma xac minh dang ky Baotrixemay cua ban',
					phone: phone,
				})
					.then((response) => {
						console.log("response SMS");
						console.log(response);
					})
					.catch((error) => {
						console.log("error");
						console.log(error);
					})
					.finally(() => {
						console.log("finally");
					});
			} else {
				console.log("false id");
			}
		},
		onError: (errorCode) => {
			console.log("onError");
			console.log(errorCode);
		},
	});

	const [phoneInput, setPhoneInput] = useState("");

	const onSubmit = async () => {
		Keyboard.dismiss();

		console.log(126, phoneInput);

		checkPhone({
			variables: {
				phone: phoneInput.toString(),
			},
		});
	};

	if (props.token) {
		props.navigation.navigate("Explore");
		return <AppLoading />;
	} else {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollview}
			>
				<Spinner visible={loadingCheckPhone} />
				<View style={{ ...styles.container }}>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						style={{ width: "100%" }}
					>
						<View
							style={{
								flexDirection: "column",
								margin: 50,
								marginTop: -120,
								paddingTop: 300,
							}}
						>
							<Text
								style={{
									fontSize: 22,
									color: "#000",
								}}
							>
								Quên mật khẩu
							</Text>

							<Text style={[styles.textBlackSize14]}>
								Số điện thoại
							</Text>
							<TextInput
								value={phoneInput}
								autoCapitalize="none"
								underlineColorAndroid="#00000000"
								returnKeyType={"next"}
								onSubmitEditing={() => {}}
								style={styles.customEditText}
								clearButtonMode="while-editing"
								enablesReturnKeyAutomatically={true}
								blurOnSubmit={false}
								placeholder={"Nhập số điện thoại"}
								onChangeText={(text) => setPhoneInput(text)}
								keyboardType="numeric"
							/>

							<View
								style={{ flexDirection: "row", marginTop: 24 }}
							>
								<TouchableOpacity
									style={styles.buttonBackgroundBlue}
									activeOpacity={0.5}
									onPress={() => onSubmit()}
								>
									<View style={{ padding: 10 }}>
										<Text
											style={[
												styles.textWhite,
												{ fontSize: 16 },
											]}
										>
											Gửi mã xác nhận
										</Text>
									</View>
								</TouchableOpacity>
							</View>

							<View
								style={{
									flexDirection: "row",
									marginTop: 20,
									height: 40,
								}}
							>
								<TouchableOpacity
									style={styles.buttonBorderBlue}
									activeOpacity={0.5}
									onPress={() =>
										props.navigation.navigate("SignIn")
									}
								>
									<Text style={styles.textSignUp}>
										Đăng nhập
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	forgotContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	forgotPass: {
		color: "#0469c1",
		fontSize: 12,
	},

	textBlackSize14: {
		color: "#202020",
		fontSize: 15,
		marginTop: 20,
		marginBottom: 10,
	},
	buttonBackgroundBlue: {
		flex: 1,
		backgroundColor: "#0469c1",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonBorderBlue: {
		flex: 1,
		borderColor: "#0469c1",
		borderRadius: 20,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},
	textSignUp: {
		fontSize: 16,
		color: "#0469c1",
	},
	customEditText: {
		backgroundColor: "#F4F5F6",
		borderRadius: 10,
		padding: 8,
		paddingStart: 15,
		color: "#9597A1",
	},
	textWhite: {
		fontSize: 18,
		color: "#fff",
	},

	scrollview: {
		backgroundColor: "#fff",
	},
});

function mapStateToProps(state) {
	return { token: state.token };
}

export default connect(mapStateToProps, null)(ForgetPasswordScreen);