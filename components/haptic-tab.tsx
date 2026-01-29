<<<<<<< HEAD
// HapticTab.tsx
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { GestureResponderEvent, Platform } from 'react-native';
=======
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
<<<<<<< HEAD
      onPressIn={(ev: GestureResponderEvent) => {

        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else if (Platform.OS === 'android') {
          Haptics.selectionAsync();
        }

=======
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
        props.onPressIn?.(ev);
      }}
    />
  );
}
