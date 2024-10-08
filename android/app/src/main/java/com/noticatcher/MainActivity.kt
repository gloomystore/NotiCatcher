package com.noticatcher

import com.facebook.react.ReactActivity
import android.os.Bundle

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String? {
        return "NotiCatcher"  // React Native의 entry component 이름
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }
}
