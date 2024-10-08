package com.noticatcher

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class NotiCatcherModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        lateinit var reactContext: ReactApplicationContext

        fun sendNotificationToReact(packageName: String, title: String, text: String) {
            val params = Arguments.createMap()
            params.putString("packageName", packageName)
            params.putString("title", title)
            params.putString("text", text)

            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onNotificationReceived", params)
        }
    }

    override fun getName(): String {
        return "NotiCatcherModule"
    }
}
