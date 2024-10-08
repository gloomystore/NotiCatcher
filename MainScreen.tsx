import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, NativeEventEmitter, NativeModules } from 'react-native';

const { NotiCatcherModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(NotiCatcherModule);

const MainScreen = ({ navigation }) => { // navigation prop 추가
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const subscription = eventEmitter.addListener('onNotificationReceived', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View>
      <Text>Notification List</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')} // 설정 화면으로 이동
      />
    </View>
  );
};

export default MainScreen;
