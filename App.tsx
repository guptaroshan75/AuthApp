import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import StackNavigator from './Src/StackNavigator'

const App = () => {
  return (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  )
}

export default App
