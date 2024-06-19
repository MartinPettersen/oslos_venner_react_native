import React from 'react'
import Thread from '../components/(thread)/Thread'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../utils/Types';

type ThreadPageRouteProp = RouteProp<RootStackParamList, 'Thread'>;


const ThreadPage = () => {

  const route = useRoute<ThreadPageRouteProp>();
  const { id } = route.params;

  return (
    <Thread id={id}/>
  )
}

export default ThreadPage