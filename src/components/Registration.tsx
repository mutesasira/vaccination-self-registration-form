import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export const Registration: FC<{ [key: string]: any }> = ({ dueDate, orgUnitName}) => {
  return (<Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <Text>{dueDate.format('YYYY-MM-DD')}</Text>
      </View>
      <View style={styles.section}>
        <Text>{orgUnitName}</Text>
      </View>
    </Page>
  </Document>)
};