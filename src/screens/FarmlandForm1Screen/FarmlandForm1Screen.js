
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import Realm from 'realm';
import { AppContext } from '../../models/realm';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
const { useRealm, useObject } = AppContext;

const FarmlandForm1Screen = ({ route, navigation }) => {

    const farmerId = route.params?.farmerId;
    const appRealm = useRealm()

    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);

    // const farmer = useObject('Farmer', new Realm.BSON.ObjectId(farmerId));

    // console.log('farmerId', farmer)

    useEffect(()=>{


    }, [appRealm, farmerId])

    useEffect(()=>{
        setLoadingActivityIndicator(true);
    }, [navigation])


    if (loadingActivitiyIndicator) {
        return <CustomActivityIndicator 
            loadingActivitiyIndicator={loadingActivitiyIndicator}
            setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
    }



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ghostwhite', }}>
      <Text>FarmlandForm1Screen</Text>
      <Text>{farmerId}</Text>
    </View>
  )
}

export default FarmlandForm1Screen