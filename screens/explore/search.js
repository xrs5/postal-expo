import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	View,
	Platform
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
	List,
	ListItem,
	Divider,
	Input,
	Button,
	Text,
	Icon,
	TopNavigation,
	TopNavigationAction,
} from "@ui-kitten/components";

import { useLazyQuery } from "@apollo/client";
import { QUERY_GET_ALL_POSTAL_PLACE } from "../../graphql/query";

import Spinner from "react-native-loading-spinner-overlay";

function SearchScreen(props) {
	const navigation = useNavigation();

	const [
		getListPostal,
		{
			onCompleted,
			networkStatus,
			error: errorPostal,
			called: calledPostal,
			loading: loadingPostal,
			data: dataPostal,
		},
	] = useLazyQuery(QUERY_GET_ALL_POSTAL_PLACE, {
		onCompleted: () => {
			// setLoading(false);
			console.log(44, dataPostal.postals);

			setAllPostalList(dataPostal.postals);
			console.log("onCompleted ", dataPostal.postals.length);
		},
		onError: () => {
			console.log("onError");
			console.log(errorPostal);
		},
	});

	const [allPostalList, setAllPostalList] = useState({});
	const [textSearch, setTextSearch] = useState("");
	const [page, setPage] = useState(1);
	// const [loading, setLoading] = useState(false);

	async function findPostal() {

		if (!loadingPostal) {
			// setLoading(true);

			console.log(73, textSearch);
			
			getListPostal({
				variables: {
					text: "%" + (textSearch.toLowerCase()).replace("xã", "x.").replace("phường", "p.") + "%",
					// litmit: 10,
					// offset: 0,
				},
			});
		}
	}

	// async function scrollPage() {
	// 	setPage(page + 1)
	// 	console.log('scrollPage', (page * 10))
	// 	// getListPostal({ variables: { text: "%" + textSearch + "%", litmit: 10, offset: ((page - 1) * 10) } });

	// }

	// let renderIcon = (type) => {
	// 	// if (type == 1) {
	// 	return <Icon name="home-outline" />;
	// 	// } else {
	// 	// return (<Icon {...props} name="person-outline" />)
	// 	// }
	// };

	const renderIcon = (props) => <Icon {...props} name="home-outline" />;

	let renderItem = ({ item, index }) => {

		let name = (item.name).replace("X. ", "Xã ").replace("P. ", "Phường ");

		return (
			<ListItem
				key={item.id}
				title={`${name}`}
				description={`${item.code}`}
				onPress={() => navigation.navigate("Postal", { postal: item })}
				accessoryLeft={renderIcon}
			/>
		);
	};

	const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
	const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

	const renderBackAction = () => (
		<TopNavigationAction
			icon={BackIcon}
			onPress={() =>
				props.navigation.navigate("Explorer", {
					textSearch: textSearch,
				})
			}
		/>
	);

	return (
		<SafeAreaView
			style={{
				backgroundColor: "#fff",
				height: Dimensions.get("window").height,
				paddingTop: Platform.OS === 'android' ? 25 : 0
			}}
		>
			<TopNavigation
				alignment="center"
				title="Tìm kiếm"
				accessoryLeft={renderBackAction}
				// accessoryRight={renderRightActions}
			/>
			<Divider />

			<View
				style={styles.messageInputContainer}
				// offset={keyboardOffset}
			>
				<Input
					style={styles.messageInput}
					placeholder="Tên địa điểm, mã bưu chính..."
					value={textSearch}
					onChangeText={(textSearch) => setTextSearch(textSearch)}
					// icon={MicIcon}
					// accessoryLeft={SearchIcon}
				/>
				<Button
					size="small"
					style={{ height: 40, backgroundColor: "#0469c1" }}
					// appearance="ghost"
					// style={[styles.iconButton, styles.sendButton]}
					// accessoryRight={SearchIcon}
					onPress={() => findPostal()}
				>
					Tìm
				</Button>
			</View>

			<Spinner visible={loadingPostal} />

			{loadingPostal == true && (
				<View style={{ ...styles.container }}>
					<Text style={[styles.title, {marginTop: -200}]} category="h6">
						Đang tìm..
					</Text>
				</View>
			)}

			{allPostalList.length > 0 && loadingPostal == false && (
				<List
					data={allPostalList}
					ItemSeparatorComponent={Divider}
					renderItem={renderItem}
					// onScrollEndDrag={() => console.log("end")}
					// onScrollBeginDrag={() => scrollPage()}
				/>
			)}

			{allPostalList.length == 0 && loadingPostal == false && (
				<View style={{ ...styles.container }}>
					<Text style={[styles.title, {marginTop: -200}]} category="h6">
						Không tìm thấy kết quả
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		padding: 17,
		backgroundColor: "#fff",
		textAlign: "center",
	},

	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// paddingTop: 200,
		// paddingHorizontal: 25,
		backgroundColor: "#FFFFFF",
	},
	loadingView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	current20: {
		color: "#033C47",
		fontSize: 20,
	},

	chatContent: {
		paddingHorizontal: 8,
		paddingVertical: 12,
	},
	messageInputContainer: {
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 16,
		backgroundColor: "#fff",
		// backgroundColor: "background-basic-color-1",
	},
	// attachButton: {
	// 	borderRadius: 24,
	// 	marginHorizontal: 8,
	// },
	messageInput: {
		flex: 1,
		marginHorizontal: 8,
	},
	sendButton: {
		marginRight: 4,
	},
	iconButton: {
		width: 24,
		height: 24,
	},
});

function mapStateToProps(state) {
	return { favs: state.favs };
}

export default connect(mapStateToProps, null)(SearchScreen);