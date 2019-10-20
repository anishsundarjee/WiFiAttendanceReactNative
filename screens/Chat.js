import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { AsyncStorage, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'

import Fire from '../components/Config/Fire';

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {

  state = {
    messages: [],
  };

  get user() {
    return {
      name: 'Teacher',
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
        />
        {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" 
            keyboardVerticalOffset = '135'
          />
        }
      </SafeAreaView>
    );
  }

  componentDidMount = async () => {
    await AsyncStorage.setItem('Token','');
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
