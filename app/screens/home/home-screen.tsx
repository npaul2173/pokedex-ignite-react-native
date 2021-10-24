import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { pokemonStore } = useStores()
  console.log(pokemonStore)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = () => {
    // setRefreshing(true)
    pokemonStore.getPokemons()
    // setRefreshing(false)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="asdas" />
    </Screen>
  )
})
