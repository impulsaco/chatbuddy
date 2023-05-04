import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageText, Time, Avatar } from 'react-native-gifted-chat';
import Color from 'color';

const CustomMessage = (props) => {
  const { currentMessage, position } = props;
  const { text, translation } = currentMessage;

  const isSameUser = position === 'right';
  const backgroundColor = isSameUser ? '#007aff' : '#f0f0f0';
  const textColor = isSameUser ? 'white' : 'black';
  const containerAlignment = isSameUser ? 'flex-end' : 'flex-start';
  const bubbleAlignment = isSameUser ? 'row-reverse' : 'row';
  const marginBubble = isSameUser ? { marginLeft: 80 } : { marginRight: 80 };
  const marginEdge = isSameUser ? { marginRight: 10 } : { marginLeft: 0 };

  return (
    <View style={[styles.container, { alignItems: containerAlignment }]}>
      <View style={[styles.messageRow, { flexDirection: bubbleAlignment }]}>
        {!isSameUser && <Avatar {...props} containerStyle={styles.avatar} />}
        <View>
          <View style={[styles.bubble, { backgroundColor }, marginBubble, marginEdge]}>
            <MessageText
              {...props}
              textStyle={{ left: { color: textColor }, right: { color: textColor } }}
            />
            {translation && (
              <Text style={[styles.translation, { color: textColor, marginLeft: 8 }]}>{translation}</Text>
            )}
          </View>
          <View style={{ alignSelf: containerAlignment }}>
            <Time {...props} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  bubble: {
    borderRadius: 15,
    minHeight: 20,
    justifyContent: 'flex-end',    
  },
  translation: {
    fontStyle: 'italic',
    marginTop: 5,
    paddingLeft: 3,
  },
});

export default CustomMessage;
