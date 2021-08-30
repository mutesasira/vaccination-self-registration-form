import { FC } from 'react';
import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import coa from '../coa.png';
import { useStore } from "effector-react";
import { $store } from "../Store";
const Barcode = require('react-barcode');

//styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingTop: '2px',
  },
  section: {
    margin: 2,
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
  }
});

// Create Document Component
export const Registration: FC<{ [key: string]: any }> = ({ dueDate, orgUnitName, sB1IHYu2xQT }) => {
  const store = useStore($store);
  return (<Document>
    <Page size="A4" style={styles.page} orientation="portrait">
      <View style={{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica',
        margin: '30px',
        paddingTop: '0px'
      }}>
        <View style={{ marginTop: 0 }}>
          <View style={styles.header}>
            <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingHorizontal: '10px' }}>
              <Image
                style={styles.image}
                src={coa}
              />
            </View>
            <Text style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '5px', marginVertical: 2, fontFamily: 'Times-Bold' }}>Republic of Uganda</Text>
            <Text style={{ textTransform: 'uppercase', fontSize: '10px',  marginBottom: '15px', fontFamily: 'Times-Bold' }}> Ministry of Health</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <View style={{ backgroundColor: '#c9c7c7', display: 'flex', padding: 5 }} >
                <Text style={{ textTransform: 'uppercase', fontSize: '16px', textAlign: 'center', fontWeight: 'extrabold', fontFamily: 'Times-Bold' }}>Covid-19 Vaccination Booking Confirmation</Text>
              </View>
              <View style={{ display: 'flex', padding: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text>Client Name:</Text>
                  <Text style={{ fontWeight:3 }}>{store.sB1IHYu2xQT}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text>Client Category:</Text>
                  <Text style={{ fontWeight: 'bold' }}>{store.pCnbIVhxv4j}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text>National Identity Number (NIN)</Text>
                  <Text style={{}}>{store.Ewi7FUfcHAD}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text >Priority Group:</Text>
                  <Text style={{ flex: 1, textAlign: 'right' }}>{store.CFbojfdkIIj}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text >Phone Number:</Text>
                  <Text style={{ flex: 1, textAlign: 'right' }}>{store.ciCR6BBvIT4}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row',  fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text>Preffered Vaccination Date:</Text>
                  <Text>{dueDate.format('YYYY-MM-DD')}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Text>Preffered Vaccination Site:</Text>
                  <Text style={{ flex: 1, textAlign: 'right' }}>{orgUnitName}</Text>
                </View>

              </View>
              <View>
                
              </View>
            </View>


          </View>
          <View
            style={{ ...styles.pageNumber }}
          >
          </View>
        </View>
      </View>
      <Barcode value="test" />
    </Page>
  </Document>)
};