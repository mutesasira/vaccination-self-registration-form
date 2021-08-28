import { FC } from 'react';
import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import coa from '../coa.png';
import { useStore } from "effector-react";
import { $store} from "../Store";
// interface QR {
//   data: any,
//   attributeData: any;
//   eventData: any;
//   trackedEntityInstance: string;
//   certificate: string;
// }

//styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  body: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  header: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    textAlign: 'center',
    color: 'grey',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  pageBackground: {
    position: 'absolute',
    marginLeft: '24.5%',
    marginTop: '15%',
    opacity: 0.2,
    zIndex: -1,
    height: 350,
    width: 350,
  },
});

// Create Document Component
export const Registration: FC<{ [key: string]: any }> = ({ dueDate, orgUnitName,sB1IHYu2xQT }) => {
  const store = useStore($store);
  return (<Document>
    <Page size="A4" style={styles.page} orientation="portrait">
      <View style={{
        width: '100%', height: '100%', border: '3px solid black',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica'
      }}>
        <View style={{ width: '100%', height: '100%', border: '3px solid yellow' }}>
          <View style={{ width: '100%', height: '100%', border: '3px solid red' }}>
            <View style={styles.header}>
              <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignContent: 'center', alignItems: 'center', paddingHorizontal: '10px' }}>
                <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={styles.image}
                    src={coa}
                  />
                </View>
              </View>
              <Text style={{ textTransform: 'uppercase', fontSize: '14px', letterSpacing: '5px', marginVertical: 2, fontFamily: 'Times-Bold' }}>Republic of Uganda</Text>
              <Text style={{ textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px', marginBottom: '15px', fontFamily: 'Times-Bold' }}> Ministry of Health</Text>
              <Text style={{ textTransform: 'uppercase', fontSize: '20px', letterSpacing: '1px', marginBottom: '20px', fontWeight: 'extrabold', fontFamily: 'Times-Bold' }}>COVID-19 VACCINATION SELF REGISTRATION FORM</Text>
            </View>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <View style={{ backgroundColor: '#c9c7c7', display: 'flex', padding: 5 }} >
                  <Text style={{ textTransform: 'uppercase', fontSize: '32px', color: 'white', textAlign: 'center', fontWeight: 'extrabold', fontFamily: 'Times-Bold' }}>Client Information</Text>
                </View>
                <View style={{ display: 'flex', padding: 10 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text>Client Name:</Text>
                    <Text>{store.sB1IHYu2xQT }</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text>Client Category:</Text>
                    <Text style={{}}>{store.pCnbIVhxv4j}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text>National Identity Number (NIN)</Text>
                    <Text style={{}}>{store.Ewi7FUfcHAD}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text >Priority Group:</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{store.CFbojfdkIIj}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text >Phone Number:</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{store.ciCR6BBvIT4}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text>Preffered Vaccination Date:</Text>
                    <Text>{dueDate.format('YYYY-MM-DD')}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Text>Preffered Vaccination Site:</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{orgUnitName}</Text>
                  </View>

                </View>
              </View>


            </View>
            <View
              style={{ ...styles.pageNumber }}
            >
            </View>
          </View></View></View>
    </Page>
  </Document>)
};