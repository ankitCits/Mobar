import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';

class CartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
      data: this.props.data
    }
  }

  onCloseModal = () => {
    this.props.onModalClose(false);
  }

  render() {

    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}>
          <TouchableWithoutFeedback
            onPressOut={() => this.onCloseModal()}>
            <View style={styles.centeredView}>
              <View style={styles.cartModalContainer}>
                <View style={styles.cartModalHeader}>
                  <Text
                    style={styles.cartModalTitle}>
                    Item added to cart successfully
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onCloseModal()}>
                    <Text><Icon name="close" size={28} color="#000" /></Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={styles.cartModalBody}>
                  <Text
                    style={styles.modalTextDetail}>
                    {this.props.data.name} {this.props.data.unit}
                  </Text>
                  <View style={styles.modalCartQty}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.data.items ?
                          this.props.onModalChange(this.props.data.items, this.props.data.type, this.props.data.index, 2) :
                          this.props.onModalChange(2, true)
                      }}
                    >
                      <Icon name="remove" size={20} color="#4D4F50" />
                    </TouchableOpacity>
                    <Text
                      style={styles.modalTextDetail}>
                      {' ' + this.props.data.qty + ' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.data.items ?
                          this.props.onModalChange(this.props.data.items, this.props.data.type, this.props.data.index) :
                          this.props.onModalChange(1, true)
                      }
                    >
                      <Icon name="add" size={20} color="#4D4F50" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => {
                    this.setState({ modalVisible: false })
                    this.props.navigation.navigate('MyCard')
                  }}>
                  <Text style={{
                    fontFamily: FontFamily.TAJAWAL_REGULAR,
                    fontWeight: '700',
                    fontSize: 18,
                    color: ThemeColors.CLR_WHITE
                  }}>
                    VIEW CART
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
}

export default CartModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cartModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartModalHeader: {
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartModalTitle: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '500',
    fontSize: 14,
    color: '#ACACAC'
  },
  cartModalBody: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  modalTextDetail: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '500',
    fontSize: 15,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR
  },
  modalCartQty: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
});