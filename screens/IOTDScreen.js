import React from 'react';
import { 
    View, 
    Image, 
    Dimensions, 
    FlatList, 
    ActivityIndicator, 
    Button, 
    Text,
    StyleSheet,
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Globals from '../constants/Globals';

const { width, height } = Dimensions.get('window');
const equalWidth = (width / 2 );

export default class IOTDScreen extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
        loading: false,
        data: [],
        page: 1,
        error: null,
        refreshing: false
        };
    }
    
    componentDidMount() {
        this.makeRemoteRequest();
    }
    
    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://astrobin.com/api/v1/imageoftheday/?limit=${page}&api_key=${Globals.key}&api_secret=${Globals.sec}&format=json`;
        this.setState({ loading: true });

        fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res.objects);
            this.setState({
            data: res.objects,
            error: res.error || null,
            loading: false,
            refreshing: false
            });
        })
        .catch(error => {
            this.setState({ error, loading: false });
        });
    };
    
    handleRefresh = () => {
        this.setState(
        {
            page: 1,
            seed: this.state.seed + 1,
            refreshing: true
        },
        () => {
            this.makeRemoteRequest();
        }
        );
    };
    
    handleLoadMore = () => {
        this.setState(
        {
            page: this.state.page + 1
        },
        () => {
            this.makeRemoteRequest();
        });
    };
  
    _keyExtractor = (item, index) => item.id;

    renderRowItem = (itemData) => {
        return (
        <View>
            <Image style={{ height: 150,  width : equalWidth}} source={{ uri: itemData.item.imageUrl }} resizeMode='cover' />
        </View>
        )
    }

    renderSeparator = () => {
        return (
        <View
            style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
            }}
        />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
        <View
            style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
            }}
        >
            <ActivityIndicator animating size="large" />
        </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.data}
                numColumns={2}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderRowItem}
                />
            </View>
            
//         <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
//             <FlatList
//                 data={this.state.data}
//                 renderItem={({ item }) => (
//                     <ListItem
//                         roundAvatar
//                         title={`${item.name.first} ${item.name.last}`}
//                         subtitle={item.email}
//                         avatar={{ uri: item.picture.thumbnail }}
//                         containerStyle={{ borderBottomWidth: 0 }}
//                     />
//                 )}
//                 keyExtractor={item => item.email}
//                 ItemSeparatorComponent={this.renderSeparator}
//                 ListHeaderComponent={this.renderHeader}
//                 ListFooterComponent={this.renderFooter}
//                 onRefresh={this.handleRefresh}
//                 refreshing={this.state.refreshing}
//                 onEndReached={this.handleLoadMore}
//                 onEndReachedThreshold={50}
//             />
//         </List>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    }
});
