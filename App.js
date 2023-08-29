import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';


export function createMock() {

  let data = []
  for (let index = 0; index < 1000; index++) {
    data.push({
      key: index + 1,
      label: index
    })
  }

  return data
}

const data = createMock()

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  console.log(selectedItems)

  function onSelectItem(key) {
    setSelectedItems(current => [...current, key])
  }

  const renderItem = ({ item }) => {

    const isSelected = selectedItems.includes(item.key)

    return (
      <Pressable
        style={{
          backgroundColor: isSelected ? 'red' : 'blue',
          marginBottom: 2,
          padding: 8,
          borderRadius: 20
        }}
        onPress={() => onSelectItem(item.key)}
      >
        <Text>
          {item.label}
        </Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(!modalVisible);
      // }}
      >
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>X</Text>
        </Pressable>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 1, width: '100%' }}>
              <FlashList
                extraData={[selectedItems]}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => {
                  return item.key
                }}
                estimatedItemSize={100}
              />
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '96%',
    height: 300,
    alignItems: 'center',
    borderWidth: 1,
    padding: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;