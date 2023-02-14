import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Animated,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import AppText from './components/AppText';

let currId = -1;
const genId = () => ++currId;
const initData = [
  {
    id: genId(),
    completed: true,
    text: '22s22',
  },
  {
    id: genId(),
    completed: false,
    text: '22',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
  {
    id: genId(),
    completed: false,
    text: '2aasdsds2',
  },
];

const Index = () => {

  const [filterData, setFilterData] = useState(0);
  const filterListData = [
    {title: 'All'},
    {title: 'Active'},
    {title: 'Completed'},
  ];
  const FilterItem = ({item, index}) => {
    const onPress = index => {
      setFilterData(index);
    //   fadeAnim.current.setValue(0)
    //   fadeIn()
    };

    return (
      <Pressable onPress={() => onPress(index)}>
        <Animated.View
          style={[
            styles.filterItem,
            filterData === index ? styles.filterItemSelected : {},
          ]}
        >
          <AppText>{item.title}</AppText>
        </Animated.View>
      </Pressable>
    );
  };

  const [listData, setListData] = useState(initData);
  const ListItem = ({item, index}) => {
    const check = (state, index, isChecked, setState) => {
      const newItem = JSON.parse(JSON.stringify(state[index]));
      newItem.completed = isChecked;
      const newState = JSON.parse(JSON.stringify(state));
      newState[index] = newItem;
      setState(newState);
    };
    const input = (state, index, value, setState) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState[index].text = value;
      setState(newState);
    };

    const destory = (state, index, setState) => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.splice(index, 1);
      setState(newState);
    };

    return (
      <View style={styles.listItem}>
        <BouncyCheckbox
          isChecked={item.completed}
          onPress={isChecked => {
            check(listData, index, isChecked, setListData);
          }}
        />
        <TextInput
          style={[
            styles.listItemText,
            item.completed ? styles.listItemCompleted : null,
          ]}
          editable={!item.completed}
          spellCheck={false}
          onChangeText={value => {
            input(listData, index, value, setListData);
          }}
        >
          {item.text}
        </TextInput>
        <Pressable
          onPress={() => {
            destory(listData, index, setListData);
          }}>
          <View style={styles.listItemDestroy}>
            <Text style={styles.listItemDestroyText}>X</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const todoInputRef = React.createRef();
  const onSubmitEditing = ({nativeEvent: {text}}) => {
    const newListData = JSON.parse(JSON.stringify(listData));
    newListData.unshift({
      id: genId(),
      completed: false,
      text,
    });
    setListData(newListData);
    todoInputRef.current.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitleText}>todos</Text>
        <TextInput
          ref={todoInputRef}
          style={styles.headerInput}
          placeholder="What needs to be done?"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onSubmitEditing={onSubmitEditing}
        />
      </View>

      <FlatList
        style={styles.list}
        data={
          filterData === 0
            ? listData
            : listData.filter(_ => {
                const showCompleted = filterData === 2;
                return _.completed === showCompleted;
              })
        }
        keyExtractor={item => item.id}
        renderItem={ListItem}
        alwaysBounceVertical={true}
      />

      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <View style={styles.todoCount}>
            <AppText>
              <Text style={styles.todoCountNumberText}>{listData.length}</Text>{' '}
              item left
            </AppText>
          </View>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#eee' : 'white',
              },
            ]}
            onPress={() => {
              setListData(listData.filter(item => !item.completed))
            }}>
            <View style={styles.clearCompleted}>
              <AppText>Clear completed</AppText>
            </View>
          </Pressable>
        </View>
        <FlatList
          contentContainerStyle={styles.filters}
          data={filterListData}
          renderItem={FilterItem}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    maxHeight: '100%',
    // boxShadow:
    //   '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
  },
  header: {
    flexDirection: 'column',
  },
  headerTitleText: {
    width: '100%',
    paddingTop: 70,
    fontSize: 80,
    fontWeight: 200,
    textAlign: 'center',
    color: '#b83f45',
    backgroundColor: '#f5f5f5',
  },
  headerInput: {
    position: 'relative',
    margin: 0,
    fontSize: 24,
    padding: 16,
    fontStyle: 'italic',
    color: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.003)',
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  listItemText: {
    flex: 1,
  },
  listItemCompleted: {
    color: '#949494',
    textDecorationLine: 'line-through',
  },
  listItemDestroy: {
    marginRight: -15,
    width: 40,
    height: 40,
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemDestroyText: {
    color: '#949494',
  },

  footer: {
    alignItems: 'stretch',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    height: 70,
    textAlign: 'center',
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoCountNumberText: {
    fontWeight: '300',
  },
  clearCompleted: {
    cursor: 'pointer',
  },
  filters: {
    width: '100%',
    justifyContent: 'center',
  },
  filterItem: {
    margin: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'rgba(0,0,0,0)',
  },
  filterItemSelected: {
    borderColor: '#CE4646',
  },
});
