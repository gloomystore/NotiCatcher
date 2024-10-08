import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [apps, setApps] = useState([
    { name: 'com.example.app1', selected: false },
    { name: 'com.example.app2', selected: false },
    // 추가 앱 목록
  ]);

  useEffect(() => {
    // 저장된 앱 목록을 불러옵니다
    const loadSavedApps = async () => {
      const savedApps = await AsyncStorage.getItem('savedApps');
      console.log('savedApps', savedApps)
      if (savedApps) {
        const parsedApps = JSON.parse(savedApps);
        setApps((prevApps) =>
          prevApps.map((app) => ({
            ...app,
            selected: parsedApps.includes(app.name),
          }))
        );
      }
    };
    loadSavedApps();
  }, []);

  const toggleAppSelection = (appName:any) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.name === appName ? { ...app, selected: !app.selected } : app
      )
    );
  };

  const saveApps = async () => {
    const selectedApps = apps.filter((app) => app.selected).map((app) => app.name);
    await AsyncStorage.setItem('savedApps', JSON.stringify(selectedApps));
    // 저장한 앱 목록을 Kotlin의 SharedPreferences로 전달
    NotiCatcherModule.saveSelectedApps(selectedApps);
  };

  return (
    <View>
      <Text>Select Apps for Notification</Text>
      {apps.map((app) => (
        <View key={app.name}>
          <Text>{app.name}</Text>
          <Switch
            value={app.selected}
            onValueChange={() => toggleAppSelection(app.name)}
          />
        </View>
      ))}
      <Button title="Save" onPress={saveApps} />
    </View>
  );
};

export default SettingsScreen;
