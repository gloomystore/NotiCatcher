package com.noticatcher

import android.content.Context
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.content.SharedPreferences
import android.util.Log

class NotiCatcherService : NotificationListenerService() {
    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreate() {
        super.onCreate()
        sharedPreferences = getSharedPreferences("NotiCatcherPrefs", Context.MODE_PRIVATE)
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val packageName = sbn.packageName
        val savedApps = sharedPreferences.getStringSet("savedApps", emptySet())

        if (savedApps?.contains(packageName) == true) {
            val notification = sbn.notification
            val extras = notification.extras
            val title = extras.getString("android.title")
            val text = extras.getCharSequence("android.text").toString()

            Log.d("NotiCatcher", "Package: $packageName, Title: $title, Text: $text")

            // React Native로 알림 데이터 전송
            if (title != null) {
                NotiCatcherModule.sendNotificationToReact(packageName, title, text)
            }
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        // 알림이 지워질 때 처리할 내용
    }
}
