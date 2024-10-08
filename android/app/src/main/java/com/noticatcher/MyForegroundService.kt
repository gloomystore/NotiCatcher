package com.noticatcher

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

class MyForegroundService : Service() {
    override fun onCreate() {
        super.onCreate()


        val channel = NotificationChannel(
            "MyChannelID",
            "My Channel",
            NotificationManager.IMPORTANCE_DEFAULT
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager?.createNotificationChannel(channel)


        val notification = NotificationCompat.Builder(this, "MyChannelID")
            .setContentTitle("My Service")
            .setContentText("Listening for notifications")
            .setSmallIcon(R.drawable.ic_notification)
            .build()

        startForeground(1, notification)
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
