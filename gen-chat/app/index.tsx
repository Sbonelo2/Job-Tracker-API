import { Dimensions, Image, StyleSheet } from "react-native";

export default function Index() {
  return (
    <>
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: "https://cdn.britannica.com/05/152305-050-0E7CC0FC/African-savanna-elephant-Botswana.jpg",
        }}
      />
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: "https://cdn.britannica.com/05/152305-050-0E7CC0FC/African-savanna-elephant-Botswana.jpg",
        }}
      />
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: "https://cdn.britannica.com/05/152305-050-0E7CC0FC/African-savanna-elephant-Botswana.jpg",
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 450,
    width: Dimensions.get("window").width / 2,
    backgroundColor: "green",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "blue",
  },
  span: {
    color: "red",
    fontSize: 30,
  },
  button: {
    color: "green",
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
