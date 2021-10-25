import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Image, StatusBar, View, ViewStyle } from "react-native"
import { AutoImage, GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { FlatList } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { SafeAreaView } from "react-native-safe-area-context"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  // paddingHorizontal: spacing[4],
}

const ARTWORK_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

const defaultImage = require("../../../assets/icon/PDexLogo.png")
const source = defaultImage

export const HomeScreen = observer(function HomeScreen() {
  const { pokemonStore } = useStores()
  const { pokemons } = pokemonStore

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = () => {
    // setRefreshing(true)
    pokemonStore.getPokemons()
    // setRefreshing(false)
  }

  return (
    // <Screen style={ROOT} preset="scroll">
    //   <Text preset="header" text="asdas" />
    // </Screen>

    <SafeAreaView testID="HomeScreen" style={ROOT}>
      <StatusBar backgroundColor={"#5CC4FF"} />
      <Screen style={CONTAINER} backgroundColor={"#F6F6F6"}>
        <GradientBackground
          colors={["#5CC4FF", "#0097ED"]}
          style={{ height: 216, position: "absolute", zIndex: -20 }}
        />
        <AutoImage
          resizeMethod="resize"
          resizeMode="contain"
          style={{ height: 50, width: 100, marginVertical: spacing[4] }}
          source={source}
        />
        <FlatList
          data={[...pokemons]}
          numColumns={2}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1, margin: spacing[4] }}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    elevation: 2,
                    height: 100,
                    padding: spacing[3],
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold", textTransform: "capitalize" }}>
                    {item.name}
                  </Text>
                  <View
                    style={{ alignSelf: "flex-end", position: "absolute", bottom: -30, right: 10 }}
                  >
                    <Image
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{ height: 100, width: 100 }}
                      source={{ uri: `${ARTWORK_URL}${index + 1}.png` }}
                    />
                  </View>
                </View>
              </View>
            )
          }}
        />
      </Screen>
    </SafeAreaView>
  )
})
