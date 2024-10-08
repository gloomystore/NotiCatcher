package com.noticatcher

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class NotificationListener : NotificationListenerService() {

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        super.onNotificationPosted(sbn)
        val packageName = sbn.packageName
        val title = sbn.notification.extras.getString("android.title")
        val text = sbn.notification.extras.getCharSequence("android.text").toString()

        Log.d("NotificationListener", "Notification from $packageName: $title - $text")

        // 알림을 React Native로 전달
        sendEvent(packageName, title, text)
    }

    private fun sendEvent(packageName: String, title: String?, text: String) {
        val reactContext = applicationContext as ReactApplicationContext
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("notificationReceived", "$packageName: $title - $text")
    }
}
