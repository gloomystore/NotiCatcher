import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Switch } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { NotificationListener } = NativeModules;
const notificationEmitter = new NativeEventEmitter(NotificationListener);

type Notification = {
  packageName: string;
  title: string;
  text: string;
};

const App = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  useEffect(() => {
    const subscription = notificationEmitter.addListener('notificationReceived', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleAppSelection = (packageName: string) => {
    setSelectedApps((prevSelectedApps) =>
      prevSelectedApps.includes(packageName)
        ? prevSelectedApps.filter((app) => app !== packageName)
        : [...prevSelectedApps, packageName]
    );
  };
  const requestNotificationAccess = () => {
    NotificationListener.requestNotificationAccess();
  };


  return (
    <View>
      <Button title="Enable Notification Access" onPress={requestNotificationAccess} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.packageName}
        renderItem={({ item }) => (
          <View>
            <Text>App: {item.packageName}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Text: {item.text}</Text>
          </View>
        )}
      />
      <Text>Select Apps to receive notifications:</Text>
      <View>
        {['com.example.app1', 'com.example.app2'].map((app) => (
          <View key={app} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{app}</Text>
            <Switch
              value={selectedApps.includes(app)}
              onValueChange={() => toggleAppSelection(app)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default App;
