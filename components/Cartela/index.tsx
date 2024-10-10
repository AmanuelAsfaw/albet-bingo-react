import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, TouchableOpacity, Text, View, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

export default function Cartela({cartelaData, getCartelaData, clearCartela, index}: {cartelaData: null|any, getCartelaData: Function, clearCartela:Function, index: Number}) {
    const [inputValue, setInputValue] = useState('')
    const [hasCartela, setHasCartela] = useState(false)
    const [numberStatus, setNumberStatus] = useState([
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
    ])
  const Row = ({ children }: {children: any}) => (
    <View style={styles.row}>{children}</View>
  )

  const Col = ({ numRows, indexInRow, children }: {numRows: number,indexInRow: number, children: any}) => {
    let column : string = "1col"
    let style = styles["1col"]
    let newStyle = {}
    
    if(numberStatus.length && numRows && indexInRow > -1 && numberStatus[numRows-1].length){
        newStyle = numberStatus[numRows-1][indexInRow]?{backgroundColor: 'red'}: {}
    }

    const updateStatus = () => {
        if((numRows == 3 && indexInRow == 2) || numRows == 0){
            console.log(`not updated [${numRows}][${indexInRow}]`);

        }
        else{
            // let numberStatus_row_cpy = [...numberStatus[numRows-1]]
            let numberStatus_cpy = [...numberStatus]
            // numberStatus_row_cpy[indexInRow] = !numberStatus_row_cpy[indexInRow]
            console.log(`numberStatus_cpy[${numRows-1}][${indexInRow}]`);
            console.log(numberStatus_cpy[numRows-1][indexInRow]);
            
            numberStatus_cpy[numRows-1][indexInRow] = !numberStatus_cpy[numRows-1][indexInRow]

            setNumberStatus(numberStatus_cpy)
        }
    }
    return  (
      <TouchableOpacity style={[style, newStyle]}
      onPress={()=> updateStatus()}
      >{children}</TouchableOpacity>
    )
  }
  console.log(cartelaData);
  

  return (
    <View style={styles.app}>
      {cartelaData?.hasCartela && <View style={{flex: 2, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Cartela</Text>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>{cartelaData?.board?.board_number}</Text>
        </View>
        <View>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'red', padding: 2, paddingHorizontal: 15, borderRadius: 10,}}
            onPress={()=> clearCartela(index)}
            >
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Clear</Text>
            </TouchableOpacity>
        </View>
      </View>}
      {!cartelaData?.hasCartela && <View style={{flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
        <TextInput
            style={styles.input}
            onChangeText={setInputValue}
            value={inputValue}
            placeholder="cartela"
            placeholderTextColor="#fff"
            keyboardType="numeric"
        />
        </View>
        <TouchableOpacity style={{flex: 1, backgroundColor: 'blue', padding: 2, paddingHorizontal: 15, borderRadius: 10, maxHeight: 30, maxWidth: 90,}}
        onPress={()=> getCartelaData(inputValue, index)}
        >
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Get</Text>
        </TouchableOpacity>
      </View>}
      {cartelaData?.board &&
      <>
        <Row>
            <Col numRows={0} indexInRow={0}>
            <Text style={[styles.headerText, { color: 'blue' }]}>B</Text>
            </Col>
            <Col numRows={0} indexInRow={1}>
            <Text style={[styles.headerText, { color: 'red' }]}>I</Text>
            </Col>
            <Col numRows={0} indexInRow={2}>
            <Text style={[styles.headerText, { color: 'purple' }]}>N</Text>
            </Col>
            <Col numRows={0} indexInRow={3}>
            <Text style={[styles.headerText, { color: 'green' }]}>G</Text>
            </Col>
            <Col numRows={0} indexInRow={4}>
            <Text style={[styles.headerText, { color: 'goldenrod' }]}>O</Text>
            </Col>
        </Row>
        <Row>
            <Col numRows={1} indexInRow={0}>
            <Text style={[styles.itemText, { color: numberStatus[0][0]? '#fff':'#111' }]}>{cartelaData?.board?.board?.b_row[0]}</Text>
            </Col>
            <Col numRows={1} indexInRow={1}>
            <Text style={[styles.itemText, { color: numberStatus[0][1]? '#fff':'#111' }]}>{cartelaData?.board?.board?.i_row[0]}</Text>
            </Col>
            <Col numRows={1} indexInRow={2}>
            <Text style={[styles.itemText, { color: numberStatus[0][2]? '#fff':'#111' }]}>{cartelaData?.board?.board?.n_row[0]}</Text>
            </Col>
            <Col numRows={1} indexInRow={3}>
            <Text style={[styles.itemText, { color: numberStatus[0][3]? '#fff':'#111' }]}>{cartelaData?.board?.board?.g_row[0]}</Text>
            </Col>
            <Col numRows={1} indexInRow={4}>
            <Text style={[styles.itemText, { color: numberStatus[0][4]? '#fff':'#111' }]}>{cartelaData?.board?.board?.o_row[0]}</Text>
            </Col>
        </Row>
        <Row>
            <Col numRows={2} indexInRow={0}>
            <Text style={[styles.itemText, { color: numberStatus[1][0]? '#fff':'#111' }]}>{cartelaData?.board?.board?.b_row[1]}</Text>
            </Col>
            <Col numRows={2} indexInRow={1}>
            <Text style={[styles.itemText, { color: numberStatus[1][1]? '#fff':'#111' }]}>{cartelaData?.board?.board?.i_row[1]}</Text>
            </Col>
            <Col numRows={2} indexInRow={2}>
            <Text style={[styles.itemText, { color: numberStatus[1][2]? '#fff':'#111' }]}>{cartelaData?.board?.board?.n_row[1]}</Text>
            </Col>
            <Col numRows={2} indexInRow={3}>
            <Text style={[styles.itemText, { color: numberStatus[1][3]? '#fff':'#111' }]}>{cartelaData?.board?.board?.g_row[1]}</Text>
            </Col>
            <Col numRows={2} indexInRow={4}>
            <Text style={[styles.itemText, { color: numberStatus[1][4]? '#fff':'#111' }]}>{cartelaData?.board?.board?.o_row[1]}</Text>
            </Col>
        </Row>
        <Row>
            <Col numRows={3} indexInRow={0}>
            <Text style={[styles.itemText, { color: numberStatus[2][0]? '#fff':'#111' }]}>{cartelaData?.board?.board?.b_row[2]}</Text>
            </Col>
            <Col numRows={3} indexInRow={1}>
            <Text style={[styles.itemText, { color: numberStatus[2][1]? '#fff':'#111' }]}>{cartelaData?.board?.board?.i_row[2]}</Text>
            </Col>
            <Col numRows={3} indexInRow={2}>
            {/* <Text style={[styles.itemText, { color: numberStatus[2][2]? '#fff':'#111' }]}>-1</Text> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="star" size={29} color="red" style={{ width: 29 }} />
            </View>
            </Col>
            <Col numRows={3} indexInRow={3}>
            <Text style={[styles.itemText, { color: numberStatus[2][3]? '#fff':'#111' }]}>{cartelaData?.board?.board?.g_row[2]}</Text>
            </Col>
            <Col numRows={3} indexInRow={4}>
            <Text style={[styles.itemText, { color: numberStatus[2][4]? '#fff':'#111' }]}>{cartelaData?.board?.board?.o_row[2]}</Text>
            </Col>
        </Row>
        <Row>
            <Col numRows={4} indexInRow={0}>
            <Text style={[styles.itemText, { color: numberStatus[3][0]? '#fff':'#111' }]}>{cartelaData?.board?.board?.b_row[3]}</Text>
            </Col>
            <Col numRows={4} indexInRow={1}>
            <Text style={[styles.itemText, { color: numberStatus[3][1]? '#fff':'#111' }]}>{cartelaData?.board?.board?.i_row[3]}</Text>
            </Col>
            <Col numRows={4} indexInRow={2}>
            <Text style={[styles.itemText, { color: numberStatus[3][2]? '#fff':'#111' }]}>{cartelaData?.board?.board?.n_row[3]}</Text>
            </Col>
            <Col numRows={4} indexInRow={3}>
            <Text style={[styles.itemText, { color: numberStatus[3][3]? '#fff':'#111' }]}>{cartelaData?.board?.board?.g_row[3]}</Text>
            </Col>
            <Col numRows={4} indexInRow={4}>
            <Text style={[styles.itemText, { color: numberStatus[3][4]? '#fff':'#111' }]}>{cartelaData?.board?.board?.o_row[3]}</Text>
            </Col>
        </Row>
        <Row>
            <Col numRows={5} indexInRow={0}>
            <Text style={[styles.itemText, { color: numberStatus[4][0]? '#fff':'#111' }]}>{cartelaData?.board?.board?.b_row[4]}</Text>
            </Col>
            <Col numRows={5} indexInRow={1}>
            <Text style={[styles.itemText, { color: numberStatus[4][1]? '#fff':'#111' }]}>{cartelaData?.board?.board?.i_row[4]}</Text>
            </Col>
            <Col numRows={5} indexInRow={2}>
            <Text style={[styles.itemText, { color: numberStatus[4][2]? '#fff':'#111' }]}>{cartelaData?.board?.board?.n_row[4]}</Text>
            </Col>
            <Col numRows={5} indexInRow={3}>
            <Text style={[styles.itemText, { color: numberStatus[4][3]? '#fff':'#111' }]}>{cartelaData?.board?.board?.g_row[4]}</Text>
            </Col>
            <Col numRows={5} indexInRow={4}>
            <Text style={[styles.itemText, { color: numberStatus[4][4]? '#fff':'#111' }]}>{cartelaData?.board?.board?.o_row[4]}</Text>
            </Col>
        </Row>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginTop: 20,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: "gray",
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },
  "1col": {
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: 2,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 5,
  },
  // Other styles remain the same...
});
