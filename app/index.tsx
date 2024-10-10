import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Cartela from "@/components/Cartela";
import BingoBoardData from '../bingo_board.data';

const Index = () => {
  const [cartelaList, setCartelaList] = useState<{}[]>([{
    hasCartela: false,
    board: null,
  }]);
  const [title, setTitle] = useState("Ethio-Bingo 0933555756");


  const mainCartelaData = BingoBoardData.map((e) => {
    return {
      board_number: e.cartela_number,
      board: {
        b_row: e.b_row.split(',').map((e_) => parseInt(e_)),
        i_row: e.i_row.split(',').map((e_) => parseInt(e_)),
        n_row: e.n_row.split(',').map((e_) => parseInt(e_)),
        g_row: e.g_row.split(',').map((e_) => parseInt(e_)),
        o_row: e.o_row.split(',').map((e_) => parseInt(e_)),
      },
    };
  });

  const addNewCartela = () => {
    const cartelaListCpy = [...cartelaList];
    cartelaListCpy.push({
      hasCartela: false,
      board: null,
    });
    setCartelaList(cartelaListCpy);
  };

  const clearCartela = (index:number) => {
    const cartelaListCpy = [...cartelaList];
    cartelaListCpy[index] = {
      hasCartela: false,
      board: null,
    };
    setCartelaList(cartelaListCpy);
  };

  const getCartelaData = (inputData:string, index:number) => {
    if (inputData && parseInt(inputData) < 101 && parseInt(inputData) > 0) {
      const cartelaListCpy = [...cartelaList];
      const cartela = mainCartelaData.find((e) => e.board_number == inputData)
      cartelaListCpy[index] = {
        hasCartela: true,
        board: cartela? cartela:null,
      };
      setCartelaList(cartelaListCpy);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {
        cartelaList.map((e, index) => {
          return <Cartela key={'cartelacomp' + index} index={index} cartelaData={e} getCartelaData={getCartelaData} clearCartela={clearCartela} />;
        })
      }
      <TouchableOpacity style={styles.addButton} onPress={() => addNewCartela()}>
        <Text style={styles.addButtonText}>Add Cartela</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={() => setCartelaList([{ hasCartela: false, board: null }])}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 1.1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginBottom: 20,
    paddingBottom: 150,
  },
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
  },
  "1col": {
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 5,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeTitleButton: {
    backgroundColor: 'green',
    padding: 5,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  changeTitleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;
